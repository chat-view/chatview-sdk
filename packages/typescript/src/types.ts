export type ExpirationOption = '7' | '30' | '90' | 'never';

export interface ContentMetadata {
  conversation_id?: string;
  language?: string;
  tags?: string[];
  attachments?: number[];
  [key: string]: unknown;
}

export interface CreateContentParams {
  raw_html: string;
  title?: string;
  plain_text?: string;
  source_platform?: string;
  source_url?: string;
  model_name?: string;
  metadata?: ContentMetadata;
  files_excluded?: boolean;
  password?: string;
  password_protected?: boolean;
  expiration?: ExpirationOption;
}

export interface CreateContentResponse {
  title: string | null;
  url: string;
  share_token: string;
  password_protected: boolean;
  password: string | null;
  expires_at: string | null;
}

export interface UploadAttachmentResponse {
  id: number;
}

export interface ChatViewClientOptions {
  /** Bearer token from ChatView Dashboard. Defaults to CHATVIEW_API_TOKEN env. */
  apiToken?: string;
  /** API base URL. Default: https://chat-view.com/api */
  baseUrl?: string;
  /** Custom fetch implementation (Node 18+ or browser). */
  fetch?: typeof fetch;
}

export interface ApiErrorBody {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
