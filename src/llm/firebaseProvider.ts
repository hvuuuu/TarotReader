import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  ReCaptchaEnterpriseProvider,
} from 'firebase/app-check';
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from 'firebase/ai';
import type { GenerativeModel } from 'firebase/ai';
import type { ReadingRequest } from './provider';
import {
  BlockedError,
  RateLimitedError,
  TimeoutError,
  mapError,
} from './provider';
import { buildSystemPrompt } from './systemPrompt';
import { buildUserMessage } from './buildRequest';

// ─── Firebase singleton ────────────────────────────────────────

let firebaseApp: FirebaseApp | null = null;
let appCheckInitialized = false;

function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;

  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
    appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  };

  firebaseApp =
    getApps().length > 0 ? getApp() : initializeApp(config);

  if (!appCheckInitialized) {
    const siteKey = import.meta.env.VITE_APPCHECK_SITE_KEY as string;

    // In dev or when specified, enable App Check debug token
    const customDebugToken = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN as string;
    if (customDebugToken) {
      (self as unknown as Record<string, unknown>).FIREBASE_APPCHECK_DEBUG_TOKEN = customDebugToken;
    } else if (import.meta.env.DEV) {
      (self as unknown as Record<string, unknown>).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    if (siteKey) {
      const isEnterprise =
        import.meta.env.VITE_APPCHECK_IS_ENTERPRISE === 'true' ||
        import.meta.env.VITE_APPCHECK_PROVIDER === 'enterprise';
      const provider = isEnterprise
        ? new ReCaptchaEnterpriseProvider(siteKey)
        : new ReCaptchaV3Provider(siteKey);

      initializeAppCheck(firebaseApp, {
        provider,
        isTokenAutoRefreshEnabled: true,
      });
    }

    appCheckInitialized = true;
  }

  return firebaseApp;
}

// ─── Model helpers ─────────────────────────────────────────────

const WORD_BUDGETS: Record<string, string> = {
  three_cards: '450-600',
  five_cards: '650-850',
};

const MAX_TOKENS: Record<string, number> = {
  three_cards: 1200,
  five_cards: 1800,
};

function createModel(modelName: string, req: ReadingRequest): GenerativeModel {
  const app = getFirebaseApp();
  const ai = getAI(app, { backend: new GoogleAIBackend() });

  const wordBudget = WORD_BUDGETS[req.spreadId] ?? WORD_BUDGETS.three_cards;
  const maxOutputTokens = MAX_TOKENS[req.spreadId] ?? MAX_TOKENS.three_cards;

  return getGenerativeModel(ai, {
    model: modelName,
    systemInstruction: buildSystemPrompt({
      language: req.language,
      wordBudget,
    }),
    generationConfig: {
      maxOutputTokens,
      temperature: 0.8,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });
}

// ─── Retry / fallback logic ────────────────────────────────────

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 1000;

function isRateLimitError(err: unknown): boolean {
  const msg =
    err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();
  return (
    lower.includes('429') ||
    lower.includes('rate limit') ||
    lower.includes('rate_limit') ||
    lower.includes('resource_exhausted') ||
    lower.includes('quota')
  );
}

function isBlockedResponse(err: unknown): boolean {
  const msg =
    err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();
  return lower.includes('block') || lower.includes('safety');
}

async function sleepMs(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

// ─── Firebase Provider ─────────────────────────────────────────

export function createFirebaseProvider(): {
  generateReading: (
    req: ReadingRequest,
    signal: AbortSignal,
  ) => AsyncIterable<string>;
} {
  return {
    async *generateReading(req, signal) {
      const primaryModel = import.meta.env.VITE_GEMINI_MODEL as string;
      const fallbackModel = import.meta.env
        .VITE_GEMINI_FALLBACK_MODEL as string;

      const userMessage = buildUserMessage(req);
      let lastError: unknown = null;

      // Try primary model with exponential backoff
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        if (signal.aborted) {
          throw new TimeoutError('Request was aborted');
        }

        try {
          const model = createModel(primaryModel, req);
          const result = await model.generateContentStream(userMessage, {
            signal,
          });

          for await (const chunk of result.stream) {
            if (signal.aborted) {
              throw new TimeoutError('Request was aborted');
            }

            // Check for safety blocks in the response
            const candidate = chunk.candidates?.[0];
            if (candidate?.finishReason === 'SAFETY') {
              throw new BlockedError(
                'Response blocked by safety filters',
              );
            }

            // Check for prompt-level blocks
            if (chunk.promptFeedback?.blockReason) {
              throw new BlockedError(
                `Prompt blocked: ${chunk.promptFeedback.blockReason}`,
              );
            }

            const text = chunk.text();
            if (text) {
              yield text;
            }
          }

          // Streamed successfully, we're done
          return;
        } catch (err) {
          lastError = err;

          // Re-throw blocked errors immediately (no retry)
          if (err instanceof BlockedError || isBlockedResponse(err)) {
            throw err instanceof BlockedError
              ? err
              : new BlockedError(
                  err instanceof Error ? err.message : String(err),
                );
          }

          // Re-throw abort errors immediately
          if (
            err instanceof DOMException &&
            err.name === 'AbortError'
          ) {
            throw new TimeoutError('Request timed out');
          }

          // Only retry on rate-limit errors
          if (!isRateLimitError(err)) {
            throw mapError(err);
          }

          // Exponential backoff (only if not last attempt)
          if (attempt < MAX_RETRIES) {
            const delay = BASE_DELAY_MS * Math.pow(2, attempt);
            await sleepMs(delay, signal);
          }
        }
      }

      // All retries exhausted on primary model — try fallback model once
      if (fallbackModel && fallbackModel !== primaryModel) {
        try {
          if (signal.aborted) {
            throw new TimeoutError('Request was aborted');
          }

          const model = createModel(fallbackModel, req);
          const result = await model.generateContentStream(
            userMessage,
            { signal },
          );

          for await (const chunk of result.stream) {
            if (signal.aborted) {
              throw new TimeoutError('Request was aborted');
            }

            const candidate = chunk.candidates?.[0];
            if (candidate?.finishReason === 'SAFETY') {
              throw new BlockedError(
                'Response blocked by safety filters',
              );
            }

            if (chunk.promptFeedback?.blockReason) {
              throw new BlockedError(
                `Prompt blocked: ${chunk.promptFeedback.blockReason}`,
              );
            }

            const text = chunk.text();
            if (text) {
              yield text;
            }
          }

          return;
        } catch (err) {
          if (err instanceof BlockedError) throw err;
          if (
            err instanceof DOMException &&
            err.name === 'AbortError'
          ) {
            throw new TimeoutError('Request timed out');
          }
          throw mapError(err);
        }
      }

      // No fallback or fallback same as primary — throw last error
      if (lastError) {
        throw lastError instanceof RateLimitedError
          ? lastError
          : mapError(lastError);
      }
    },
  };
}
