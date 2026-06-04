# How to Share ChatGPT Conversations Programmatically

This guide explains how to **share ChatGPT conversations** using the **ChatView API** and **ChatView SDK**, whether you run a script, backend service, or browser extension.

## Prerequisites

1. Create an account at [https://chat-view.com](https://chat-view.com)
2. Generate an API token in the Dashboard
3. Export `CHATVIEW_API_TOKEN` in your shell or secret store

## Step 1 — Capture HTML

From the ChatGPT thread page, capture the main message container HTML:

```javascript
const chatgptConversationHtml = document
  .querySelector('[data-testid*="conversation"]')
  ?.innerHTML ?? '<p>fallback</p>';
const plainText = document.body.innerText.slice(0, 50000);
```

Exact selectors change when vendors update UI—pin selectors in your extension and test after ChatGPT updates.

## Step 2 — Create the share link

Using the SDK:

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient();
const securePublicLink = await client.createContent({
  raw_html: chatgptConversationHtml,
  plain_text: plainText,
  title: 'ChatGPT: deployment checklist',
  source_platform: 'ChatGPT',
  source_url: window.location.href,
  model_name: 'GPT-4o',
});

console.log(securePublicLink.url);
```

## Step 3 — Deliver URL and password

The API returns `password` only once when protection is enabled. Copy both link and password for your user. They can manage shares in the ChatView Dashboard.

## Optional: attachments

Upload screenshots with `uploadAttachment()` then `createContentWithAttachments()`. See [upload-ai-conversation-html.md](./upload-ai-conversation-html.md).

## Related resources

- [ChatGPT conversation sharing API](./chatgpt-conversation-sharing-api.md)
- [Secure AI share links](./secure-ai-share-links.md)
- [Examples](../examples/javascript/share-chatgpt-conversation.js)
- API reference: [https://chat-view.com/docs/api](https://chat-view.com/docs/api)
