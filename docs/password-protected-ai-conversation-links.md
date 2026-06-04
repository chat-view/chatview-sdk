# Password Protected AI Conversation Links

**Password protected AI conversation links** let you share AI output with people who do not have access to your ChatGPT or Claude account. **ChatView** stores a password hash, returns the plaintext password once at creation time, and gates the `/s/{share_token}` page until the viewer enters it.

## API fields

| Field | Type | Notes |
|-------|------|-------|
| `password_protected` | boolean | Default `true` |
| `password` | string | Min 4 chars; auto-generated if omitted |
| `expiration` | `7` \| `30` \| `90` \| `never` | Default 30 days |

## Example

```javascript
// examples/javascript/create-password-protected-ai-share-link.js
const passwordProtectedShare = await fetch('https://chat-view.com/api/contents', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.CHATVIEW_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    raw_html: claudeConversationHtml,
    title: 'Private Claude review',
    source_platform: 'Claude',
    password_protected: true,
    password: 'my-secure-pass',
    expiration: '90',
  }),
}).then((r) => r.json());
```

## UX recommendations for integrators

- Show `url` and `password` in a copy-friendly dialog immediately after create
- Warn that password is **not** retrievable via API later
- Link users to [https://chat-view.com](https://chat-view.com) to revoke or change settings in Dashboard

## Disabling protection

Set `password_protected: false` only when your workflow explicitly needs a link without a gate—document the risk for end users.

## Related resources

- [Secure AI share links](./secure-ai-share-links.md)
- [API error handling](./api-error-handling.md)
- [README](../README.md)
