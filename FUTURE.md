# Future Roadmap

This document lists planned enhancements, improvements, and steps to evolve the Social Support Application Portal beyond its current scope.

---

## Testing & Quality Assurance

- [ ] **E2E tests** – Add Playwright or Cypress tests covering the full wizard flow, AI suggestion interaction, language switching, and dark/light mode across viewport sizes
- [ ] **Accessibility tests** – Integrate `axe-core` into unit and E2E tests for automated a11y regression checks
- [ ] **Integration tests** – Test the form submission flow from Step 3 (consent + AI + submit) end-to-end with mocked HTTP
- [ ] **Visual regression tests** – Add Chromatic or Percy snapshots for each step in light/dark mode and each language
- [ ] **Error boundary tests** – Test the ErrorBoundary component with thrown errors to verify retry and message rendering
- [ ] **Backend tests** – Add Vitest or Jest tests for Express routes, rate-limit middleware, and prompt construction logic
- [ ] **Property-based tests** – Use fast-check for Emirates ID validation edge cases and form data invariants
- [ ] **Performance budget** – Configure `vite-plugin-inspect` and set size budgets for lazy-loaded chunks

## Backend & API

- [ ] **Database persistence** – Integrate a database (PostgreSQL with Prisma or SQLite for simplicity) to store submitted applications
- [ ] **Authentication & authorization** – Add user login (JWT or session-based) so applicants can view / edit their submissions
- [ ] **Real submission endpoint** – Replace the Axios mock adapter with a real POST endpoint on the Express server
- [ ] **File upload support** – Allow uploading supporting documents (ID scans, income proof, medical reports) with multer and S3 / local storage
- [ ] **GET endpoint for application status** – Expose an endpoint for applicants to check the status of their submission
- [ ] **Admin dashboard API** – Build CRUD endpoints for administrators to review, approve, or reject applications
- [ ] **Webhook notifications** – Send email/SMS notifications on submission or status change (SendGrid, Twilio)
- [ ] **Health check endpoint** – Add `GET /api/health` for monitoring and load balancer probes

## AI Writing Assistant

- [ ] **Streaming responses** – Use OpenAI streaming (SSE) to show tokens as they arrive instead of a full loading spinner
- [ ] **Multiple suggestions** – Generate 2-3 draft options per field and let the user pick or combine them
- [ ] **Custom tone / length control** – Add dropdowns to adjust the suggestion tone (formal, compassionate, concise) and length (short, medium, detailed)
- [ ] **Context-aware follow-ups** – After accepting a suggestion, offer a "Rewrite" option that takes the accepted text as input for refinement
- [ ] **Offline fallback** – Cache common suggestion templates locally so the feature degrades gracefully when the backend is unreachable
- [ ] **Suggestion history** – Keep a history of accepted and discarded suggestions per session with undo capability
- [ ] **Cost tracking** – Log per-request token usage and estimate OpenAI API cost in development mode

## Form & UX

- [ ] **Multi-language per session** – Allow the applicant to fill the form in one language and submit a translated version for reviewers
- [ ] **Save as draft** – Add explicit "Save" button alongside auto-save, with a "Draft saved" timestamp indicator
- [ ] **Form autosave indicator** – Show a subtle indicator ("Saving..." / "Saved") when localStorage syncs
- [ ] **Rich text fields** – Replace plain textareas on the situation step with a lightweight rich text editor (TipTap or Lexical) for formatting
- [ ] **Collapsible review sections** – On the success step, collapse each section with expand/collapse for a cleaner summary
- [ ] **Optional fields tagging** – Visually distinguish optional fields from required ones with "(optional)" labels
- [ ] **Field-level tooltips** – Add info tooltips on complex fields (e.g., "Emirates ID format", "Net vs gross income")
- [ ] **Wizard progress estimation** – Show an estimated time-to-complete per step based on field count and type

## Localization & Internationalization

- [ ] **Locale-aware number formatting** – Format currency, dates, and numbers according to the selected language (e.g., Arabic Hindi numerals)
- [ ] **Right-to-left polish** – Review all components for RTL edge cases: navbar alignment, stepper connector direction, popover positioning
- [ ] **Additional locales** – Add French, Urdu, Tagalog, and Hindi translations based on common expatriate demographics
- [ ] **ICU message format** – Migrate from simple JSON to i18next ICU format for plural rules, gender inflection, and nested messages
- [ ] **Translation management** – Generate translation keys automatically and integrate with a service like Lokalise or POEditor
- [ ] **Language-aware validation messages** – Custom validation messages that adapt to pluralization and gender rules per locale

## Performance

