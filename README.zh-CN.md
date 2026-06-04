# ChatView SDK — AI 对话分享 API 客户端

[English](./README.md)

**ChatView SDK** 为 [ChatView API](https://chat-view.com/docs/api) 提供 TypeScript 与 Python 客户端及可运行示例，帮助开发者通过 API **分享 AI 对话**、ChatGPT/Claude 回复、**浏览器扩展**采集内容，并生成带密码的**安全公开链接**。本仓库是 [ChatView](https://chat-view.com) 的开发者 SEO 入口，涵盖 AI conversation sharing、ChatGPT 分享、对话 HTML 上传等集成场景。

---

## 什么是 ChatView？

[ChatView](https://chat-view.com) 可将 AI 助手对话发布为独立网页链接（`/s/{share_token}`），支持密码与过期时间，适合团队协作与客户交付。

## 为什么使用 ChatView SDK？

- 封装 `createContent` / `uploadAttachment` / `createContentWithAttachments`
- 统一 **ChatGPT**、**Claude** 等多平台 `source_platform` 字段
- 结构化错误类型，便于扩展与后端重试
- 中英文 [文档](./docs/zh/) 与 [示例](./examples/)

## 安装

```bash
# TypeScript
npm install @chatview/sdk

# Python
pip install chatview

export CHATVIEW_API_TOKEN="控制台生成的 Token"
```

## 快速开始

```typescript
import { ChatViewClient } from '@chatview/sdk';

const client = new ChatViewClient();
const link = await client.createContent({
  raw_html: '<p>来自 ChatView API 的测试内容</p>',
  title: '快速开始',
  source_platform: 'ChatGPT',
});
console.log(link.url);
```

- 官网：[https://chat-view.com](https://chat-view.com)
- API 文档：[https://chat-view.com/docs/api](https://chat-view.com/docs/api)

## 分享 ChatGPT 对话

- [docs/zh/share-chatgpt-conversations.md](./docs/zh/share-chatgpt-conversations.md)
- 示例：[examples/typescript/share-chatgpt-conversation.ts](./examples/typescript/share-chatgpt-conversation.ts)

## 分享 Claude 对话

- [docs/zh/share-claude-conversations.md](./docs/zh/share-claude-conversations.md)
- 示例：[examples/typescript/share-claude-conversation.ts](./examples/typescript/share-claude-conversation.ts)

## 浏览器扩展集成

- [docs/zh/browser-extension-ai-sharing-api.md](./docs/zh/browser-extension-ai-sharing-api.md)
- 示例：[browser-extension-share-chatgpt-conversation.js](./examples/javascript/browser-extension-share-chatgpt-conversation.js)

## 上传 AI 对话 HTML

[docs/zh/upload-ai-conversation-html.md](./docs/zh/upload-ai-conversation-html.md)

## 安全分享链接

[docs/zh/secure-ai-share-links.md](./docs/zh/secure-ai-share-links.md)

## API 参考

| 接口 | SDK 方法 |
|------|----------|
| POST `/api/contents` | `createContent()` |
| POST `/api/attachments` | `uploadAttachment()` |

Base URL：`https://chat-view.com/api`

## 错误处理

[docs/zh/api-error-handling.md](./docs/zh/api-error-handling.md)

## 示例目录

见 [examples/](./examples/)，文件名包含 `share-chatgpt`、`upload-ai-conversation`、`browser-extension` 等可搜索关键词。

## 支持语言

- TypeScript：`packages/typescript`（`@chatview/sdk`）
- Python：`packages/python`（`chatview`）

## 常见问题

**如何获取 Token？** 登录 [chat-view.com](https://chat-view.com) 控制台创建用户 API Token。

**必须用 SDK 吗？** 可直接调用 HTTP；SDK 提供类型与附件组合上传。

**分享页会被搜索引擎收录吗？** 分享页默认 `noindex`；本 GitHub 仓库用于开发者发现集成方式。

## 相关资源

- [英文文档](./docs/)
- [中文文档](./docs/zh/)
- [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可证

MIT — [LICENSE](./LICENSE)
