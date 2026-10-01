import type { Language, DrawnCard, Category, SpreadId } from '../app/types';

/**
 * Everything the LLM provider needs to generate a reading.
 */
export interface ReadingRequest {
  language: Language;
  name: string;
  category: Category;
  spreadId: SpreadId;
  context: string;
  drawnCards: DrawnCard[];
}

// ─── Typed errors ──────────────────────────────────────────────

/** Base class for all LLM provider errors. */
export abstract class LLMError extends Error {
  /** i18n key to display in the UI. */
  abstract readonly i18nKey: string;
}

export class RateLimitedError extends LLMError {
  readonly i18nKey = 'errors.rate_limited' as const;
  constructor(message = 'Rate limited by the API') {
    super(message);
    this.name = 'RateLimitedError';
  }
}

export class BlockedError extends LLMError {
  readonly i18nKey = 'errors.blocked' as const;
  constructor(message = 'Content was blocked by safety filters') {
    super(message);
    this.name = 'BlockedError';
  }
}

export class TimeoutError extends LLMError {
  readonly i18nKey = 'errors.timeout' as const;
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class NetworkError extends LLMError {
  readonly i18nKey = 'errors.network' as const;
  constructor(message = 'Network connection error') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class UnknownLLMError extends LLMError {
  readonly i18nKey = 'errors.generic' as const;
  constructor(message = 'An unexpected error occurred') {
    super(message);
    this.name = 'UnknownLLMError';
  }
}

/** Maps an unknown error to the appropriate typed LLM error. */
export function mapError(err: unknown): LLMError {
  if (err instanceof LLMError) return err;

  if (err instanceof DOMException && err.name === 'AbortError') {
    return new TimeoutError('Request was aborted');
  }

  if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
    return new NetworkError(err.message);
  }

  const msg = err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();

  if (
    lower.includes('429') ||
    lower.includes('rate limit') ||
    lower.includes('rate_limit') ||
    lower.includes('resource_exhausted') ||
    lower.includes('quota')
  ) {
    return new RateLimitedError(msg);
  }
  if (lower.includes('block') || lower.includes('safety')) {
    return new BlockedError(msg);
  }
  if (lower.includes('timeout') || lower.includes('deadline')) {
    return new TimeoutError(msg);
  }
  if (lower.includes('network') || lower.includes('failed to fetch') || lower.includes('err_network')) {
    return new NetworkError(msg);
  }

  return new UnknownLLMError(msg);
}

// ─── Provider interface ────────────────────────────────────────

export interface ReadingProvider {
  generateReading(
    req: ReadingRequest,
    signal: AbortSignal,
  ): AsyncIterable<string>;
}
