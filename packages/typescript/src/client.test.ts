import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatViewClient } from './client.js';
import { ChatViewApiError } from './errors.js';

describe('ChatViewClient', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('requires an API token', () => {
    expect(() => new ChatViewClient()).toThrow(/token required/i);
  });

  it('createContent posts JSON to /contents', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          title: 'Test',
          url: 'https://chat-view.com/s/abc',
          share_token: 'abc',
          password_protected: true,
          password: 'x1y2',
          expires_at: null,
        }),
        { status: 201 },
      ),
    );

    const client = new ChatViewClient({ apiToken: 'test-token' });
    const result = await client.createContent({
      raw_html: '<p>hello</p>',
      title: 'Test',
      source_platform: 'ChatGPT',
    });

    expect(result.share_token).toBe('abc');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://chat-view.com/api/contents',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });

  it('uploadAttachment sends multipart form', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 42 }), { status: 201 }),
    );

    const client = new ChatViewClient({ apiToken: 'tok' });
    const file = new Blob(['png'], { type: 'image/png' });
    const result = await client.uploadAttachment(file);

    expect(result.id).toBe(42);
    const [, init] = fetchMock.mock.calls[0];
    expect(init?.body).toBeInstanceOf(FormData);
  });

  it('createContentWithAttachments chains uploads', async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ id: 1 }), { status: 201 }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            title: null,
            url: 'https://chat-view.com/s/tok',
            share_token: 'tok',
            password_protected: false,
            password: null,
            expires_at: null,
          }),
          { status: 201 },
        ),
      );

    const client = new ChatViewClient({ apiToken: 'tok' });
    await client.createContentWithAttachments(
      { raw_html: '<p>x</p>' },
      [new Blob(['a'])],
    );

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const contentCall = fetchMock.mock.calls[1];
    const body = JSON.parse(contentCall[1]?.body as string);
    expect(body.metadata.attachments).toEqual([1]);
  });

  it('throws ChatViewApiError on failure', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          message: 'Unauthorized.',
        }),
        { status: 401 },
      ),
    );

    const client = new ChatViewClient({ apiToken: 'bad' });
    await expect(client.createContent({ raw_html: '<p>x</p>' })).rejects.toBeInstanceOf(
      ChatViewApiError,
    );
  });
});
