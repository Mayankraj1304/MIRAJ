# MIRAJ

MIRAJ is a full-stack marketplace application with a React frontend and an
Express/MongoDB backend. Buyers can browse products and create accounts, while
sellers can publish products and manage their listings.

## Features

- Browse the product catalogue and view individual product details.
- Register and log in with an account.
- Google OAuth sign-in.
- Seller-only product creation and seller dashboard.
- Product image uploads handled by the backend and ImageKit.
- Cookie-based authentication for protected API routes.
- Light/dark theme support.

## Technology

### Frontend

- React 19 and Vite
- React Router
- Redux Toolkit and React Redux
- Axios
- Tailwind CSS
- ESLint

### Backend

- Node.js and Express 5
- MongoDB with Mongoose
- Passport Google OAuth 2.0
- JWT and HTTP-only cookies
- Multer for multipart image uploads
- ImageKit integration

## Repository layout

```text
MIRAJ/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow
├── Backend/
│   ├── server.js           # Backend entry point
│   └── src/
│       ├── config/         # Application and database configuration
│       ├── controllers/    # Request handlers
│       ├── middlewares/    # Authentication and authorization
│       ├── models/         # Mongoose models
│       ├── routes/         # Auth and product API routes
│       ├── services/       # External service integrations
│       └── validator/      # Request validation
└── Frontend/
    ├── src/
    │   ├── app/            # App setup, routes, and shared state
    │   └── features/       # Auth and product experiences
    └── vercel.json         # SPA route rewrites for Vercel
```

## Requirements

- Node.js 24 (the version used by CI) and npm.
- A MongoDB database.
- Credentials for the integrations you plan to use: Google OAuth and ImageKit.

## Local development

### 1. Install dependencies

Open a terminal in each application directory and install dependencies:

```powershell
cd Backend
npm ci
```

In a second terminal:

```powershell
cd Frontend
npm ci
```

### 2. Configure environment variables

Create `Backend/.env` with the following variables. Use your own local
credentials; never commit this file.

```dotenv
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
IMAGEKIT_PRIVATE_KEY=
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

The backend requires `MONGO_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`,
`GOOGLE_CLIENT_SECRET`, and `IMAGEKIT_PRIVATE_KEY` at startup. `NODE_ENV` is
optional and defaults to `development`. `FRONTEND_URL` is the frontend origin
used after Google sign-in and on OAuth failure. `GOOGLE_CALLBACK_URL` is the
absolute OAuth callback URL registered with Google; if omitted, the backend
uses Render's `RENDER_EXTERNAL_URL` when available, or localhost for local
development. The server uses the `PORT` environment variable when supplied and
otherwise listens on port `3000`.

The frontend uses relative `/api` URLs. During local development, the Vite
development-server proxy forwards them to `http://localhost:3000`; in
production, Vercel rewrites them to the Render backend.

### 3. Start the applications

In the backend terminal:

```powershell
npm run dev
```

In the frontend terminal:

```powershell
npm run dev
```

Vite prints the local frontend URL (normally `http://localhost:5173`). The
backend health endpoint is `http://localhost:3000/`.

## API overview

The backend exposes these routes:

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/` | Public | Backend health response |
| `POST` | `/api/auth/register` | Public | Register an account |
| `POST` | `/api/auth/login` | Public | Log in |
| `GET` | `/api/auth/google` | Public | Start Google OAuth |
| `GET` | `/api/auth/google/callback` | Public | Handle Google OAuth callback |
| `GET` | `/api/auth/me` | Authenticated | Get the current user's profile |
| `GET` | `/api/products` | Public | List products |
| `GET` | `/api/products/detail/:id` | Public | Get product details |
| `GET` | `/api/products/seller` | Seller | List the current seller's products |
| `POST` | `/api/products` | Seller | Create a product and upload images |

Product creation accepts multipart form data with an `images` field. The
backend currently limits each uploaded image to 5 MB and accepts up to seven
images per request.

## Quality checks

Run the frontend checks from `Frontend/`:

```sh
npm run lint
npm run build
```

The backend package provides:

```sh
npm start
npm run dev
```

The backend's `test` script is currently a placeholder and exits with an error;
there is not yet a backend automated test suite.

## CI/CD

GitHub Actions is configured in
[`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### Continuous integration

The `MIRAJ CI` workflow runs when:

- Code is pushed to `main`.
- A pull request targets `main`.
- A user manually starts the workflow using `workflow_dispatch`.

The frontend job uses Node.js 24, installs locked dependencies with `npm ci`,
runs ESLint, and builds the production frontend. The backend job also uses
Node.js 24 and `npm ci`, then checks the syntax of `server.js` and JavaScript
files under `Backend/src`. The workflow does not currently run backend tests.

### Deployment

The frontend is configured for Vercel, including SPA route rewrites in
`Frontend/vercel.json`. Production `/api/*` requests are rewritten through
Vercel to the Render backend so browser API calls and authentication cookies
use the frontend's origin. Locally, Vite proxies `/api` requests to
`http://localhost:3000`. The hosting providers' Git integrations are separate
from the GitHub Actions workflow: configure Vercel and Render to deploy from
the intended production branch (normally `main`) and to use the correct project
directories and build/start commands.

Typical project settings are:

| Service | Root directory | Build command | Start/output |
| --- | --- | --- | --- |
| Vercel frontend | `Frontend` | `npm run build` | Output directory: `dist` |
| Render backend | `Backend` | `npm ci` | Start command: `npm start` |

For a CI-gated deployment, configure the hosting provider to wait for the
GitHub Actions checks before deploying, if that option is available. In GitHub,
protect `main` by requiring pull requests and the `Frontend checks` and
`Backend checks` status checks before merge. A successful GitHub Actions run
confirms the checks passed; it does not by itself confirm that the providers
are configured to deploy.

## Environment and secrets

- Do not commit `.env` files, tokens, passwords, or private keys.
- Set backend runtime variables in the backend hosting provider's environment
  settings.
- For Google OAuth on Render, set `FRONTEND_URL` to the deployed Vercel site and
  `GOOGLE_CALLBACK_URL` to
  `https://miraj-three.vercel.app/api/auth/google/callback`. The callback is
  routed through Vercel to Render. Add that exact callback URL to the Google
  OAuth client's authorized redirect URIs.
- Keep local `.env` files out of pull requests. The repository's frontend and
  backend ignore files exclude `.env`.

## Current limitations

- The backend `npm test` command is not implemented yet.
- Backend CI currently performs syntax checks rather than automated behavior
  tests.
- Deployment execution is managed by the hosting provider's Git integration;
  the GitHub Actions workflow currently validates code and does not deploy it.
