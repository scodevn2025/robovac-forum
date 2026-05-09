# Architecture — RoboVac Forum

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ RSC SSR  │ │ Client   │ │ PWA      │            │
│  │ (pages)  │ │ Components│ │ (offline)│            │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘            │
└───────┼────────────┼────────────┼──────────────────┘
        │            │            │
        ▼            ▼            ▼
┌─────────────────────────────────────────────────────┐
│               Next.js 16 App Router                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Server   │ │ API      │ │ Server   │            │
│  │ Components│ │ Routes  │ │ Actions  │            │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘            │
│       │            │            │                   │
│       ▼            ▼            ▼                   │
│  ┌──────────────────────────────────┐              │
│  │        Data Access Layer          │              │
│  │  (lib/db/thread, post, user...)   │              │
│  └────────────┬─────────────────────┘              │
└───────────────┼────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│              Prisma ORM + pg Adapter                 │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│           PostgreSQL 16 (VPS: 91.99.161.14)         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Threads  │ │  Users   │ │  Posts   │            │
│  │ Categories│ │  Likes  │ │ Notif.   │            │
│  │ Messages │ │  Badges  │ │ Reports  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────┘
```

## Component Boundaries

| Component | Responsibility | Talks To |
|-----------|---------------|----------|
| RSC Pages | SSR, SEO, data fetching | Data Access Layer |
| Client Components | Interactivity (forms, reactions, chat) | API Routes, Server Actions |
| API Routes | REST endpoints, auth callbacks | Prisma |
| Server Actions | Form mutations (create/edit/delete) | Prisma |
| Data Access Layer | Query functions, caching | Prisma |
| Middleware | Auth, i18n routing | NextAuth |
| ChatBox | Real-time messaging | localStorage (v1), Pusher/SSE (v2) |
| Notification Service | Like/reply/mention notifications | Prisma, Email (Resend) |

## Data Flow

```
1. User visits / → RSC Page → getThreads() → Prisma → PostgreSQL → HTML
2. User creates thread → Server Action → Zod validation → Prisma create → revalidatePath
3. User reacts → Client Component → optimistic update → API Route → Prisma → revalidate
4. Notification triggered → API Route → Prisma create notification → (optional) Resend email
5. Chat message → Client → localStorage write → other tabs read via storage event
```

## Build Order (Dependencies)

1. Foundation (Phase 1-2): Auth, DB, basic pages
2. Content (Phase 3-5): Threads, replies, search
3. Social (Phase 6-8): Reactions, PM, notifications, gamification
4. Moderation (Phase 9): Reports, warnings, bans
5. Polish (Phase 10): PWA, dark mode, API, SEO
