# ChatView API — Integration Guide for Developers

The **ChatView API** lets you programmatically share AI conversations from ChatGPT, Claude, browser extensions, and custom apps. If you are building an integration and need a typed client, the **ChatView SDK** in this repository wraps the same endpoints documented at [ChatView](https://chat-view.com).

## When to use the ChatView API

Use the API when you need to:

- Turn captured AI chat HTML into a **secure public link** users can open in a browser
- Automate sharing from a **browser extension**, backend job, or internal tool
- Attach screenshots or exports via **upload attachment** + `metadata.attachments`
- Set **password protection** and **expiration** for shared pages

Base URL: `https://chat-view.com/api`  
Official reference: [https://chat-view.com/docs/api](https://chat-view.com/docs/api)

## Authentication

Every request requires:

```http
Authorization: Bearer {CHATVIEW_API_TOKEN}
Content-Type: application/json
Accept: application/json
```

Generate a user API token from the ChatView Dashboard. Never commit tokens to Git.

## Core endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/contents` | Create a share link from `raw_html` and metadata |
| `POST` | `/api/attachments` | Upload a file; reference `id` in `metadata.attachments` |

## Quick example (TypeScript SDK)

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient({ apiToken: process.env.CHATVIEW_API_TOKEN! });

const link = await client.createContent({
  raw_html: '<p>AI reply HTML</p>',
  title: 'API integration test',
  source_platform: 'ChatGPT',
  source_url: 'https://chatgpt.com/c/example',
});

console.log(link.url, link.password);
```

Python equivalent:

```python
from chatview import ChatViewClient
import os

client = ChatViewClient(api_token=os.environ["CHATVIEW_API_TOKEN"])
print(client.create_content(raw_html="<p>AI reply</p>", source_platform="ChatGPT")["url"])
```

## Request fields (contents)

Important JSON fields for `POST /api/contents`:

- `raw_html` (required) — sanitized server-side; max length applies per token type
- `plain_text` — recommended for summaries and SEO description on the share page
- `source_platform`, `source_url`, `model_name` — provenance for ChatGPT / Claude / Gemini
- `password`, `password_protected`, `expiration` — control access and lifetime
- `metadata` — arbitrary JSON; include `attachments: [id]` after uploads

## Error handling

The API returns structured JSON for `401`, `422`, `403`, `413`, and `429`. See [api-error-handling.md](./api-error-handling.md).

## Related resources

- [Repository README](../README.md)
- [ChatGPT conversation sharing API](./chatgpt-conversation-sharing-api.md)
- [AI conversation sharing API](./ai-conversation-sharing-api.md)
- [Example: share ChatGPT (TypeScript)](../examples/typescript/share-chatgpt-conversation.ts)
- Learn more at [https://chat-view.com](https://chat-view.com)
- Read the ChatView API documentation: [https://chat-view.com/docs/api](https://chat-view.com/docs/api)
