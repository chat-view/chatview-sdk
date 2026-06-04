/**
 * This example uses the ChatView API.
 * It shows how to share ChatGPT, Claude or AI assistant conversations.
 * Set CHATVIEW_API_TOKEN in your environment (chrome.storage in extensions).
 * Never hard-code your ChatView API token.
 *
 * Browser extension: capture DOM and POST to ChatView.
 */

const CHATVIEW_API_BASE = 'https://chat-view.com/api';

async function getApiToken() {
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    const { chatviewApiToken } = await chrome.storage.local.get('chatviewApiToken');
    return chatviewApiToken;
  }
  return process.env.CHATVIEW_API_TOKEN;
}

async function browserExtensionCaptureAndShare() {
  const browserExtensionCapture = {
    raw_html: document.querySelector('[data-message-author-role]')?.parentElement
      ?.innerHTML,
    plain_text: document.body.innerText?.slice(0, 50000),
    source_url: location.href,
    source_platform: location.host.includes('claude') ? 'Claude' : 'ChatGPT',
    title: document.title,
  };

  if (!browserExtensionCapture.raw_html) {
    throw new Error('Could not find conversation HTML on this page.');
  }

  const token = await getApiToken();
  if (!token) throw new Error('Configure ChatView API token in extension storage.');

  const res = await fetch(`${CHATVIEW_API_BASE}/contents`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(browserExtensionCapture),
  });

  const securePublicLink = await res.json();
  if (!res.ok) throw new Error(securePublicLink.message);
  return securePublicLink;
}

// export for MV3 service worker or content script
if (typeof globalThis !== 'undefined') {
  globalThis.browserExtensionCaptureAndShare = browserExtensionCaptureAndShare;
}
