import { ChatViewApiError } from './errors.js';
import type {
  ApiErrorBody,
  ChatViewClientOptions,
  CreateContentParams,
  CreateContentResponse,
  UploadAttachmentResponse,
} from './types.js';

const DEFAULT_BASE_URL = 'https://chat-view.com/api';

export class ChatViewClient {
  private readonly apiToken: string;
  private readonly baseUrl: string;
  private readonly fetchFn: typeof fetch;

  constructor(options: ChatViewClientOptions = {}) {
    const token =
      options.apiToken ??
      (typeof process !== 'undefined' && process.env?.CHATVIEW_API_TOKEN) ??
      '';
    if (!token) {
      throw new Error(
        'ChatView API token required. Pass apiToken or set CHATVIEW_API_TOKEN.',
      );
    }
    this.apiToken = token;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.fetchFn = options.fetch ?? globalThis.fetch;
    if (!this.fetchFn) {
      throw new Error('fetch is not available. Provide options.fetch.');
    }
  }

  /** POST /api/contents — create a shareable AI conversation link. */
  async createContent(
    params: CreateContentParams,
  ): Promise<CreateContentResponse> {
    const res = await this.fetchFn(`${this.baseUrl}/contents`, {
      method: 'POST',
      headers: this.jsonHeaders(),
      body: JSON.stringify(params),
    });
    return this.parseJson<CreateContentResponse>(res);
  }

  /** POST /api/attachments — upload a file before referencing it in metadata.attachments. */
  async uploadAttachment(file: Blob | File): Promise<UploadAttachmentResponse> {
    const form = new FormData();
    form.append('file', file);
    const res = await this.fetchFn(`${this.baseUrl}/attachments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
      },
      body: form,
    });
    return this.parseJson<UploadAttachmentResponse>(res);
  }

  /**
   * Upload one or more attachments, then create content with metadata.attachments set.
   */
  async createContentWithAttachments(
    params: CreateContentParams,
    files: Array<Blob | File>,
  ): Promise<CreateContentResponse> {
    const ids: number[] = [];
    for (const file of files) {
      const { id } = await this.uploadAttachment(file);
      ids.push(id);
    }
    const metadata = { ...params.metadata, attachments: ids };
    return this.createContent({ ...params, metadata });
  }

  private jsonHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private async parseJson<T>(res: Response): Promise<T> {
    const text = await res.text();
    let body: ApiErrorBody = { message: res.statusText };
    if (text) {
      try {
        body = JSON.parse(text) as ApiErrorBody;
      } catch {
        body = { message: text || res.statusText };
      }
    }
    if (!res.ok) {
      const retryAfter = res.headers.get('Retry-After');
      throw new ChatViewApiError(
        res.status,
        body,
        retryAfter ? Number(retryAfter) : undefined,
      );
    }
    return body as T;
  }
}
