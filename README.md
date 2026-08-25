# Zero Waste Frontend

React-based SPA for the Zero Waste community platform — peer-to-peer item sharing, trading, and eco-awareness.

## Summary

The frontend provides a full UI for the Zero Waste platform: authentication, item marketplace with category browsing, profile management, reviews and ratings, blog writing (Eco Hub), real-time WebSocket notifications, trade offers, and an admin dashboard for managing users and categories.

## Tech Stack

| Technology            | Purpose                                      |
| --------------------- | -------------------------------------------- |
| React 19              | UI framework                                 |
| TanStack Start / Vite | Build tool + SSR                             |
| TanStack Router       | File-based routing                           |
| TanStack Query        | Server state / caching                       |
| TanStack Form + Zod   | Form handling + validation                   |
| TanStack Table        | Data tables                                  |
| Tailwind CSS 4        | Styling                                      |
| shadcn/ui + Radix UI  | Component primitives                         |
| Biome                 | Linting + formatting                         |
| Zustand               | Client state management                      |
| SockJS + STOMP        | WebSocket client for real-time notifications |
| Axios                 | HTTP client                                  |
| Lucide React          | Icons                                        |
| Sonner                | Toast notifications                          |

## Prerequisites

- Node.js 20+
- pnpm 10+

## Installation

```bash
cd zero-waste-frontend
pnpm install
```

## Configuration

| Variable       | Default | Description          |
| -------------- | ------- | -------------------- |
| `VITE_API_URL` | `/api`  | Backend API base URL |

The dev server proxies `/api` and `/ws` to `http://localhost:8080` (see `vite.config.ts`).

## Running

### Development

```bash
pnpm dev
```

Frontend runs on **http://localhost:3000**.

### Build

```bash
pnpm build
```

Outputs static files to `dist/` for Nginx deployment.

### Preview

```bash
pnpm preview
```

## Scripts

| Script    | Command                |
| --------- | ---------------------- |
| `dev`     | `vite dev --port 3000` |
| `build`   | `vite build`           |
| `preview` | `vite preview`         |
| `test`    | `vitest run`           |
| `lint`    | `biome lint`           |
| `format`  | `biome format`         |
| `check`   | `biome check`          |

## Docker

```bash
docker build -t zero-waste-frontend .
docker run -p 80:80 zero-waste-frontend
```

Multi-stage build: Node builder → Nginx static server. Nginx proxies `/api` and `/ws` to `backend:8080`.

## Project Structure

```
src/
├── features/
│   ├── auth/            # Login, register, auth context
│   ├── blog/            # Blog listing, detail views
│   ├── category/        # Category tree, browsing
│   ├── item/            # Item cards, detail, forms
│   ├── notification/    # Notification list, unread badge
│   ├── offer/           # Trade offer creation, management
│   ├── profile/         # Profile views, edit form
│   ├── review/          # Review forms, rating breakdown
│   ├── shared/          # Shared components, utils
│   ├── users/           # User management UI
│   └── webSocket/       # SockJS/STOMP connection setup
├── lib/
│   ├── axios.ts         # Axios instance with auth interceptors
│   └── utils.ts         # Shared utilities
├── routes/
│   ├── __root.tsx       # Root layout shell
│   ├── _unauthenticated/ # login, register
│   ├── _authenticated/   # Protected routes
│   │   ├── about.tsx
│   │   ├── admin.tsx     # Admin dashboard
│   │   ├── marketplace.tsx
│   │   ├── offers.tsx
│   │   ├── profile.tsx
│   │   ├── notifications.tsx
│   │   ├── reviews.tsx
│   │   └── admin/        # User + category management
│   ├── _writer/          # Writer mode
│   │   └── eco-hub/     # Blog creation
│   ├── eco-hub/          # Public blog
│   ├── marketplace/      # Item listing + detail
│   ├── profile/$userId/  # Public user profile
│   ├── index.tsx         # Home page
│   └── unauthorized.tsx
├── types/               # TypeScript type definitions
├── main.tsx             # App entry point
└── styles.css           # Global styles
```

## Key Features

- **Authentication** — JWT login/register with refresh token flow
- **Marketplace** — Browse items by category, item detail pages, create/edit listings
- **Trade Offers** — Create and manage item swap offers between users
- **Profiles** — Own profile with item summary + review stats; public user profiles
- **Reviews & Ratings** — Write reviews, view rating breakdowns
- **Eco Hub** — Blog posts for community education
<!-- and eco-quizzes for community education -->
- **Admin Dashboard** — Manage users (ban/unban) and categories
- **Real-time Notifications** — WebSocket (STOMP via SockJS) for live alerts
- **Responsive UI** — shadcn/ui components with Tailwind CSS
