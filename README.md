# React + TypeScript + Vite

## Help Me Write OpenAI setup

1. Install dependencies if they are not already installed:

   ```sh
   yarn install
   ```

2. Create the backend environment file:

   ```sh
   cp backend/.env.example backend/.env
   ```

3. Add your OpenAI API key in `backend/.env`:

   ```sh
   OPENAI_API_KEY=sk-your-key
   OPENAI_MODEL=gpt-4o-mini
   PORT=4000
   CLIENT_ORIGIN=http://localhost:5173
   ```

   Keep this key only in `backend/.env`. Do not put a real API key in `backend/.env.example` or commit it to git.

4. Start the backend service:

   ```sh
   yarn backend
   ```

5. In another terminal, start the React app:

   ```sh
   yarn dev
   ```

The React client calls `http://localhost:4000/api/help-me-write` by default. To use a different backend URL, set `VITE_API_BASE_URL` before starting Vite.

### Help Me Write rate limits

Both the React client and the backend enforce the same limits to reduce OpenAI cost and abuse:

- **30 seconds** between requests (per browser session on the client, per IP on the server)
- **5 requests** per **10 minutes** (same scope)

The backend returns HTTP `429` with `code` (`COOLDOWN` or `QUOTA`) and `retryAfterMs` when a limit is exceeded. If you deploy behind nginx or similar, set `TRUST_PROXY=true` in `backend/.env` so per-IP limits use `X-Forwarded-For`.

### Fixing local certificate errors

If the backend logs `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, Node cannot verify the certificate chain for the OpenAI HTTPS request. This usually happens on corporate, school, antivirus, VPN, proxy, or custom local certificate networks.

Use the trusted root CA certificate for your network and add it to `backend/.env`:

```sh
NODE_EXTRA_CA_CERTS=/absolute/path/to/company-or-local-ca.pem
```

Then restart `yarn backend`.

Avoid using `NODE_TLS_REJECT_UNAUTHORIZED=0` except as a very short local debugging check. It disables TLS certificate verification for the whole Node process.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
