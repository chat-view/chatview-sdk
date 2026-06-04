# @chatview/sdk

TypeScript API client for [ChatView](https://chat-view.com) — share ChatGPT, Claude, and AI conversations as secure public links.

```bash
npm install @chatview/sdk
```

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient({ apiToken: process.env.CHATVIEW_API_TOKEN! });

const securePublicLink = await client.createContent({
  raw_html: chatgptConversationHtml,
  title: 'My ChatGPT thread',
  source_platform: 'ChatGPT',
  source_url: 'https://chatgpt.com/c/example',
});

console.log(securePublicLink.url, securePublicLink.password);
```

See the [repository README](../../README.md) and [API docs](https://chat-view.com/docs/api).
