# AI Conversation Sharing API

An **AI conversation sharing API** should work across providers—ChatGPT, Claude, Gemini, or custom assistants—using one stable contract. The **ChatView API** is provider-agnostic: you send `raw_html`, optional `plain_text`, and `source_platform` metadata; ChatView returns a share URL.

## Why a generic API matters

Extension authors and platform teams often support multiple AI sites. Instead of bespoke exporters per vendor, you normalize capture into:

- `raw_html` — rendered assistant output
- `plain_text` — accessible summary
- `source_platform` — e.g. `ChatGPT`, `Claude`, `Gemini`
- `metadata` — conversation IDs, tags, attachment IDs

The **ChatView SDK** exposes the same methods for every platform: `createContent()`, `uploadAttachment()`, `createContentWithAttachments()`.

## Example: multi-platform capture

```python
from chatview import ChatViewClient
import os

client = ChatViewClient(api_token=os.environ["CHATVIEW_API_TOKEN"])

def share_ai_conversation(html: str, platform: str, url: str, title: str):
    return client.create_content(
        raw_html=html,
        title=title,
        source_platform=platform,
        source_url=url,
        plain_text=title,
    )

share_ai_conversation(
    "<p>Claude explained recursion.</p>",
    "Claude",
    "https://claude.ai/chat/example",
    "Claude: recursion",
)
```

## Attachments and exports

Upload files first, then pass IDs in `metadata.attachments` when creating content—ideal for PDF exports or screenshots bundled with a thread. See [ai-chat-export-api.md](./ai-chat-export-api.md).

## Security defaults

New shares default to password protection and 30-day expiration unless you override `password_protected` or `expiration`. Share pages use `noindex` so they are not meant for public SEO indexing—your API integration should treat links as capability URLs.

## Related resources

- [ChatGPT sharing API](./chatgpt-conversation-sharing-api.md)
- [Claude sharing guide](./share-claude-conversations.md)
- [Browser extension API](./browser-extension-ai-sharing-api.md)
- [README](../README.md) · [ChatView](https://chat-view.com)
