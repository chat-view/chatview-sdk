/**
 * This example uses the ChatView API.
 * It shows how to share ChatGPT, Claude or AI assistant conversations.
 * Set CHATVIEW_API_TOKEN in your environment.
 * Never hard-code your ChatView API token.
 */

import { ChatViewClient } from '@chatview/sdk';

const claudeConversationHtml = `
<section>
  <h1>Claude response</h1>
  <p>Exported and shared via ChatView API client.</p>
</section>
`.trim();

async function main() {
  const client = new ChatViewClient();
  const result = await client.createContent({
    raw_html: claudeConversationHtml,
    title: 'Claude conversation share',
    plain_text: 'Claude response shared programmatically.',
    source_platform: 'Claude',
    source_url: 'https://claude.ai/chat/example',
    model_name: 'Claude Sonnet',
    expiration: '30',
  });

  console.log(result.url, result.share_token);
}

main().catch(console.error);
