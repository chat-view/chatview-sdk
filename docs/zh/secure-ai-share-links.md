# 安全 AI 分享链接（密码与过期）

默认开启密码保护及 30 天过期。可通过 `password`、`password_protected`、`expiration`（`7`/`30`/`90`/`never`）自定义。

```typescript
await client.createContent({
  raw_html: '<p>内容</p>',
  password_protected: true,
  password: '自定义密码',
  expiration: '90',
});
```

密码仅在创建响应中返回一次。详见 [英文版](../secure-ai-share-links.md)。
