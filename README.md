# Issue Tracker

A full-stack issue tracking application built with Next.js. Create, assign, and manage issues across your team with a dashboard overview, filtering, and status management.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Better Auth](https://www.better-auth.com/) (Google OAuth)
- **UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Forms:** React Hook Form + Zod validation
- **Data Fetching:** React Query (TanStack Query)
- **Error Monitoring:** [Sentry](https://sentry.io/)

## Prerequisites

- Node.js 18+
- PostgreSQL (running and accessible)

## Getting Started

1. **Clone and install dependencies:**

   ```bash
   git clone <repo-url>
   cd issue-tracker
   npm install
   ```

2. **Set up environment variables:**

   Copy the example file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |----------|-------------|
   | `DATABASE_URL` | PostgreSQL connection string |
   | `BETTER_AUTH_SECRET` | Secret key for session signing (generate a random string) |
   | `BETTER_AUTH_URL` | App URL (`http://localhost:3000` for local dev) |
   | `GOOGLE_CLIENT_ID` | Google OAuth client ID |
   | `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
   | `OPTIMIZE_API_KEY` | *(optional)* Prisma Optimize API key |

3. **Run database migrations:**

   ```bash
   npx prisma migrate deploy
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
issue-tracker/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, providers, nav)
│   ├── page.tsx                # Dashboard (home page)
│   ├── _components/            # App-level components (NavBar, charts)
│   ├── _providers/             # Client-side providers (React Query)
│   ├── components/             # Shared UI components (badges, pagination)
│   ├── api/                    # API route handlers
│   │   ├── auth/[...all]/      # Authentication endpoints
│   │   ├── issues/             # Issue CRUD endpoints
│   │   └── users/              # User endpoints
│   └── issues/                 # Issue pages
│       ├── list/               # Issue list with filtering and sorting
│       ├── new/                # Create new issue form
│       └── [id]/               # Issue detail, edit, and delete
├── components/ui/              # shadcn/ui primitives (button, card, etc.)
├── lib/                        # Shared utilities
│   ├── auth.ts                 # Better Auth server config
│   ├── auth-client.ts          # Better Auth client config
│   ├── validations.ts          # Zod schemas for issues
│   └── utils.ts                # Helper functions (cn, etc.)
├── prisma/                     # Database layer
│   ├── schema.prisma           # Data model
│   ├── client.ts               # Prisma client singleton
│   └── migrations/             # SQL migrations
└── public/                     # Static assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
