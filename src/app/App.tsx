import { useReducer, useEffect, useCallback, useRef } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react';
import type { Card, Language, ReadingInput } from './types';
import { appReducer, createInitialState } from './reducer';
import { I18nProvider, useI18n } from '../i18n/I18nContext';
import { createShuffledDeck } from '../lib/deck';
import cardsData from '../data/cards.json';
import { InputScreen } from '../components/input/InputScreen';
import { DrawScreen } from '../components/deck/DrawScreen';
import { ResultScreen } from '../components/reading/ResultScreen';
import { createMockProvider } from '../llm/mockProvider';
import { createFirebaseProvider, initFirebase } from '../llm/firebaseProvider';
import type { LLMError } from '../llm/provider';
import { mapError } from '../llm/provider';

const TIMEOUT_MS = 45_000;

function getProvider() {
  const urlMock =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('mock');
  const useMock = import.meta.env.VITE_USE_MOCK === 'true' || urlMock;
  return useMock ? createMockProvider() : createFirebaseProvider();
}

function AppContent() {
  const { language, setLanguage } = useI18n();
  const [state, dispatch] = useReducer(
    appReducer,
    language,
    createInitialState
  );

  const abortRef = useRef<AbortController | null>(null);

  // Pre-warm Firebase + App Check (reCAPTCHA token handshake) at page load
  useEffect(() => {
    initFirebase();
  }, []);

  // Sync language changes between I18nContext and AppState
  useEffect(() => {
    if (state.language !== language) {
      dispatch({ type: 'SET_LANGUAGE', payload: language });
    }
  }, [language, state.language]);

  // ─── LLM streaming effect ──────────────────────────────────
  useEffect(() => {
    if (state.phase !== 'loading') return;

    const controller = new AbortController();
    abortRef.current = controller;

    // Set a 45s timeout
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      controller.abort();
    }, TIMEOUT_MS);
    let hasReceivedChunks = false;

    const run = async () => {
      try {
        const provider = getProvider();
        const stream = provider.generateReading(
          {
            language: state.language,
            name: state.input.name,
            category: state.input.category,
            spreadId: state.input.spreadId,
            context: state.input.context,
            drawnCards: state.drawnCards,
          },
          controller.signal,
        );

        for await (const chunk of stream) {
          if (controller.signal.aborted) break;
          hasReceivedChunks = true;
          dispatch({ type: 'RECEIVE_STREAM_CHUNK', payload: chunk });
        }

        if (!controller.signal.aborted) {
          dispatch({ type: 'FINISH_READING' });
        }
      } catch (err) {
        if (isTimeout) {
          if (hasReceivedChunks) {
            dispatch({ type: 'FINISH_READING' });
          } else {
            dispatch({ type: 'SET_ERROR', payload: 'errors.timeout' });
          }
          return;
        }
        if (controller.signal.aborted) {
          if (hasReceivedChunks) {
            dispatch({ type: 'FINISH_READING' });
            return;
          }
          // Request was deliberately cancelled by New Reading/reset
          return;
        }
        const llmErr: LLMError = mapError(err);
        dispatch({ type: 'SET_ERROR', payload: llmErr.i18nKey });
      } finally {
        clearTimeout(timeoutId);
      }
    };

    run();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
      abortRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only when entering loading phase
  }, [state.phase]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    dispatch({ type: 'SET_LANGUAGE', payload: newLang });
  };

  const handleInputChange = (
    field: keyof ReadingInput,
    value: ReadingInput[keyof ReadingInput]
  ) => {
    dispatch({
      type: 'SET_INPUT_FIELD',
      payload: { field, value },
    });
  };

  const handleStartDraw = () => {
    const shuffled = createShuffledDeck(cardsData as Card[]);
    dispatch({
      type: 'START_DRAW',
      payload: { deck: shuffled },
    });
  };

  const handlePickCard = () => {
    dispatch({ type: 'PICK_NEXT_CARD' });
  };

  const handleRevealReading = useCallback(() => {
    dispatch({ type: 'SUBMIT_READING' });
  }, []);

  const handleRetry = useCallback(() => {
    dispatch({ type: 'SUBMIT_READING' });
  }, []);

  const handleReset = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AnimatePresence mode="wait">
        {state.phase === 'input' && (
          <m.div
            key="input"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col"
          >
            <InputScreen
              input={state.input}
              language={state.language}
              onInputChange={handleInputChange}
              onLanguageChange={handleLanguageChange}
              onStart={handleStartDraw}
            />
          </m.div>
        )}

        {state.phase === 'drawing' && (
          <m.div
            key="drawing"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col"
          >
            <DrawScreen
              language={state.language}
              drawnCards={state.drawnCards}
              spreadId={state.input.spreadId}
              onLanguageChange={handleLanguageChange}
              onPickCard={handlePickCard}
              onRevealReading={handleRevealReading}
              onReset={handleReset}
            />
          </m.div>
        )}

        {(state.phase === 'loading' || state.phase === 'result') && (
          <m.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col"
          >
            <ResultScreen
              language={state.language}
              input={state.input}
              drawnCards={state.drawnCards}
              spreadId={state.input.spreadId}
              readingMarkdown={state.readingMarkdown}
              isLoading={state.phase === 'loading'}
              error={state.error}
              onLanguageChange={handleLanguageChange}
              onNewReading={handleReset}
              onRetry={handleRetry}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function App() {
  return (
    <LazyMotion features={domAnimation}>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </LazyMotion>
  );
}
