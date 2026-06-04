import type { ApiErrorBody } from './types.js';

export class ChatViewApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly errors?: Record<string, string[]>;
  readonly retryAfter?: number;

  constructor(status: number, body: ApiErrorBody, retryAfter?: number) {
    super(body.message || `ChatView API error (${status})`);
    this.name = 'ChatViewApiError';
    this.status = status;
    this.code = body.code;
    this.errors = body.errors;
    this.retryAfter = retryAfter;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isValidationError(): boolean {
    return this.status === 422;
  }

  get isRateLimited(): boolean {
    return this.status === 429;
  }
}
