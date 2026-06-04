# How to Share Claude Conversations with an API

**Share Claude conversations** the same way as ChatGPT: send captured HTML to the **ChatView API** with `source_platform: "Claude"` and a valid `source_url`. The **ChatView SDK** keeps your integration consistent across AI providers.

## Capture from claude.ai

```typescript
const claudeConversationHtml = document.querySelector('.conversation')?.innerHTML;
```

Store `plain_text` alongside HTML so share pages have a readable summary.

## Create a public link for Claude output

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient();
const link = await client.createContent({
  raw_html: claudeConversationHtml ?? '<p>empty</p>',
  title: 'Claude: architecture notes',
  plain_text: 'Architecture notes from Claude…',
  source_platform: 'Claude',
  source_url: 'https://claude.ai/chat/your-id',
  model_name: 'Claude Sonnet',
  expiration: '30',
});
```

Python example: [share_claude via create_content](../examples/python/create_secure_ai_share_link.py) (adjust `source_platform`).

## Differences from ChatGPT

- DOM selectors differ—maintain separate capture helpers per host
- `source_url` must be a valid URL when provided (422 otherwise)
- Password defaults match ChatGPT flows on ChatView

## Related resources

- [AI conversation sharing API](./ai-conversation-sharing-api.md)
- [Example: share-claude-conversation.ts](../examples/typescript/share-claude-conversation.ts)
- [README](../README.md)
- [https://chat-view.com](https://chat-view.com)
