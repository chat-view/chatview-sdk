"""
This example uses the ChatView API.
It shows how to share ChatGPT, Claude or AI assistant conversations.
Set CHATVIEW_API_TOKEN in your environment.
Never hard-code your ChatView API token.

Upload AI conversation HTML from a saved export file.
"""

import os
from pathlib import Path

from chatview import ChatViewClient


def upload_ai_conversation_html(html_path: str, plain_text_path: str | None = None) -> dict:
    client = ChatViewClient(api_token=os.environ["CHATVIEW_API_TOKEN"])
    raw_html = Path(html_path).read_text(encoding="utf-8")
    plain_text = (
        Path(plain_text_path).read_text(encoding="utf-8") if plain_text_path else None
    )
    return client.create_content(
        raw_html=raw_html,
        plain_text=plain_text,
        title="Uploaded AI conversation HTML",
        source_platform="ChatGPT",
    )


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: upload_ai_conversation_html.py <conversation.html> [plain.txt]")
        raise SystemExit(1)
    result = upload_ai_conversation_html(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
    print(result["url"])
