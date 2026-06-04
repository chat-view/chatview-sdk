# ChatGPT 对话分享 API

**ChatGPT conversation sharing API** 指通过 HTTP 将 ChatGPT 页面采集的 HTML 提交到 **ChatView**，获得 `/s/{token}` 分享链接。使用 **ChatView SDK** 可调用 `createContent()` 简化集成。

## 请求示例

```javascript
await fetch('https://chat-view.com/api/contents', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.CHATVIEW_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    raw_html: chatgptConversationHtml,
    plain_text: '摘要文本',
    source_platform: 'ChatGPT',
    source_url: 'https://chatgpt.com/c/xxx',
  }),
});
```

详见 [share-chatgpt-conversations.md](./share-chatgpt-conversations.md) 与 [英文版](../chatgpt-conversation-sharing-api.md)。

**相关：** [ChatView API](./chatview-api.md) · [示例](../../examples/javascript/share-chatgpt-conversation.js) · [chat-view.com](https://chat-view.com)
