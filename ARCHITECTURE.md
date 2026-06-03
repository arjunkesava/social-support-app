# Architecture & Design Decisions

This document captures the key architectural decisions made in the Social Support Application Portal project.

---

## 1. Multi-Step Form with React Context (not Redux / Zustand)

**Decision:** Use React Context (`FormContext`) to share form data across steps.

**Rationale:** The form has only 3 data steps with a flat shape. A global state library would be over-engineering. Context + `useState` is sufficient. The context exposes `formData`, `updateStepData`, and `applyDemoAutofill` — enough to coordinate between the wizard, the autofill feature, and the submission service.

**Trade-off:** All consumers re-render when any field changes. Mitigated by keeping the form state in `useForm`'s internal state per step (via `values: formData.<step>`) and only updating context on step submit or autofill.

---

## 2. react-hook-form with `Controller` (not raw `register`)

**Decision:** Wrap all MUI `TextField` components in `react-hook-form`'s `Controller`, not the native `register` spread.

**Rationale:** `register` spreads event handlers without an explicit `value` prop. When the form's external `values` change (e.g., Demo Autofill), the MUI `TextField` doesn't always re-render with the new value — the label fails to float. `Controller` explicitly passes `value` and `onChange`, guaranteeing MUI's controlled component contract.

---

## 3. Value-as-Number via Custom `onChange`

**Decision:** Handle `valueAsNumber` (for `dependents` and `monthlyIncome`) in a custom `onChange` inside `Controller`, instead of using `register`'s `valueAsNumber: true`.

**Rationale:** `valueAsNumber` is a `register`-only option. `Controller` requires explicit conversion. The custom handler `onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}` replicates the same behavior while keeping everything in the `Controller` pattern.

---

## 4. Glassmorphism Design with MUI `sx` (not styled-components or CSS modules)

**Decision:** Style entirely via MUI `sx` prop with co-located `styles.ts` files.

**Rationale:** Keeps styles in the same file tree as components, avoids a CSS-in-JS runtime overhead debate, and stays fully within MUI's theming system. The `sx` prop gives access to the theme's palette, spacing, and breakpoints without additional dependencies.

---

## 5. Lazy-Loaded Steps with Suspense

**Decision:** Each step component is `lazy()` imported in `App.tsx` and wrapped in `<Suspense>` with a skeleton fallback.

**Rationale:** Reduces initial bundle size — only the first step is loaded upfront. The skeleton (`StepFormSkeleton`) provides a polished loading state rather than a blank flash.

---

## 6. Server-Side + Client-Side Rate Limiting

**Decision:** Enforce the same rate limits (30s cooldown, 5 requests per 10 min) on both the Express backend and the React frontend.

**Rationale:** Client-side check provides instant UX feedback (button shows countdown). Server-side check is the real gate (prevents API abuse). The client only calls `tryConsumeRequest` before hitting the API, so the server 429 should rarely fire in normal use.

---

## 7. Writing Suggestion Rate Limit Hook

**Decision:** Encapsulate rate-limit state in a custom hook (`useWritingSuggestionRateLimit`) rather than in the step component or context.

**Rationale:** The logic — tracking timestamps, computing remaining cooldown, polling every 1s when blocked — is self-contained. A hook keeps `StepSituation` clean and makes the rate-limit reusable if other features need the same protection.

---

## 8. PII Consent as a Local State (not persisted)

**Decision:** `piiConsentGiven` is `useState<boolean | null>` in `StepSituation`, not saved to localStorage or FormContext.

**Rationale:** PII consent is a session-level choice. If the user refreshes or re-enters the step, it's reasonable to ask again. Persisting consent would require a clear-reset mechanism and add complexity for little UX gain.

---

## 9. Demo Autofill with Mock Users

**Decision:** Ship 3 hardcoded mock user profiles in a JSON file (`mockUsers.json`), loaded via the DemoAutofill feature.

**Rationale:** The autofill is a developer/demo tool, not a production feature. Hardcoded JSON avoids a database or API dependency. The FAB is positioned fixed and only visible in development — it's excluded by default via conditional rendering if needed.

---

## 10. Mock Application Submission with Axios Adapter

**Decision:** Use Axios's `adapter` option to simulate a backend submission with a `setTimeout` delay, rather than hitting a real API.

**Rationale:** The project focuses on the frontend. A mock adapter provides realistic async flow (loading spinner, error handling, timeout) without requiring a running server for the submission step. Failure can be toggled via `VITE_MOCK_SUBMIT_FAIL`.

---

## 11. i18n with i18next and Static JSON Files

**Decision:** Use `i18next` + `react-i18next` with hand-written JSON translation files.

**Rationale:** Three languages (English, Spanish, Arabic) are manageable as static JSON. i18next provides interpolation (`{{count}}`), plurals, and RTL detection. The language is persisted in localStorage and used to toggle `document.dir` for full RTL layout.

---

## 12. TypeScript Strict Mode with No `any`

**Decision:** Enable strict TypeScript throughout; no `any` or `@ts-ignore` anywhere in the source.

**Rationale:** Catches type errors at compile time. React Hook Form's generics (`useForm<PersonalInfo>`, `Controller<...>`) provide type-safe field names and values. The `FormContext.shared.ts` file serves as the single source of truth for all data shapes.

---

## 13. Step Route Guard

**Decision:** `StepRouteGuard` checks `activeStep` from context and redirects if the user tries to skip ahead.

**Rationale:** Prevents accessing `/situation` without completing `/personal` and `/family`. The guard compares the route's required step index against `context.activeStep` (which is updated on form submit). This prevents URL-manipulation bypasses.

---

## 14. localStorage Persistence

**Decision:** `FormContext` syncs `formData`, `activeStep`, `themeMode`, and `language` to `localStorage` via `useEffect`.

**Rationale:** Users can refresh the page without losing progress. The initial state reads from `localStorage` via `getInitialFormData()`, which merges saved data with defaults (handles schema migrations gracefully).

---

## 15. Emirates ID Validation

**Decision:** Use a regex pattern (`EMIRATES_ID_PATTERN`) matching the `784-YYYY-NNNNNNN-C` format, enforced in the `nationalId` field's validation rules.

**Rationale:** The Emirates ID format is well-defined. Regex validation provides instant client-side feedback without a backend call.

---

## 16. React Compiler Enabled

**Decision:** The Vite config enables the React Compiler Babel plugin.

**Rationale:** React 19's compiler automatically memoizes components and hooks, reducing manual `useMemo`/`useCallback` overhead. Worth enabling from the start on a new project.

---

## 17. Axios for HTTP (not fetch)

**Decision:** Use Axios (already a dependency) for API calls.

**Rationale:** Axios provides request/response interceptors, timeout handling, typed error objects, and the `adapter` override used for mock submission. The `isAxiosError` guard simplifies error discrimination.
