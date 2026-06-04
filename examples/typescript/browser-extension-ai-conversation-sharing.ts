/**
 * This example uses the ChatView API.
 * It shows how to share ChatGPT, Claude or AI assistant conversations.
 * Set CHATVIEW_API_TOKEN in your environment.
 * Never hard-code your ChatView API token.
 *
 * Browser extension API for AI conversation sharing with ChatView.
 */

import { ChatViewClient } from '@chatview/sdk';

export interface BrowserExtensionCapture {
  raw_html: string;
  plain_text?: string;
  source_url: string;
  source_platform: string;
  title?: string;
  model_name?: string;
}

export async function shareFromExtension(
  browserExtensionCapture: BrowserExtensionCapture,
  apiToken: string,
) {
  const client = new ChatViewClient({ apiToken });
  return client.createContent({
    raw_html: browserExtensionCapture.raw_html,
    plain_text: browserExtensionCapture.plain_text,
    source_url: browserExtensionCapture.source_url,
    source_platform: browserExtensionCapture.source_platform,
    title: browserExtensionCapture.title,
    model_name: browserExtensionCapture.model_name,
  });
}
