# Social Support Portal

![Demo screen cast](./public/screen-cast-demo.gif)

---

## Overview

A multi-step social support application form built with **React, TypeScript, and Material UI**. Users fill in personal, financial, and situational details across four steps. The form includes an **AI-powered "Help me write"** feature (powered by OpenAI) that drafts contextual paragraphs for each situation field. The app supports **English, Spanish, and Arabic** with full RTL layout for Arabic.

---

## Installation & Setup

### Prerequisites

- **Node.js** >= 18
- **Yarn** (or npm)
- **OpenAI API key** (for the AI writing feature)

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd social-support-app

# 2. Install frontend dependencies
yarn install

# 3. Configure the backend environment
cp backend/.env.example backend/.env
```

```bash
# 4. Edit backend/.env with your OpenAI key
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

> **⚠️ TLS certificate note:** The default `backend/.env` sets `NODE_TLS_REJECT_UNAUTHORIZED=0` to bypass local certificate chain issues when connecting to OpenAI from a development machine. This is safe for local dev but **must never be used in production**. If your environment verifies TLS correctly, remove or set it to `1`.

```bash
# 5. Start the backend (AI suggestion service)
yarn backend
```

```bash
# 6. In a separate terminal, start the React dev server
yarn dev
```

Open **http://localhost:5173** in your browser.

---

### Features

- [x] **Multi-step wizard** – Personal → Family & Financial → Situation → Success
- [x] **AI writing assistant** – "Help me write" generates draft text via OpenAI for each situation field
- [x] **Rate limiting** – 30s cooldown / 5 requests per 10 min (client + server)
- [x] **Demo Autofill** – FAB with mock user profiles for quick testing
- [x] **PII Consent** – Explicit user consent before personal data is used for AI prompts
- [x] **Internationalization** – English, Spanish, Arabic (full RTL support)
- [x] **Dark / Light mode** – Theme toggle persisted across sessions
- [x] **Route guard** – Prevents skipping steps out of order
- [x] **localStorage persistence** – Form data, step progress, theme and language preferences saved
- [x] **Glassmorphism UI** – Polished MUI design with frosted-glass cards
- [x] **Mock submission** – Simulated API submission with configurable success/failure
- [x] **Accessibility** – ARIA labels, keyboard navigation, screen reader support
- [x] **React Compiler** – Optimized re-renders with React Compiler enabled
- [x] **Code quality** – ESLint, Prettier, Husky pre-commit hooks, lint-staged

---

## Architecture Diagram

```
┌────────────────────────────────────────────────────────────┐
│                    Browser (Vite + React 19)               │
│                                                            │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌─────────┐  │
│  │ Personal │──►│  Family  │──►│ Situation│──►│ Success │  │
│  │   Step   │   │   Step   │   │   Step   │   │   Step  │  │
│  └──────────┘   └──────────┘   └──────────┘   └─────────┘  │
│        │              │              │                     │
│        └──────────────┴──────────────┘                     │
│                        │  FormContext (React Context)      │
│                        ▼                                   │
│              ┌─────────────────┐                           │
│              │  localStorage   │  (persistence)            │
│              └─────────────────┘                           │
│                                                            │
│  ┌──────────────────┐    ┌────────────────────┐            │
│  │  Demo Autofill   │    │  "Help me write"   │            │
│  │  (mock users)    │    │  AI Suggestion     │            │
│  └──────────────────┘    └─────────┬──────────┘            │
│                                    │ POST /api/help-me-write
└────────────────────────────────────┼───────────────────────┘
                                     │
                                     ▼
                     ┌──────────────────────────┐
                     │  Express (port 4000)     │
                     │  Rate Limiter → OpenAI   │
                     └──────────────────────────┘
```

---

### Configuration

| Env Variable                   | Default                 | Description                                                                                                                           |
| ------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`            | `http://localhost:4000` | Backend URL for AI suggestions                                                                                                        |
| `VITE_MOCK_SUBMIT_FAIL`        | `false`                 | Set to `true` to simulate submission failure                                                                                          |
| `PORT`                         | `4000`                  | Backend server port                                                                                                                   |
| `OPENAI_MODEL`                 | `gpt-3.5-turbo`         | OpenAI model for text generation                                                                                                      |
| `CLIENT_ORIGIN`                | `http://localhost:5173` | CORS allowed origin                                                                                                                   |
| `TRUST_PROXY`                  | –                       | Set to `true` behind nginx for IP-based rate limiting                                                                                 |
| `NODE_TLS_REJECT_UNAUTHORIZED` | `0`                     | Set to `0` to disable TLS certificate verification for local development (avoids local CA chain issues). **Never use in production.** |

### Available Scripts

| Script         | Description                         |
| -------------- | ----------------------------------- |
| `yarn dev`     | Start Vite dev server               |
| `yarn backend` | Start Express backend               |
| `yarn build`   | TypeScript check + production build |
| `yarn test`    | Run tests (Vitest)                  |
| `yarn lint`    | ESLint check                        |
| `yarn format`  | Prettier formatting                 |
| `yarn preview` | Preview production build            |

---

## Project Deliverables

- [x] Multi-step form with validation (react-hook-form + Controller)
- [x] Personal info fields: name, Emirates ID, DOB, gender, phone, email, address
- [x] Family & financial fields: marital status, dependents, employment, income, housing
- [x] Situation description text areas with "Help me write" AI integration
- [x] AI suggestion dialog with edit/accept/discard flow
- [x] Rate limiting (30s cooldown + 5/10min quota) on client and server
- [x] PII consent notice – blocks "Help me write" until user agrees
- [x] Demo Autofill – FAB with 3 mock user profiles for rapid testing
- [x] Glassmorphism UI with dark/light theme toggle
- [x] Internationalization (English, Spanish, Arabic) with RTL layout
- [x] Step route guard – prevents navigating to incomplete steps
- [x] localStorage persistence (form data, step progress, theme, language)
- [x] Mock application submission with configurable success/failure
- [x] Lazy-loaded step components with Suspense + skeleton
- [x] ESLint + Prettier + Husky pre-commit hooks
- [x] Accessibility – ARIA labels, semantic HTML, keyboard navigation
- [x] Unit tests (Vitest + React Testing Library)
- [x] React Compiler enabled for optimized re-renders
- [x] TypeScript strict mode throughout

---

## License

MIT
