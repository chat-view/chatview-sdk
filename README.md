# ChatView SDK — API Clients for AI Conversation Sharing

[中文文档](./README.zh-CN.md)

ChatView SDK provides developer-friendly API clients and examples for the ChatView API. Use [ChatView](https://chat-view.com) to **share AI conversations**, ChatGPT responses, Claude outputs, and **browser extension** captures as **secure public links**. This repository helps developers integrate with https://chat-view.com, upload rendered AI conversation HTML, attach metadata, protect shared pages with passwords, and create shareable AI conversation links programmatically.

---

## What is ChatView?

[ChatView](https://chat-view.com) is a platform for sharing AI assistant conversations as hosted pages. You capture HTML from ChatGPT, Claude, or other tools, submit it to the **ChatView API**, and receive a link (`/s/{share_token}`) you can send to collaborators. Pages can be password-protected and expire automatically.

## Why use the ChatView SDK?

- **AI conversation sharing API** with a small, testable client (`createContent`, `uploadAttachment`, `createContentWithAttachments`)
- **ChatGPT conversation sharing API** and Claude flows use the same client methods
- Typed errors (`ChatViewApiError`) for production extensions and backends

Learn more at [https://chat-view.com](https://chat-view.com).

## Installation

### TypeScript / Node.js

```bash
npm install @chatview/sdk
```

### Python

```bash
pip install chatview
```

Set your token:

```bash
export CHATVIEW_API_TOKEN="your-dashboard-token"
```

## Quickstart

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient();
const link = await client.createContent({
  raw_html: '<p>Hello from the ChatView API client</p>',
  title: 'Quickstart',
  source_platform: 'ChatGPT',
});

console.log(link.url);
```

Read the **ChatView API documentation**: [https://chat-view.com/docs/api](https://chat-view.com/docs/api)

Create and manage AI conversation share links on ChatView: [https://chat-view.com](https://chat-view.com)

## Share ChatGPT conversations

Capture conversation HTML, set `source_platform: "ChatGPT"`, and call `createContent()`.

- Guide: [docs/share-chatgpt-conversations.md](./docs/share-chatgpt-conversations.md)
- API focus: [docs/chatgpt-conversation-sharing-api.md](./docs/chatgpt-conversation-sharing-api.md)
- Example: [examples/typescript/share-chatgpt-conversation.ts](./examples/typescript/share-chatgpt-conversation.ts)

## Share Claude conversations

Use the same API with `source_platform: "Claude"`.

- Guide: [docs/share-claude-conversations.md](./docs/share-claude-conversations.md)
- Example: [examples/typescript/share-claude-conversation.ts](./examples/typescript/share-claude-conversation.ts)

## Browser extension integration

Post DOM captures from a background worker with a user token stored in extension storage.

- Doc: [docs/browser-extension-ai-sharing-api.md](./docs/browser-extension-ai-sharing-api.md)
- Example: [examples/javascript/browser-extension-share-chatgpt-conversation.js](./examples/javascript/browser-extension-share-chatgpt-conversation.js)

## Upload AI conversation HTML

Send exported or captured HTML as `raw_html` (see [docs/upload-ai-conversation-html.md](./docs/upload-ai-conversation-html.md)).

## Create secure AI share links

Configure `password`, `password_protected`, and `expiration` ([docs/secure-ai-share-links.md](./docs/secure-ai-share-links.md)).

## API reference

| Endpoint | SDK method |
|----------|------------|
| `POST /api/contents` | `createContent()` |
| `POST /api/attachments` | `uploadAttachment()` |
| Combined | `createContentWithAttachments()` |

Base URL: `https://chat-view.com/api`  
Official reference: [https://chat-view.com/docs/api](https://chat-view.com/docs/api)  
Overview: [docs/chatview-api.md](./docs/chatview-api.md)

## Error handling

```typescript
import { ChatViewApiError } from '@chatview/sdk';

try {
  await client.createContent({ raw_html: '<p>x</p>' });
} catch (e) {
  if (e instanceof ChatViewApiError && e.isRateLimited) {
    // backoff
  }
}
```

Details: [docs/api-error-handling.md](./docs/api-error-handling.md)

## Examples

| Example | Intent |
|---------|--------|
| [share-chatgpt-conversation.js](./examples/javascript/share-chatgpt-conversation.js) | Share ChatGPT via fetch |
| [share-claude-conversation.ts](./examples/typescript/share-claude-conversation.ts) | Claude + SDK |
| [browser-extension-share-chatgpt-conversation.js](./examples/javascript/browser-extension-share-chatgpt-conversation.js) | Extension capture |
| [upload_ai_conversation_html.py](./examples/python/upload_ai_conversation_html.py) | Upload HTML file |
| [create-password-protected-ai-share-link.js](./examples/javascript/create-password-protected-ai-share-link.js) | Password + expiry |

## Supported languages

- **TypeScript / JavaScript** — `@chatview/sdk` in [packages/typescript](./packages/typescript)
- **Python** — `chatview` in [packages/python](./packages/python)
- Raw `fetch` / `curl` examples in [examples/javascript](./examples/javascript)

## FAQ

**Is this the official ChatView SDK?**  
This repository is the open-source **ChatView SDK** maintained for developers integrating with [ChatView](https://chat-view.com). For product terms and support, use the main site.

**Do I need the SDK or can I use HTTP directly?**  
HTTP is enough; the SDK adds typing, multipart uploads, and consistent error types.

**Where do I get an API token?**  
Sign in at [https://chat-view.com](https://chat-view.com), open the Dashboard, and create a user API token.

**Are share pages indexed by Google?**  
Share pages use `noindex`; this SDK repo is indexed separately to help developers find integration docs.

**Can I share without a password?**  
Yes — pass `password_protected: false` when your workflow requires it.

## Related ChatView resources

- Website: [https://chat-view.com](https://chat-view.com)
- API docs: [https://chat-view.com/docs/api](https://chat-view.com/docs/api)
- Docs index: [docs/](./docs/) · Chinese: [docs/zh/](./docs/zh/)
- AI chat export: [docs/ai-chat-export-api.md](./docs/ai-chat-export-api.md)
- Password-protected links: [docs/password-protected-ai-conversation-links.md](./docs/password-protected-ai-conversation-links.md)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
