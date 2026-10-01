# AI Tarot Reader

A free, client-side web application providing AI-guided Tarot readings designed for self-reflection and decision support.

---

## 🔮 What It Is

Tarot Reader approaches Tarot as a **psychological mirror** — a symbolic framework to illuminate current dynamics, internal tensions, and creative choices, **not deterministic fortune-telling**.

### Key Highlights
- **100% Free & Private Client-Side SPA**: Built as a pure static Single Page Application with no custom backend, no user accounts, and no persistent databases.
- **Transient Sessions**: Readings exist only in memory during your active browser session (refreshing the page resets the session while preserving your language preference).
- **Rider-Waite-Smith Deck (78 Cards)**: Full canonical dataset containing all 22 Major Arcana and 56 Minor Arcana with rich bilingual interpretations.
- **Dual Spreads**:
  - **3-Card Spread**: Current Situation · Challenge or Hidden Factor · Guidance
  - **5-Card Spread**: Present State · Obstacle · Hidden Influence · Recommended Action · Possible Direction if Advice is Followed
- **Bilingual (English & Tiếng Việt)**: Full native typography with Vietnamese subset font support (`Be Vietnam Pro` and `Playfair Display`), localized system prompts, and card nomenclature.
- **Secure AI Architecture**: Powered by Gemini through Firebase AI Logic client SDK protected by Firebase App Check. No Gemini / AI Studio secret keys are stored in client code or environment variables.

---

## 🚀 Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- `npm` v9 or higher

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tarot-reader.git
   cd tarot-reader
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   *(For quick local testing without Firebase, set `VITE_USE_MOCK=true` in `.env.local`)*

4. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Run test suite**:
   ```bash
   npm test
   ```

6. **Validate card dataset & linting**:
   ```bash
   npm run validate:cards
   npm run lint
   ```

7. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔐 Environment Variables

Environment variables are configured in `.env.local` for local development or within your hosting provider's dashboard:

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `VITE_USE_MOCK` | Optional | Set to `true` to use the canned offline mock generator | `false` |
| `VITE_FIREBASE_API_KEY` | Real mode | Firebase web API key (public client identifier) | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Real mode | Firebase Auth domain | `your-app.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Real mode | Firebase Project ID | `your-app-id` |
| `VITE_FIREBASE_APP_ID` | Real mode | Firebase Web App ID | `1:123456789:web:abcdef` |
| `VITE_APPCHECK_SITE_KEY` | Real mode | reCAPTCHA v3 Site Key for App Check protection | `6Le...` |
| `VITE_GEMINI_MODEL` | Real mode | Primary Gemini model ID | `gemini-3.8-flash` |
| `VITE_GEMINI_FALLBACK_MODEL`| Real mode | Fallback Gemini model if primary hits limits | `gemini-3.5-flash` |

> ⚠️ **Security Rule**: NEVER place a Google AI Studio / Gemini API secret key in environment variables or code. Calls to Gemini are securely handled through the Firebase AI Logic SDK with Firebase App Check attestation. Firebase web configuration variables (`VITE_FIREBASE_*`) are public client identifiers by design.

---

## 🎭 Mock Mode vs. Real Mode

You can run the app completely offline without configuring Firebase by utilizing Mock Mode.

### 1. Via Environment Variable
In `.env.local`:
```env
VITE_USE_MOCK=true
```

### 2. Via URL Query Parameter
Append `?mock=true` to any URL in your browser to activate mock mode on-the-fly:
```
http://localhost:5173/?mock=true
```

### 3. Error Simulation Modes (QA Testing)
You can test the app's localized error handling and retry workflows by passing simulation flags in the URL:
- `?mock=429` — Simulates rate limiting / quota exhaustion
- `?mock=blocked` — Simulates safety filter trigger
- `?mock=timeout` — Simulates request timeout
- `?mock=network` — Simulates network drop / fetch failure

---

## 🃏 Adding Card Images

The app is pre-configured to load card illustrations from the `public/cards/` directory:

1. Card image files must be in **WebP format** and named by their card ID:
   ```
   public/cards/{id}.webp
   ```
   Examples:
   - `public/cards/1.webp` (The Fool)
   - `public/cards/2.webp` (The Magician)
   - `public/cards/78.webp` (King of Pentacles)

2. See `src/data/cards.json` for the complete mapping of IDs 1 through 78.
3. **Graceful Fallback**: If an image file is absent or fails to load, the app automatically renders a responsive, styled vector/text fallback card face showing the card's name, Roman numeral / rank, suit symbol, and key attributes.

---

## 🔥 Firebase Setup Steps

To enable live AI readings with Gemini:

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a project (free Spark plan is sufficient; no billing required).

2. **Register Web App**:
   - In Project Settings, click **Add app** (`</>` Web).
   - Register the app and copy the `firebaseConfig` object values (`apiKey`, `authDomain`, `projectId`, `appId`).

3. **Enable Firebase AI Logic**:
   - In the Firebase Console left navigation, navigate to **Build** → **AI Logic** (or Vertex AI for Firebase).
   - Click **Get started** and enable the Firebase AI API (`firebasevertexai.googleapis.com`).

4. **Set Up Firebase App Check**:
   - Navigate to **Build** → **App Check**.
   - Register **reCAPTCHA v3** as your provider and input your reCAPTCHA v3 site key and secret key (obtained from [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)).
   - For local development: The app automatically activates `FIREBASE_APPCHECK_DEBUG_TOKEN = true` in dev mode. Look at your browser developer console for the debug token and register it under App Check → Manage debug tokens in Firebase Console.

5. **Populate `.env.local`**:
   - Fill in your `.env.local` with the Firebase web credentials and preferred Gemini model IDs.

---

## 🌐 Deployment (Vercel / Netlify)

Because Tarot Reader is a static SPA, it can be deployed to any static host:

### Common Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: `18.x` or `20.x`

### Vercel Deployment
1. Import your Git repository in the [Vercel Dashboard](https://vercel.com).
2. Set Build Command to `npm run build` and Output Directory to `dist`.
3. Under **Environment Variables**, add the variables from `.env.example`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_APPCHECK_SITE_KEY`
   - `VITE_GEMINI_MODEL`
   - `VITE_GEMINI_FALLBACK_MODEL`
   - `VITE_USE_MOCK=false`
4. Click **Deploy**.
5. Add your Vercel deployment domain (e.g. `your-app.vercel.app`) to:
   - **Firebase Console** → Authentication / Settings → **Authorized domains**
   - **Google reCAPTCHA Console** → **Domains** allowlist

### Netlify Deployment
1. Connect repository in [Netlify Dashboard](https://app.netlify.com).
2. Configure build settings:
   - Base directory: `/`
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Configure environment variables in **Site configuration** → **Environment variables**.
4. Click **Deploy site**.
5. Add your Netlify domain (`your-app.netlify.app`) to your reCAPTCHA and Firebase authorized domain lists.

---

## 📜 License & Disclaimer

Tarot Reader is open-source under the MIT License.

*Disclaimer: Tarot readings provided by this application are intended strictly for psychological self-reflection, mindfulness, and personal consideration. They do not constitute deterministic predictions, medical advice, legal counsel, or financial instruction.*
