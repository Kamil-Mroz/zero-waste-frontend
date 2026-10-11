# ZeroWaste Frontend

React and TypeScript single-page application for **ZeroWaste**, a community marketplace for giving away items and encouraging reuse. The frontend connects to the ZeroWaste Spring Boot API and provides marketplace, account, community, and administration workflows.

**Repository:** https://github.com/Kamil-Mroz/zero-waste-frontend
**Backend:** https://github.com/Kamil-Mroz/zero-waste-backend

## Contents

- [Features](#features)
- [Technology](#technology)
- [Application structure](#application-structure)
- [Requirements](#requirements)
- [Local development](#local-development)
- [Environment configuration](#environment-configuration)
- [API and real-time communication](#api-and-real-time-communication)
- [Available scripts](#available-scripts)
- [Production build](#production-build)
- [Docker deployment](#docker-deployment)
- [Quality checks](#quality-checks)
- [Security and deployment notes](#security-and-deployment-notes)

## Features

- **Marketplace:** browse listings, filter by category, view item details, and create or edit listings.
- **Image uploads:** work with the backend's image-upload workflow, including presigned URLs for direct uploads to S3-compatible object storage.
- **Authentication:** login and registration flows, protected routes, and refresh-token handling through the backend.
- **Profiles:** view public profiles, manage the current profile, and see item summaries and review information.
- **Offers:** create and manage offers associated with listings.
- **Reviews and ratings:** submit reviews and view rating summaries.
- **Eco Hub:** browse community blog posts and provide writer-facing blog creation workflows.
- **Notifications:** display notification history and unread state, with live updates over STOMP/WebSocket.
- **Administration:** user-management actions, including ban/unban workflows, and category management.
- **Role-aware navigation:** separate route areas for unauthenticated users, authenticated users, and writers, with access control also enforced by the backend.
- **Responsive interface:** reusable UI primitives, accessible interaction patterns, and toast feedback.

## Technology

| Technology                 | Role                                      |
| -------------------------- | ----------------------------------------- |
| React 19                   | Component-based UI                        |
| TypeScript                 | Static typing                             |
| Vite 8                     | Development server and production bundler |
| TanStack Router            | File-based routing and route organization |
| TanStack Query             | Server-state fetching and caching         |
| TanStack Form and Zod      | Form state and schema validation          |
| TanStack Table             | Data-table functionality                  |
| Zustand                    | Client-side state management              |
| Tailwind CSS 4             | Utility-first styling                     |
| shadcn/ui and Radix UI     | Reusable UI primitives                    |
| Axios                      | HTTP client                               |
| SockJS and STOMP.js        | Real-time messaging client                |
| Lucide React               | Icons                                     |
| Sonner                     | Toast notifications                       |
| Biome                      | Linting and formatting                    |
| Vitest and Testing Library | Automated tests                           |
| Nginx                      | Production static-file server             |
| Docker                     | Containerized build and deployment        |

Dependencies and scripts are defined in [`package.json`](./package.json). The project uses pnpm and includes a `pnpm-lock.yaml` lockfile.

## Application structure

The code is organized around product features, with route files defining page composition and access areas.

```text
src/
├── features/
│   ├── auth/           # Login, registration, authentication context
│   ├── blog/           # Blog list and detail functionality
│   ├── category/       # Category tree and browsing
│   ├── item/           # Marketplace cards, details, and item forms
│   ├── notification/   # Notification list and unread indicators
│   ├── offer/          # Offer creation and management
│   ├── profile/        # Profile views and editing
│   ├── review/         # Review forms and rating breakdowns
│   ├── shared/         # Shared feature components and utilities
│   ├── users/          # User-management UI
│   └── webSocket/      # SockJS/STOMP connection setup
├── lib/
│   ├── axios.ts        # Shared Axios client and interceptors
│   └── utils.ts        # Shared utilities
├── routes/
│   ├── __root.tsx      # Root route and application shell
│   ├── _unauthenticated/ # Login and registration routes
│   ├── _authenticated/  # Protected application routes
│   ├── _writer/         # Writer-only route area
│   ├── marketplace/     # Public marketplace pages
│   ├── eco-hub/         # Public blog pages
│   ├── profile/$userId/ # Public user profile
│   ├── index.tsx        # Home page
│   └── unauthorized.tsx # Unauthorized-access page
├── types/              # Shared TypeScript types
├── main.tsx            # Client entry point
└── styles.css          # Global styles

public/                 # Static public assets
Dockerfile              # Multi-stage production image
nginx.conf              # Nginx static-serving configuration
vite.config.ts          # Vite and TanStack Router configuration
biome.json              # Biome settings
```

This is a representative map of the repository's main areas; individual route and feature files may change as the project evolves.

## Requirements

- **Node.js 24 recommended** (the Docker builder uses Node 24).
- **pnpm 10 or compatible Corepack-managed pnpm**.
- A running instance of the [ZeroWaste backend](https://github.com/Kamil-Mroz/zero-waste-backend) for API-backed functionality.

Enable Corepack if pnpm is not available:

```bash
corepack enable
```

## Local development

Clone the repository and install dependencies:

```bash
git clone https://github.com/Kamil-Mroz/zero-waste-frontend.git
cd zero-waste-frontend
pnpm install
```

Create a local `.env` file based on `.env.example` and configure the backend URL (see [Environment configuration](#environment-configuration)).

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The Vite development server proxies `/api` requests and `/ws` WebSocket traffic to the configured backend URL. Ensure the backend is reachable from the development machine.

## Environment configuration

The checked-in `.env.example` defines these variables:

| Variable            | Purpose                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_BASE_API_URL` | Backend origin used by Vite's `/api` and `/ws` development proxies. Set it to the backend origin, for example `http://localhost:8080`. |
| `NODE_ENV`          | Environment-mode value, if needed by the local setup.                                                                                  |

Example `.env` for local development:

```dotenv
VITE_BASE_API_URL=http://localhost:8080
NODE_ENV=development
```

Vite exposes variables prefixed with `VITE_` to frontend code. Do not put passwords, private API keys, signing secrets, or other confidential values in frontend environment variables: bundled frontend values are not secret.

The Vite proxy configuration is for development only. In production, configure your reverse proxy or hosting platform to route `/api` to the backend HTTP API and `/ws` to the backend WebSocket endpoint. The Nginx configuration in this repository currently serves the SPA and static assets; its example API/WebSocket proxy blocks are commented out.

## API and real-time communication

The frontend is designed to work with the ZeroWaste backend. API requests use the shared Axios client, while live notification updates use SockJS and STOMP.

- **REST API:** requests use the `/api` path, with the backend API versioned under `/api/v1`.
- **WebSocket:** `/ws` is the proxy path used by the development configuration. The production proxy must support WebSocket upgrades.
- **Authentication:** the client authentication flow integrates with backend login and refresh-token behavior. Keep frontend and backend origins, cookie settings, and proxy behavior aligned.
- **Images:** image upload operations use backend-issued presigned URLs where configured. Browser uploads go directly to the object-storage endpoint, so the storage bucket's CORS policy must permit the deployed frontend origin and required upload method/headers.

Refer to the backend's API documentation for the exact request and response schemas. The backend remains responsible for authorization and validation; hiding a UI control is not a security boundary.

## Available scripts

| Command        | Description                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| `pnpm dev`     | Start Vite on port `3000` with hot-module replacement.                                                  |
| `pnpm build`   | Type-check/build according to the Vite project configuration and generate production assets in `dist/`. |
| `pnpm preview` | Preview the generated production build locally.                                                         |
| `pnpm test`    | Run the Vitest test suite once.                                                                         |
| `pnpm lint`    | Run Biome lint checks.                                                                                  |
| `pnpm format`  | Run Biome formatting.                                                                                   |
| `pnpm check`   | Run Biome's combined checks.                                                                            |

For a local quality-check pass:

```bash
pnpm check
pnpm test
pnpm build
```

## Production build

Create the production bundle:

```bash
pnpm build
```

Vite writes static assets to `dist/`. The built application can be served by Nginx or another static web server. Configure SPA fallback routing so deep links resolve to `index.html`.

## Docker deployment

The repository includes a multi-stage Dockerfile:

1. A Node 24 Alpine builder installs locked dependencies with `pnpm install --frozen-lockfile` and runs the production build.
2. A slim Nginx image serves the generated `dist/` files.
3. The Nginx process runs as the unprivileged `nginx` user.

Build the image:

```bash
docker build -t zero-waste-frontend .
```

Run it locally:

```bash
docker run --rm --name zero-waste-frontend -p 8081:80 zero-waste-frontend
```

Open [http://localhost:8081](http://localhost:8081).

The Nginx configuration provides SPA fallback routing and long-lived caching for static assets. It does **not currently enable** its sample `/api` and `/ws` proxy blocks; they are commented out. For a complete deployment, route those paths through Traefik, another reverse proxy, or an explicitly configured Nginx proxy to the backend. Keep frontend and backend on a network where the proxy can resolve and reach the backend service. TLS should terminate at the public reverse proxy or hosting layer.

Because Vite environment variables are normally embedded during the build, set build-time frontend variables as required by the code. The current Dockerfile does not declare an `ARG`/`ENV` for `VITE_BASE_API_URL`; production routing through same-origin `/api` and `/ws` paths avoids exposing environment-specific backend hostnames in the bundle.

## Quality checks

Before opening a pull request, run:

```bash
pnpm check
pnpm test
pnpm build
```

Biome is used for linting and formatting, and Vitest is the test runner. Keep new tests close to the feature they cover and avoid committing generated build output or local environment files.

## Security and deployment notes

- Enforce authentication, role checks, and data validation on the backend.
- Use HTTPS in production and configure secure cookie behavior consistently with the backend.
- Configure CORS and reverse-proxy routing deliberately; avoid reflecting arbitrary origins when credentials are enabled.
- Do not commit `.env` files, access tokens, or secrets.
- Restrict object-storage CORS to trusted frontend origins and only the required methods and headers.
- Make sure the production proxy supports WebSocket upgrades for `/ws`.
- Keep dependencies updated and run the project checks before deploying.

---

ZeroWaste is a portfolio project demonstrating a feature-oriented React frontend integrated with a modular Java/Spring backend and supporting infrastructure.
