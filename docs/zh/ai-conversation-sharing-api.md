# AI 对话分享 API（通用）

**AI conversation sharing API** 应跨 ChatGPT、Claude、Gemini 等平台统一。ChatView 通过 `source_platform`、`raw_html`、`plain_text` 抽象各厂商差异，**ChatView SDK** 提供 `createContent()` / `createContentWithAttachments()`。

```python
from chatview import ChatViewClient
client = ChatViewClient(api_token="…")
client.create_content(
    raw_html="<p>内容</p>",
    source_platform="Claude",
    source_url="https://claude.ai/chat/example",
)
```

**相关：** [英文文档](../ai-conversation-sharing-api.md) · [README](../../README.zh-CN.md)
