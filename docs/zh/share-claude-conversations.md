# 如何通过 API 分享 Claude 对话

设置 `source_platform: "Claude"` 与有效的 `source_url`，其余字段与 ChatGPT 相同。

```typescript
await client.createContent({
  raw_html: claudeConversationHtml,
  source_platform: 'Claude',
  source_url: 'https://claude.ai/chat/example',
});
```

**相关：** [英文指南](../share-claude-conversations.md) · [示例](../../examples/typescript/share-claude-conversation.ts)
