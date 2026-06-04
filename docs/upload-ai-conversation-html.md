# Upload AI Conversation HTML to the API

To **upload AI conversation HTML**, send the rendered DOM (or exported HTML file) as `raw_html` in `POST /api/contents`. ChatView sanitizes HTML server-side and never renders the raw capture directly on the public page.

## When to upload HTML

- Browser extensions that snapshot assistant messages
- Batch jobs converting saved HTML exports into share links
- Tools that already have `innerHTML` but no plain API from the AI vendor

## Minimal upload

```bash
export CHATVIEW_API_TOKEN="your-token"
curl -X POST "https://chat-view.com/api/contents" \
  -H "Authorization: Bearer $CHATVIEW_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Uploaded thread",
    "raw_html": "<article><p>Hello from export</p></article>",
    "plain_text": "Hello from export",
    "source_platform": "ChatGPT"
  }'
```

## SDK: file-based upload (Python)

```python
# examples/python/upload_ai_conversation_html.py
from chatview import ChatViewClient
import os

client = ChatViewClient(api_token=os.environ["CHATVIEW_API_TOKEN"])
html = open("conversation.html", encoding="utf-8").read()
result = client.create_content(
    raw_html=html,
    plain_text=open("conversation.txt", encoding="utf-8").read(),
    title="Archived ChatGPT export",
    source_platform="ChatGPT",
)
print(result["url"])
```

## Size limits

`raw_html` has a maximum length (500k for user tokens; lower for default/public tokens). Oversized payloads return `413` with code `CONTENT_TOO_LARGE`.

## Attachments

Upload binary files via `POST /api/attachments`, then reference attachment IDs in `metadata.attachments`. Use `createContentWithAttachments()` in the SDK.

## Related resources

- [AI chat export API](./ai-chat-export-api.md)
- [Example](../examples/javascript/upload-ai-conversation-html.js)
- [API docs](https://chat-view.com/docs/api)
