# 上传 AI 对话 HTML

将导出的 HTML 作为 `raw_html` 提交至 `POST /api/contents`，服务端会清洗后存储。

```bash
curl -X POST "https://chat-view.com/api/contents" \
  -H "Authorization: Bearer $CHATVIEW_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"raw_html":"<p>导出内容</p>","source_platform":"ChatGPT"}'
```

Python 文件上传示例：[upload_ai_conversation_html.py](../../examples/python/upload_ai_conversation_html.py)
