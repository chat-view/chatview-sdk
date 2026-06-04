# 如何通过 API 分享 ChatGPT 对话

1. 在 [ChatView](https://chat-view.com) 获取 API Token  
2. 采集对话区域 HTML → `raw_html`，建议同时提交 `plain_text`  
3. 调用 `POST /api/contents` 或 SDK `createContent()`

```typescript
import { ChatViewClient } from '@chatview/sdk';
const client = new ChatViewClient();
const link = await client.createContent({
  raw_html: chatgptConversationHtml,
  source_platform: 'ChatGPT',
  source_url: location.href,
});
```

**相关：** [ChatGPT API 文档](./chatgpt-conversation-sharing-api.md) · [安全链接](./secure-ai-share-links.md)
