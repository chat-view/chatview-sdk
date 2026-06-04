/**
 * This example uses the ChatView API.
 * It shows how to share ChatGPT, Claude or AI assistant conversations.
 * Set CHATVIEW_API_TOKEN in your environment.
 * Never hard-code your ChatView API token.
 */

import { ChatViewClient } from '@chatview/sdk';

const chatgptConversationHtml = `
<div class="markdown">
  <p>Share ChatGPT conversations with the ChatView SDK and API.</p>
</div>
`.trim();

const aiConversationMetadata = {
  conversation_id: 'ts-example-1',
  tags: ['chatgpt', 'sdk'],
};

async function main() {
  const client = new ChatViewClient();
  const securePublicLink = await client.createContent({
    raw_html: chatgptConversationHtml,
    title: 'ChatGPT thread (TypeScript SDK)',
    plain_text: 'Share ChatGPT conversations with the ChatView SDK.',
    source_platform: 'ChatGPT',
    source_url: 'https://chatgpt.com/c/example',
    model_name: 'GPT-4o',
    metadata: aiConversationMetadata,
  });

  console.log('URL:', securePublicLink.url);
  if (securePublicLink.password) {
    console.log('Password:', securePublicLink.password);
  }
}

main().catch(console.error);
