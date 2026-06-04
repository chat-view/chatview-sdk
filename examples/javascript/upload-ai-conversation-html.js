/**
 * This example uses the ChatView API.
 * It shows how to share ChatGPT, Claude or AI assistant conversations.
 * Set CHATVIEW_API_TOKEN in your environment.
 * Never hard-code your ChatView API token.
 *
 * Upload rendered AI conversation HTML captured from the browser.
 */

const CHATVIEW_API_BASE = 'https://chat-view.com/api';

const chatgptConversationHtml = document
  ? document.querySelector('.conversation')?.innerHTML
  : `<article><p>Fallback HTML when not run in a browser.</p></article>`;

async function uploadAiConversationHtml(rawHtml, plainText) {
  const token = process.env.CHATVIEW_API_TOKEN;
  if (!token) throw new Error('Set CHATVIEW_API_TOKEN.');

  const res = await fetch(`${CHATVIEW_API_BASE}/contents`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      raw_html: rawHtml,
      plain_text: plainText,
      title: 'Uploaded AI conversation HTML',
      source_platform: 'ChatGPT',
      source_url: typeof location !== 'undefined' ? location.href : undefined,
    }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message || res.statusText);
  return body;
}

if (typeof module !== 'undefined') {
  module.exports = { uploadAiConversationHtml };
}
