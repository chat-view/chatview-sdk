"""
This example uses the ChatView API.
It shows how to share ChatGPT, Claude or AI assistant conversations.
Set CHATVIEW_API_TOKEN in your environment.
Never hard-code your ChatView API token.
"""

import os

from chatview import ChatViewClient

chatgpt_conversation_html = """
<div class="markdown">
  <p>Share ChatGPT conversations with the ChatView Python SDK.</p>
</div>
""".strip()

ai_conversation_metadata = {
    "conversation_id": "py-example-1",
    "tags": ["chatgpt", "python"],
}


def main() -> None:
    client = ChatViewClient(api_token=os.environ["CHATVIEW_API_TOKEN"])
    secure_public_link = client.create_content(
        raw_html=chatgpt_conversation_html,
        title="ChatGPT thread (Python SDK)",
        plain_text="Share ChatGPT conversations with ChatView.",
        source_platform="ChatGPT",
        source_url="https://chatgpt.com/c/example",
        model_name="GPT-4o",
        metadata=ai_conversation_metadata,
    )
    print("URL:", secure_public_link["url"])
    if secure_public_link.get("password"):
        print("Password:", secure_public_link["password"])


if __name__ == "__main__":
    main()
