# chatview (Python)

Python SDK for the [ChatView API](https://chat-view.com/docs/api) — share ChatGPT, Claude, and AI conversations as secure public links.

```bash
pip install chatview
```

```python
import os
from chatview import ChatViewClient

client = ChatViewClient(api_token=os.environ["CHATVIEW_API_TOKEN"])

secure_public_link = client.create_content(
    raw_html=chatgpt_conversation_html,
    title="My ChatGPT thread",
    source_platform="ChatGPT",
    source_url="https://chatgpt.com/c/example",
)
print(secure_public_link["url"], secure_public_link.get("password"))
```

See the [repository README](../../README.md).
