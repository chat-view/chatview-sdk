# ChatView API — 开发者集成指南

**ChatView API** 让你通过 HTTP 将 ChatGPT、Claude、浏览器插件或自建应用中的 AI 对话发布为可分享的链接。本仓库的 **ChatView SDK** 封装了与 [ChatView 官方文档](https://chat-view.com/docs/api) 相同的接口。

## 适用场景

- 将采集的 AI 对话 HTML 转为**带密码的公开链接**
- 在**浏览器扩展**、后端任务或内部工具中自动化分享
- 先上传附件，再在 `metadata.attachments` 中关联

Base URL：`https://chat-view.com/api`

## 鉴权

```http
Authorization: Bearer {CHATVIEW_API_TOKEN}
Content-Type: application/json
```

在 ChatView 控制台生成用户 API Token，切勿提交到 Git。

## 核心接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/contents` | 提交 `raw_html` 等字段，创建分享页 |
| POST | `/api/attachments` | 上传文件，返回附件 ID |

## TypeScript 示例

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient({ apiToken: process.env.CHATVIEW_API_TOKEN! });
const link = await client.createContent({
  raw_html: '<p>AI 回复 HTML</p>',
  title: 'API 集成测试',
  source_platform: 'ChatGPT',
  source_url: 'https://chatgpt.com/c/example',
});
console.log(link.url, link.password);
```

## 相关资源

- [英文 README](../../README.md) · [中文 README](../../README.zh-CN.md)
- [ChatGPT 对话分享 API](./chatgpt-conversation-sharing-api.md)
- [https://chat-view.com](https://chat-view.com) · [API 文档](https://chat-view.com/docs/api)
