/**
 * This example uses the ChatView API.
 * It shows how to share ChatGPT, Claude or AI assistant conversations.
 * Set CHATVIEW_API_TOKEN in your environment.
 * Never hard-code your ChatView API token.
 *
 * @see https://chat-view.com/docs/api
 */

const CHATVIEW_API_BASE = 'https://chat-view.com/api';

const chatgptConversationHtml = `
<div class="markdown">
  <h2>Example ChatGPT reply</h2>
  <p>Shared via the ChatView API for AI conversation sharing.</p>
</div>
`.trim();

const aiConversationMetadata = {
  conversation_id: 'conv-example-001',
  language: 'en',
  tags: ['chatgpt', 'api-demo'],
};

async function shareChatgptConversation() {
  const token = process.env.CHATVIEW_API_TOKEN;
  if (!token) {
    throw new Error('Set CHATVIEW_API_TOKEN before running this example.');
  }

  const response = await fetch(`${CHATVIEW_API_BASE}/contents`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title: 'ChatGPT conversation shared via API',
      raw_html: chatgptConversationHtml,
      plain_text: 'Example ChatGPT reply — shared via ChatView API.',
      source_platform: 'ChatGPT',
      source_url: 'https://chatgpt.com/c/example-thread',
      model_name: 'GPT-4o',
      metadata: aiConversationMetadata,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `API error ${response.status}`);
  }

  const securePublicLink = await response.json();
  console.log('Share URL:', securePublicLink.url);
  if (securePublicLink.password) {
    console.log('Password (save now — shown once):', securePublicLink.password);
  }
  return securePublicLink;
}

shareChatgptConversation().catch(console.error);
