# AGENTS.md - AI Tarot Reader

## Goal
Free, client-side web app giving AI Tarot readings for self-reflection and decision support. Tarot = psychological mirror, NOT fortune-telling or deterministic prediction.

## Hard rules
- 100% free. Static SPA. No custom backend, no database, no accounts. No Cloud Billing linked to the Gemini project.
- NEVER put a Gemini / AI Studio API key in code or env files. Only the Firebase web config (public by design) goes in VITE_* env vars. LLM is called through the Firebase AI Logic client SDK with App Check.
- Session state is transient (refresh = reset). Only the UI language may be stored in localStorage.
- No gemini-1.5-* models (retired). Model names come from env vars; verify names against current docs.

## Stack
Vite + React + TypeScript (strict), Tailwind CSS v4 (@tailwindcss/vite), Motion (package `motion`, import from "motion/react", use LazyMotion), react-markdown + remark-gfm, firebase (firebase/ai, firebase/app-check), Vitest. No Redux/Zustand, no i18n library.

## Structure
src/app (App.tsx, reducer.ts, types.ts) | src/components/{input,deck,reading,common} | src/data (cards.json, spreads.ts) | src/i18n (en.json, vi.json, I18nContext.tsx) | src/lib (shuffle.ts, deck.ts) | src/llm (systemPrompt.ts, buildRequest.ts, provider.ts, mockProvider.ts, firebaseProvider.ts) | public/cards | scripts/validate-cards.mjs

## Product flow
Phases: input -> drawing -> loading -> result (useReducer).
1. Input: language (EN/VI), name, category (Love, Career/Work, Personal Growth, Finance, General Daily Guidance), context textarea (max 1500 chars), spread (3 or 5 cards).
2. Draw: 78 face-down cards in a fan (desktop) / horizontal overlapping strip (mobile). Shuffle once (Fisher-Yates + crypto.getRandomValues); each click reveals the next card of the shuffled deck, so no duplicates. Orientation per card uses const REVERSED_PROBABILITY = 0.5.
3. Reading: build prompt, stream LLM response, render markdown live.
4. Result: 5 sections, "Copy reading" button, "New Reading" resets everything except language.
Spreads: 3-card = Current situation / Challenge or hidden factor / Guidance. 5-card = Present state / Obstacle / Hidden influence / Recommended action / Possible direction if advice is followed.

## Card data
src/data/cards.json: 78 cards (Rider-Waite-Smith). Shape: { id, arcana: "major"|"minor", suit: "wands"|"cups"|"swords"|"pentacles"|null, name:{en,vi}, keywords:{upright:{en:[],vi:[]}, reversed:{en:[],vi:[]}} }. Images: public/cards/{id}.webp; if missing, render a text-based card face fallback.

## Conventions
TS strict, no `any`, functional components, small files, no hardcoded UI strings (use i18n keys), mobile-first (usable at 360px), keyboard accessible, respect prefers-reduced-motion, fonts must have a Vietnamese subset, markdown rendered without raw HTML.

## Agent workflow rules
- Work ONLY on the phase named in the prompt.
- Create folders/files with file tools, not shell mkdir/touch (must work on Windows, macOS and Linux).
- Do not add dependencies not listed here without asking.
- After changes run `npm run build` and `npm run lint` and fix errors.
- End every phase with: files changed, how to verify manually, known limitations.
---END---