# Browser Extension API for AI Conversation Sharing

Extension developers need a **browser extension API for AI conversation sharing** that accepts DOM captures from ChatGPT, Claude, and similar sites without routing HTML through your own server first. **ChatView** exposes HTTPS endpoints designed for extension background scripts: `POST /api/contents` and `POST /api/attachments`.

## Integration pattern

1. **Content script** reads conversation HTML + plain text from the page DOM
2. **Background service worker** holds the API token in `chrome.storage.local`
3. POST JSON to `https://chat-view.com/api/contents`
4. Show the returned `url` and one-time `password` to the user

```javascript
// examples/javascript/browser-extension-share-chatgpt-conversation.js
const browserExtensionCapture = {
  raw_html: document.querySelector('[data-message-author-role]')?.parentElement?.innerHTML,
  plain_text: document.body.innerText?.slice(0, 50000),
  source_url: location.href,
  source_platform: location.host.includes('claude') ? 'Claude' : 'ChatGPT',
  title: document.title,
};

const res = await fetch('https://chat-view.com/api/contents', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(browserExtensionCapture),
});
```

TypeScript SDK wrapper: [browser-extension-ai-conversation-sharing.ts](../examples/typescript/browser-extension-ai-conversation-sharing.ts).

## Token storage

- Use a **user API token** from the ChatView Dashboard for production
- Never embed tokens in content scripts shipped to all users—store per-user tokens after login
- See [https://chat-view.com/docs/api](https://chat-view.com/docs/api) for Default Token restrictions (source host allowlist, no attachments)

## Rate limits

User tokens: 30 submissions/minute. Implement exponential backoff on `429` and surface `Retry-After` when present. Details in [api-error-handling.md](./api-error-handling.md).

## Related resources

- [Share ChatGPT conversations](./share-chatgpt-conversations.md)
- [Upload AI conversation HTML](./upload-ai-conversation-html.md)
- [ChatView API](./chatview-api.md)
- [https://chat-view.com](https://chat-view.com)
