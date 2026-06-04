/**
 * This example uses the ChatView API.
 * It shows how to share ChatGPT, Claude or AI assistant conversations.
 * Set CHATVIEW_API_TOKEN in your environment.
 * Never hard-code your ChatView API token.
 */

const CHATVIEW_API_BASE = 'https://chat-view.com/api';

async function createPasswordProtectedShare() {
  const token = process.env.CHATVIEW_API_TOKEN;
  if (!token) throw new Error('Set CHATVIEW_API_TOKEN.');

  const claudeConversationHtml =
    '<div><p>Claude response to share with a custom password.</p></div>';

  const response = await fetch(`${CHATVIEW_API_BASE}/contents`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      raw_html: claudeConversationHtml,
      title: 'Password-protected Claude share',
      source_platform: 'Claude',
      password_protected: true,
      password: 'my-secure-pass',
      expiration: '90',
    }),
  });

  const passwordProtectedShare = await response.json();
  if (!response.ok) {
    throw new Error(passwordProtectedShare.message || 'Request failed');
  }

  console.log(passwordProtectedShare.url);
  return passwordProtectedShare;
}

createPasswordProtectedShare().catch(console.error);
