"""
This example uses the ChatView API.
It shows how to share ChatGPT, Claude or AI assistant conversations.
Set CHATVIEW_API_TOKEN in your environment.
Never hard-code your ChatView API token.
"""

import os

from chatview import ChatViewClient

claude_conversation_html = "<p>Secure share with custom password and expiry.</p>"


def main() -> None:
    client = ChatViewClient(api_token=os.environ["CHATVIEW_API_TOKEN"])
    password_protected_share = client.create_content(
        raw_html=claude_conversation_html,
        title="Secure AI share link",
        source_platform="Claude",
        password_protected=True,
        password="team-review-2026",
        expiration="90",
    )
    print(password_protected_share["url"])
    print("Expires:", password_protected_share.get("expires_at"))


if __name__ == "__main__":
    main()
