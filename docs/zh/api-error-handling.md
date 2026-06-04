# ChatView API 错误处理

SDK 抛出 `ChatViewApiError`（Python/TypeScript），包含 `status`、`message`、`code`、`errors`。

| 状态码 | 含义 |
|--------|------|
| 401 | Token 无效 |
| 422 | 参数校验失败 |
| 403 | 来源不允许（Default Token） |
| 413 | HTML 过大 |
| 429 | 限流或每日上限 |

对 `429` 使用指数退避并读取 `Retry-After`。详见 [英文版](../api-error-handling.md) 与 [官方文档](https://chat-view.com/docs/api)。
