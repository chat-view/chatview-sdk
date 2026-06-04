# ChatView API Error Handling

Robust **ChatView API error handling** keeps browser extensions and backend jobs reliable under validation failures, auth issues, and rate limits. Both official SDKs raise `ChatViewApiError` with `status`, `message`, optional `code`, and field-level `errors`.

## TypeScript

```typescript
import { ChatViewClient, ChatViewApiError } from '@chatview/sdk';

const client = new ChatViewClient();

try {
  await client.createContent({ raw_html: '<p>x</p>' });
} catch (err) {
  if (err instanceof ChatViewApiError) {
    if (err.isUnauthorized) console.error('Check CHATVIEW_API_TOKEN');
    if (err.isValidationError) console.error(err.errors);
    if (err.isRateLimited) {
      console.error(`Retry after ${err.retryAfter ?? 'unknown'} seconds`);
    }
    console.error(err.code, err.message);
  }
  throw err;
}
```

## Python

```python
from chatview import ChatViewClient, ChatViewApiError

client = ChatViewClient(api_token="…")
try:
    client.create_content(raw_html="<p>x</p>")
except ChatViewApiError as e:
    if e.is_rate_limited:
        print("Retry-After:", e.retry_after)
    if e.is_validation_error:
        print(e.errors)
```

## Common HTTP statuses

| Status | Meaning | Action |
|--------|---------|--------|
| 401 | Invalid/missing token | Refresh Dashboard token |
| 422 | Validation | Fix `raw_html`, URLs, lengths |
| 403 | Source not allowed (default token) | Set valid `source_url` host |
| 413 | HTML too large | Truncate or use user token |
| 429 | Rate / daily limit | Backoff using `Retry-After` |
| 503 | Server token not configured | Contact operator |

Example 429 body:

```json
{
  "message": "Too Many Attempts.",
  "code": "RATE_LIMITED"
}
```

## Retry strategy

Use exponential backoff starting at 1s for `429`, respect `Retry-After` when set, and avoid unbounded loops in extensions.

## Related resources

- [ChatView API](./chatview-api.md)
- [Official error reference](https://chat-view.com/docs/api)
- [SDK tests](../packages/typescript/src/client.test.ts)
