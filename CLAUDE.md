# CLAUDE.md - Core Project Governance

## 1. Immutable Rules & Hard Constraints

- **File Limit:** Maximum **200 lines** per file. If exceeded, refactor modularly into subcomponents or utilities.
- **Function Limit:** Maximum **30 lines** per function/method.
- **Formatting:** Strict 2-space indentation. No tab characters.
- **No Emojis:** Strictly forbid emojis in source code, variable names, comments, production logs, or error messages.
- **Do Not Reinvent the Wheel:** Always reuse established, maintained, and standard packages or native utilities instead of writing custom logic for solved problems.
- **No Verbose Comments:** Code must be self-documenting through expressive naming and strict types. Use brief TSDoc/JSDoc only to explain non-obvious business logic decisions, never the *what* or *how*.
- **Strict Typing:** TypeScript in `strict: true` mode. Usage of `any` or unsafe type assertions (`as unknown as T`) is prohibited.

---

## 2. Automated Tech Stack Selection Matrix

Classify the project scale before proposing or introducing new dependencies:

| Scale | Frontend / Client | Backend / API | Database | Auth & Infra |
| :--- | :--- | :--- | :--- | :--- |
| **Small (Prototype / MVP)** | Next.js (App Router) / Vite + React | Server Actions / API Routes | Supabase (PostgreSQL) / SQLite | Supabase Auth / Clerk / NextAuth |
| **Medium (Growth / B2B)** | Next.js / Remix + Tailwind CSS | NestJS / Fastify / Node.js (Clean Arch) | PostgreSQL + Prisma / Drizzle + Redis | Auth0 / Supabase Auth / Custom JWT HttpOnly |
| **Large (Enterprise)** | Monorepo (Turborepo) + Micro-frontends | Microservices / Go / NestJS / gRPC | PostgreSQL (Sharded) + Redis Cluster | Keycloak / OAuth2 + OIDC / AWS Cognito |

---

## 3. Verification & Quality Assurance Commands

Run these checks before marking any task as complete:

- **Install:** `npm install` / `pnpm install` / `bun install`
- **Type Check:** `npm run typecheck` or `tsc --noEmit`
- **Lint & Format:** `npm run lint` && `npm run format`
- **Unit & Integration Tests:** `npm test`
- **Build Verification:** `npm run build`

---

## 4. Modular Rules Index

Load specialized instructions from `.claude/rules/` when working on specific domain tasks:

- **Security & Auth:** `.claude/rules/security-and-auth.md`
- **Architecture & DB:** `.claude/rules/architecture-and-db.md`
- **Frontend & UI/UX:** `.claude/rules/frontend-and-ui.md`