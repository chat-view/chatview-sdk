from __future__ import annotations

from typing import Any, Optional


class ChatViewApiError(Exception):
    """Raised when the ChatView API returns a non-success status."""

    def __init__(
        self,
        status: int,
        message: str,
        *,
        code: Optional[str] = None,
        errors: Optional[dict[str, list[str]]] = None,
        retry_after: Optional[int] = None,
    ) -> None:
        super().__init__(message)
        self.status = status
        self.code = code
        self.errors = errors
        self.retry_after = retry_after

    @property
    def is_unauthorized(self) -> bool:
        return self.status == 401

    @property
    def is_validation_error(self) -> bool:
        return self.status == 422

    @property
    def is_rate_limited(self) -> bool:
        return self.status == 429

    @classmethod
    def from_response(
        cls, status: int, body: dict[str, Any], retry_after: Optional[int] = None
    ) -> "ChatViewApiError":
        return cls(
            status,
            body.get("message", f"ChatView API error ({status})"),
            code=body.get("code"),
            errors=body.get("errors"),
            retry_after=retry_after,
        )
