import { describe, it, expect, afterEach } from 'vitest';
import { createMockProvider } from '../mockProvider';
import { RateLimitedError, BlockedError, TimeoutError, NetworkError } from '../provider';
import type { ReadingRequest } from '../provider';

const mockRequest: ReadingRequest = {
  language: 'en',
  name: 'Alex',
  category: 'career',
  spreadId: 'three_cards',
  context: 'What is next for me?',
  drawnCards: [
    {
      card: {
        id: '1',
        arcana: 'major',
        suit: null,
        name: { en: 'The Star', vi: 'Ngôi Sao' },
        keywords: { upright: { en: ['hope'], vi: ['hy vọng'] }, reversed: { en: ['despair'], vi: ['thất vọng'] } },
      },
      orientation: 'upright',
      positionKey: 'spreads.three_cards.positions.current_situation',
    },
  ],
};

describe('createMockProvider with URL mock modes', () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  function setMockUrl(url: string) {
    (globalThis as unknown as { window: unknown }).window = {
      location: new URL(url),
    };
  }

  it('streams English markdown chunks in normal mock mode', async () => {
    setMockUrl('http://localhost:5173/?mock=true');
    const provider = createMockProvider();
    const controller = new AbortController();

    let fullText = '';
    for await (const chunk of provider.generateReading(mockRequest, controller.signal)) {
      fullText += chunk;
      // Stop early after receiving chunks
      if (fullText.length > 80) break;
    }

    expect(fullText.length).toBeGreaterThan(0);
    expect(fullText).toContain('Current Energy');
  });

  it('streams Vietnamese markdown chunks when language is vi', async () => {
    setMockUrl('http://localhost:5173/?mock=true');
    const provider = createMockProvider();
    const controller = new AbortController();

    let fullText = '';
    for await (const chunk of provider.generateReading({ ...mockRequest, language: 'vi' }, controller.signal)) {
      fullText += chunk;
      if (fullText.length > 80) break;
    }

    expect(fullText.length).toBeGreaterThan(0);
    expect(fullText).toContain('Năng lượng hiện tại');
  });

  it('throws RateLimitedError when ?mock=429', async () => {
    setMockUrl('http://localhost:5173/?mock=429');
    const provider = createMockProvider();
    const controller = new AbortController();

    const stream = provider.generateReading(mockRequest, controller.signal);
    await expect(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of stream) {
        // Should throw before yielding chunks
      }
    }).rejects.toThrow(RateLimitedError);
  });

  it('throws BlockedError when ?mock=blocked', async () => {
    setMockUrl('http://localhost:5173/?mock=blocked');
    const provider = createMockProvider();
    const controller = new AbortController();

    const stream = provider.generateReading(mockRequest, controller.signal);
    await expect(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of stream) {
        // Should throw before yielding chunks
      }
    }).rejects.toThrow(BlockedError);
  });

  it('throws TimeoutError when ?mock=timeout', async () => {
    setMockUrl('http://localhost:5173/?mock=timeout');
    const provider = createMockProvider();
    const controller = new AbortController();

    const stream = provider.generateReading(mockRequest, controller.signal);
    await expect(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of stream) {
        // Should throw before yielding chunks
      }
    }).rejects.toThrow(TimeoutError);
  });

  it('throws NetworkError when ?mock=network', async () => {
    setMockUrl('http://localhost:5173/?mock=network');
    const provider = createMockProvider();
    const controller = new AbortController();

    const stream = provider.generateReading(mockRequest, controller.signal);
    await expect(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of stream) {
        // Should throw before yielding chunks
      }
    }).rejects.toThrow(NetworkError);
  });
});
