# Stack Research — Modern Forum Platform

## Current Stack (Already Chosen)

| Layer | Choice | Version | Rationale |
|-------|--------|---------|-----------|
| Framework | Next.js App Router | 16.2.6 | SSR + RSC + API routes in one. SEO critical for forum. |
| CSS | Tailwind CSS | 4.3.0 | Utility-first, fast iteration. v4 brings CSS-native config. |
| UI Kit | shadcn/ui | v4 (Base UI) | Accessible, customizable, tree-shakeable. |
| ORM | Prisma | 7.8 | Type-safe, migration system. pg adapter for direct connection. |
| Auth | NextAuth.js | v5 beta | Multi-provider, JWT sessions, middleware support. |
| Database | PostgreSQL | 16 | Full-text search, JSON, reliable. |
| Icons | Lucide React | 0.378 | Consistent, MIT licensed, tree-shakeable. |
| Rich Text | TipTap | 2.4 | Based on ProseMirror, extensible, React-native. |

## New Additions Needed

| Need | Recommendation | Rationale |
|------|---------------|-----------|
| Real-time | **Pusher** or **SSE** | Pusher simpler, SSE free. For v1 use polling (30s). |
| Email | **Resend** | Modern API, React email templates, free tier (100/day). |
| Cache | **Redis (ioredis)** | VPS already has Redis. Cache hot threads, sessions. |
| File Upload | **Vercel Blob** or **S3** | Blob simpler for Vercel deploy. S3 if self-hosted. |
| Rate Limiting | **Upstash Redis** | Serverless rate limiting for API routes. |
| Monitoring | **Sentry** | Error tracking, performance monitoring. |
| Analytics | **Plausible** or **Umami** | Privacy-first, self-hostable. |

## Anti-Recommendations

- ❌ **WebSockets (Socket.io)**: Overkill for forum. Polling/SSE sufficient.
- ❌ **GraphQL**: REST simpler for forum CRUD. No complex nested queries needed.
- ❌ **NoSQL (MongoDB)**: PostgreSQL better for relational data (users, threads, posts, likes).
- ❌ **tRPC**: Next.js Server Actions + API routes already handle this pattern.
