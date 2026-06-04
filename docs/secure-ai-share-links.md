# Secure AI Share Links — Passwords and Expiration

**Secure AI share links** balance easy sharing with access control. The **ChatView API** hashes passwords server-side, supports optional expiration (`7`, `30`, `90`, `never`), and returns the plaintext password only in the create response.

## Default behavior

Unless you pass `password_protected: false`, new shares are password-protected with an auto-generated 4-character password and a 30-day expiration. Share pages include `noindex, nofollow`—they are not designed for open web indexing.

## Custom password and expiry

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient();
const passwordProtectedShare = await client.createContent({
  raw_html: '<p>Sensitive Claude output</p>',
  title: 'Review draft',
  source_platform: 'Claude',
  password_protected: true,
  password: 'team-review-2026',
  expiration: '90',
});

console.log(passwordProtectedShare.url, passwordProtectedShare.expires_at);
```

## Public (no password) links

For truly public shares inside a trusted group:

```json
{
  "raw_html": "<p>Public demo</p>",
  "password_protected": false
}
```

Use sparingly—defaults exist to reduce accidental public exposure.

## Operational tips

- Persist `url` + `password` immediately; password is not returned again
- Rotate or delete shares from the ChatView Dashboard
- See also [password-protected-ai-conversation-links.md](./password-protected-ai-conversation-links.md)

## Related resources

- [Example: create-password-protected-ai-share-link.js](../examples/javascript/create-password-protected-ai-share-link.js)
- [ChatView API](./chatview-api.md)
- Manage links at [https://chat-view.com](https://chat-view.com)
