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

/**
 * Eagerly initialize Firebase + App Check so the reCAPTCHA token
 * handshake happens at page load, not on the user's first reading request.
 * Call this once from your root component's mount effect.
 */
export function initFirebase(): void {
  getFirebaseApp();
}

// ─── Model helpers ─────────────────────────────────────────────

const WORD_BUDGETS: Record<string, string> = {
  three_cards: '350-450',
  five_cards: '550-700',
};

const MAX_TOKENS: Record<string, number> = {
  three_cards: 1200,
  five_cards: 1800,
};

function isLiteModel(modelName: string): boolean {
  return modelName.includes('lite');
}

function createModel(modelName: string, req: ReadingRequest): GenerativeModel {
  const app = getFirebaseApp();
  const ai = getAI(app, { backend: new GoogleAIBackend() });

  const wordBudget = WORD_BUDGETS[req.spreadId] ?? WORD_BUDGETS.three_cards;
  const maxOutputTokens = MAX_TOKENS[req.spreadId] ?? MAX_TOKENS.three_cards;

  const isGemini3 =
    modelName.includes('gemini-3') ||
    modelName.includes('3.8') ||
    modelName.includes('3.5');

  // Flash-Lite supports MINIMAL (fastest); Flash uses LOW
  const thinkingConfig = isGemini3
    ? { thinkingLevel: (isLiteModel(modelName) ? 'MINIMAL' : 'LOW') as 'MINIMAL' | 'LOW' }
    : { thinkingBudget: 0 };

  // Flash-Lite ignores temperature/topK/topP — only set for non-lite models
  const samplingConfig = isLiteModel(modelName)
    ? {}
    : { temperature: 0.8 };

  return getGenerativeModel(ai, {
    model: modelName,
    systemInstruction: buildSystemPrompt({
      language: req.language,
      wordBudget,
    }),
    generationConfig: {
      maxOutputTokens,
      ...samplingConfig,
      thinkingConfig,
    },
  });
}

// ─── Error helpers ─────────────────────────────────────────────

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

// ─── Stream helper (shared between primary & fallback) ─────────

async function* streamFromModel(
  model: GenerativeModel,
  userMessage: string,
  signal: AbortSignal,
  modelLabel: string,
): AsyncGenerator<string, void, undefined> {
  const t0 = performance.now();
  let firstChunkLogged = false;

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

    // Log finishReason to detect truncation (MAX_TOKENS)
    if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
      console.warn(
        `[TarotLLM] ${modelLabel} finishReason=${candidate.finishReason}`,
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
      if (!firstChunkLogged) {
        firstChunkLogged = true;
        console.info(
          `[TarotLLM] ${modelLabel} first-chunk: ${Math.round(performance.now() - t0)}ms`,
        );
      }
      yield text;
    }
  }

  console.info(
    `[TarotLLM] ${modelLabel} stream-complete: ${Math.round(performance.now() - t0)}ms`,
  );
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

      // ── Try primary model (no retries — quotas don't recover in seconds) ──
      try {
        if (signal.aborted) {
          throw new TimeoutError('Request was aborted');
        }

        const model = createModel(primaryModel, req);
        yield* streamFromModel(model, userMessage, signal, `primary(${primaryModel})`);
        return; // Success
      } catch (err) {
        // Re-throw blocked errors immediately (no fallback)
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

        // For rate-limit errors: skip retry, jump straight to fallback
        if (isRateLimitError(err)) {
          console.warn(
            `[TarotLLM] primary(${primaryModel}) rate-limited, trying fallback`,
          );
        } else {
          // Non-rate-limit, non-blocked error: also try fallback
          console.warn(
            `[TarotLLM] primary(${primaryModel}) failed:`,
            err instanceof Error ? err.message : err,
          );
        }

        // Fall through to fallback below
      }

      // ── Try fallback model once ──
      if (fallbackModel && fallbackModel !== primaryModel) {
        try {
          if (signal.aborted) {
            throw new TimeoutError('Request was aborted');
          }

          console.info(`[TarotLLM] falling back to ${fallbackModel}`);
          const model = createModel(fallbackModel, req);
          yield* streamFromModel(model, userMessage, signal, `fallback(${fallbackModel})`);
          return; // Success
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

      // No fallback configured — throw rate-limit error
      throw new RateLimitedError(
        'Primary model rate-limited and no fallback configured',
      );
    },
  };
}
