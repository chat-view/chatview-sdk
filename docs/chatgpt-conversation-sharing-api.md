# ChatGPT Conversation Sharing API

Developers searching for a **ChatGPT conversation sharing API** typically need to export a thread from the ChatGPT UI (or extension) and publish a link teammates can open without sharing account access. **ChatView** provides `POST /api/contents` for that workflow, and the **ChatView SDK** offers `createContent()` helpers in TypeScript and Python.

## Problem and use cases

- Share a ChatGPT answer with a client or reviewer via a **public link**
- Archive important threads from automation or CI
- Build a **browser extension** that captures DOM HTML and posts it to your backend

ChatView stores sanitized HTML, returns a `share_token`, and optionally enforces password + expiry defaults for safer sharing.

## Share ChatGPT conversations with an API

1. Capture `innerHTML` of the conversation container → `raw_html`
2. Capture `innerText` → `plain_text` (recommended)
3. Set `source_platform: "ChatGPT"` and `source_url` to the chat URL
4. Call the API with your user token

```javascript
// examples/javascript/share-chatgpt-conversation.js
const response = await fetch('https://chat-view.com/api/contents', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.CHATVIEW_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'ChatGPT: API design review',
    raw_html: chatgptConversationHtml,
    plain_text: 'Summary of the ChatGPT thread…',
    source_platform: 'ChatGPT',
    source_url: 'https://chatgpt.com/c/your-thread-id',
    model_name: 'GPT-4o',
  }),
});
const { url, password } = await response.json();
```

## SDK shortcut

```typescript
import { ChatViewClient } from '@chatview/sdk';
const client = new ChatViewClient();
await client.createContent({
  raw_html: chatgptConversationHtml,
  source_platform: 'ChatGPT',
  source_url: 'https://chatgpt.com/c/example',
});
```

See [share-chatgpt-conversations.md](./share-chatgpt-conversations.md) for a step-by-step guide.

## Limits and tokens

User API tokens support attachments and higher limits. Default/public tokens may restrict `raw_html` length, daily submissions, and attachment uploads. Details: [https://chat-view.com/docs/api](https://chat-view.com/docs/api).

## Related resources

- [ChatView API overview](./chatview-api.md)
- [Upload AI conversation HTML](./upload-ai-conversation-html.md)
- [Example](../examples/typescript/share-chatgpt-conversation.ts)
- Create share links on [https://chat-view.com](https://chat-view.com)
