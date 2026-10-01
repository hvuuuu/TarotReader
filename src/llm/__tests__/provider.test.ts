import { describe, it, expect } from 'vitest';
import {
  mapError,
  RateLimitedError,
  BlockedError,
  TimeoutError,
  NetworkError,
  UnknownLLMError,
  LLMError,
} from '../provider';

describe('mapError', () => {
  it('passes through existing LLMError instances unchanged', () => {
    const original = new RateLimitedError('test');
    expect(mapError(original)).toBe(original);
  });

  it('maps AbortError DOMException to TimeoutError', () => {
    const abort = new DOMException('Aborted', 'AbortError');
    const result = mapError(abort);
    expect(result).toBeInstanceOf(TimeoutError);
    expect(result.i18nKey).toBe('errors.timeout');
  });

  it('maps TypeError with "fetch" to NetworkError', () => {
    const fetchErr = new TypeError('Failed to fetch');
    const result = mapError(fetchErr);
    expect(result).toBeInstanceOf(NetworkError);
    expect(result.i18nKey).toBe('errors.network');
  });

  it('maps error messages containing "429" to RateLimitedError', () => {
    const err = new Error('HTTP 429: Too Many Requests');
    const result = mapError(err);
    expect(result).toBeInstanceOf(RateLimitedError);
    expect(result.i18nKey).toBe('errors.rate_limited');
  });

  it('maps error messages containing "resource_exhausted" to RateLimitedError', () => {
    const err = new Error('RESOURCE_EXHAUSTED: quota exceeded');
    const result = mapError(err);
    expect(result).toBeInstanceOf(RateLimitedError);
  });

  it('maps error messages containing "block" to BlockedError', () => {
    const err = new Error('Content was blocked by safety settings');
    const result = mapError(err);
    expect(result).toBeInstanceOf(BlockedError);
    expect(result.i18nKey).toBe('errors.blocked');
  });

  it('maps error messages containing "safety" to BlockedError', () => {
    const err = new Error('Safety filter triggered');
    const result = mapError(err);
    expect(result).toBeInstanceOf(BlockedError);
  });

  it('maps error messages containing "timeout" to TimeoutError', () => {
    const err = new Error('Request timeout exceeded');
    const result = mapError(err);
    expect(result).toBeInstanceOf(TimeoutError);
    expect(result.i18nKey).toBe('errors.timeout');
  });

  it('maps error messages containing "deadline" to TimeoutError', () => {
    const err = new Error('DEADLINE_EXCEEDED');
    const result = mapError(err);
    expect(result).toBeInstanceOf(TimeoutError);
  });

  it('maps error messages containing "network" to NetworkError', () => {
    const err = new Error('Network error occurred');
    const result = mapError(err);
    expect(result).toBeInstanceOf(NetworkError);
    expect(result.i18nKey).toBe('errors.network');
  });

  it('maps error messages containing "ERR_NETWORK" to NetworkError', () => {
    const err = new Error('ERR_NETWORK: connection refused');
    const result = mapError(err);
    expect(result).toBeInstanceOf(NetworkError);
  });

  it('maps unknown errors to UnknownLLMError', () => {
    const err = new Error('Something weird happened');
    const result = mapError(err);
    expect(result).toBeInstanceOf(UnknownLLMError);
    expect(result.i18nKey).toBe('errors.generic');
  });

  it('maps non-Error values to UnknownLLMError', () => {
    const result = mapError('string error');
    expect(result).toBeInstanceOf(UnknownLLMError);
    expect(result.message).toBe('string error');
  });

  it('all error types extend LLMError', () => {
    expect(new RateLimitedError()).toBeInstanceOf(LLMError);
    expect(new BlockedError()).toBeInstanceOf(LLMError);
    expect(new TimeoutError()).toBeInstanceOf(LLMError);
    expect(new NetworkError()).toBeInstanceOf(LLMError);
    expect(new UnknownLLMError()).toBeInstanceOf(LLMError);
  });

  it('each error type has a unique i18n key', () => {
    const keys = new Set([
      new RateLimitedError().i18nKey,
      new BlockedError().i18nKey,
      new TimeoutError().i18nKey,
      new NetworkError().i18nKey,
      new UnknownLLMError().i18nKey,
    ]);
    // Network and unknown share different keys
    expect(keys.size).toBe(5);
  });
});
