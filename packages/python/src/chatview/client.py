from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, BinaryIO, Optional, Union

from chatview.errors import ChatViewApiError

DEFAULT_BASE_URL = "https://chat-view.com/api"

try:
    import httpx

    _HAS_HTTPX = True
except ImportError:
    _HAS_HTTPX = False


class ChatViewClient:
    """Client for the ChatView API (AI conversation sharing)."""

    def __init__(
        self,
        api_token: Optional[str] = None,
        *,
        base_url: str = DEFAULT_BASE_URL,
        timeout: float = 60.0,
    ) -> None:
        if not _HAS_HTTPX:
            raise ImportError("chatview requires httpx. Install with: pip install httpx")

        token = api_token or os.environ.get("CHATVIEW_API_TOKEN")
        if not token:
            raise ValueError(
                "ChatView API token required. Pass api_token or set CHATVIEW_API_TOKEN."
            )
        self._token = token
        self._base_url = base_url.rstrip("/")
        self._timeout = timeout

    def _headers(self, *, json_body: bool = True) -> dict[str, str]:
        headers = {
            "Authorization": f"Bearer {self._token}",
            "Accept": "application/json",
        }
        if json_body:
            headers["Content-Type"] = "application/json"
        return headers

    def _raise_for_status(self, response: "httpx.Response") -> None:
        if response.is_success:
            return
        body: dict[str, Any] = {"message": response.reason_phrase}
        try:
            body = response.json()
        except Exception:
            if response.text:
                body = {"message": response.text}
        retry_after: Optional[int] = None
        if response.headers.get("Retry-After"):
            try:
                retry_after = int(response.headers["Retry-After"])
            except ValueError:
                pass
        raise ChatViewApiError.from_response(response.status_code, body, retry_after)

    def create_content(self, **payload: Any) -> dict[str, Any]:
        """POST /api/contents — create a shareable AI conversation link."""
        with httpx.Client(timeout=self._timeout) as client:
            response = client.post(
                f"{self._base_url}/contents",
                headers=self._headers(),
                content=json.dumps(payload),
            )
            self._raise_for_status(response)
            return response.json()

    def upload_attachment(
        self, file: Union[BinaryIO, bytes, str, Path], filename: Optional[str] = None
    ) -> dict[str, Any]:
        """POST /api/attachments — upload a file for metadata.attachments."""
        if isinstance(file, (str, Path)):
            path = Path(file)
            file_data = path.read_bytes()
            name = filename or path.name
        elif isinstance(file, bytes):
            file_data = file
            name = filename or "attachment.bin"
        else:
            file_data = file.read()
            name = filename or getattr(file, "name", "attachment.bin")

        with httpx.Client(timeout=self._timeout) as client:
            response = client.post(
                f"{self._base_url}/attachments",
                headers=self._headers(json_body=False),
                files={"file": (name, file_data)},
            )
            self._raise_for_status(response)
            return response.json()

    def create_content_with_attachments(
        self, files: list[Union[BinaryIO, bytes, str, Path]], **payload: Any
    ) -> dict[str, Any]:
        """Upload attachments, then create content with metadata.attachments."""
        ids: list[int] = []
        for f in files:
            result = self.upload_attachment(f)
            ids.append(int(result["id"]))
        metadata = dict(payload.get("metadata") or {})
        metadata["attachments"] = ids
        payload = {**payload, "metadata": metadata}
        return self.create_content(**payload)