- [ ] **Bundle analysis** – Run `vite-plugin-visualizer` and set up CI comments on PRs when bundle size changes significantly
- [ ] **Image optimization** – Convert `hero.png` to WebP/AVIF with `<picture>` fallback; lazy-load below-the-fold images
- [ ] **Virtualize long lists** – If the admin dashboard or history view grows, virtualize rows with `react-window` or `@tanstack/virtual`
- [ ] **Preload next step** – After validation, preload the next step's chunk using `<link rel="modulepreload">` or Vite's `preload` API
- [ ] **Route-based code splitting** – Split the success step, error boundary, and admin routes into separate chunks
- [ ] **Memoize selectors** – Add `useMemo` or `useCallback` around context selectors that derive data (e.g., full name, income brackets)
- [ ] **Web worker for rate limiting** – Offload rate-limit timer polling to a Web Worker to avoid main-thread jank

## Design & UI

- [ ] **Responsive mobile layout** – Audit and refine the wizard layout for screens below 480px: full-width cards, smaller stepper, collapsible navbar
- [ ] **Micro-animations** – Add subtle transitions (step entrance, button loading, success celebration) with Framer Motion or CSS animations
- [ ] **Component library storybook** – Set up Storybook for all presentational components with light/dark mode and RTL stories
- [ ] **Custom icon set** – Replace MUI icons with a custom SVG sprite for a more distinctive visual identity
- [ ] **Print-friendly styles** – Add a print stylesheet so submissions can be printed as a physical application form
- [ ] **Reduced motion support** – Respect `prefers-reduced-motion` and disable animations for vestibular accessibility

## Security

- [ ] **Content Security Policy** – Add CSP headers via Vite's `html` plugin or the backend to mitigate XSS
- [ ] **Input sanitization** – Sanitize all text inputs before passing them to the OpenAI prompt to prevent prompt injection
- [ ] **Rate limit by user** – Replace IP-based rate limiting with user-based (when auth is added) and add Redis-backed distributed rate limiting
- [ ] **Environment variable validation** – Validate required env vars at startup on both frontend and backend with descriptive error messages
- [ ] **HTTPS enforcement** – Redirect HTTP to HTTPS in production and set `Strict-Transport-Security` header
- [ ] **Dependency audit** – Run `yarn audit` regularly and configure Dependabot or Renovate for automated dependency updates
- [ ] **Remove TLS bypass from production build** – Error out at build time if `NODE_TLS_REJECT_UNAUTHORIZED=0` is detected outside development

## DevOps & Deployment

- [ ] **Docker setup** – Add `Dockerfile` for frontend (nginx) and backend (Node), plus `docker-compose.yml` for local development
- [ ] **CI/CD pipeline** – Add GitHub Actions workflow for lint, typecheck, test, build, and deploy to staging / production
- [ ] **Staging environment** – Deploy a staging instance with a separate OpenAI key and database for integration testing
- [ ] **Logging & monitoring** – Integrate structured logging (pino or winston) on the backend and error tracking (Sentry) on both tiers
- [ ] **Environment-specific configs** – Manage `.env.staging`, `.env.production` with validation schemas using `envalid` or `zod`
- [ ] **Database migrations** – If a database is introduced, manage schema changes with Prisma Migrate or Flyway
- [ ] **Backup & restore** – Automate database backup and define a restore procedure for disaster recovery

## Documentation

- [ ] **User guide** – Write a step-by-step user guide with screenshots covering all features
- [ ] **API documentation** – Document the Express API endpoint with OpenAPI / Swagger including request/response schemas
- [ ] **Deployment guide** – Document the full deployment process: build, environment variables, reverse proxy, SSL, database setup
- [ ] **Contributing guide** – Add `CONTRIBUTING.md` with coding conventions, PR workflow, and local dev setup instructions
- [ ] **Changelog** – Maintain a `CHANGELOG.md` following Keep a Changelog convention

## Admin Dashboard (Future Feature)

- [ ] **Login page** – Admin authentication with role-based access (reviewer, admin, super-admin)
- [ ] **Applications list** – Table of submitted applications with filtering (status, date, income bracket) and search
- [ ] **Application detail view** – Read-only view of a submitted application with all steps expanded
- [ ] **Status management** – Workflow: Review → Approve / Request Changes / Reject with comment field
- [ ] **Analytics dashboard** – Charts showing submission volume, approval rates, demographics, average processing time
- [ ] **CSV export** – Export filtered application data to CSV for offline reporting
- [ ] **Activity log** – Audit trail of who changed what and when for compliance

## Accessibility

- [ ] **Full keyboard audit** – Navigate every component solely with keyboard and fix focus traps, missing focus indicators, and tab order
- [ ] **Screen reader testing** – Test the full flow with VoiceOver (macOS) and NVDA (Windows); fix announcements and live regions
- [ ] **Color contrast audit** – Verify all text/background combinations meet WCAG 2.1 AA (4.5:1) in both themes
- [ ] **Focus management on step change** – Move focus to the first field of each new step after navigation
- [ ] **Skip link improvements** – Ensure the skip link is visible on focus and navigates to the main form content
- [ ] **ARIA live region for AI suggestion** – Announce "suggestion ready" and "suggestion accepted" to screen readers

---

> **Contributing:** See `ARCHITECTURE.md` for design context and `CONTRIBUTING.md` (once written) for contribution guidelines.
