# RoboVac Forum

**The ultimate community for robot vacuum enthusiasts — all brands, all models.**

A modern, full-featured forum built with Next.js 16, Tailwind CSS 4, Prisma 7, and NextAuth.js v5.

## Features

- **Thread System** — Create, browse, and reply to threads with rich text content
- **Categories** — Organized by topic (Reviews, Discussion, Troubleshooting, Deals, Guides, Showcase, News)
- **Brand Forums** — Dedicated sub-forums for Roborock, Dreame, iRobot, Ecovacs
- **Carousel Banners** — Promotional image carousel with auto-play
- **Thread Cards** — Badges (Sticky/Digest/Heat), geo flags, prefixes, interaction bar
- **Filtering & Sorting** — Model filters, time filters, topic type filters, sort options
- **Authentication** — Email/password + OAuth (Google, GitHub)
- **Admin Panel** — Dashboard, CRUD categories/threads/users/banners
- **i18n** — 4 languages (English, Deutsch, Français, Italiano)
- **Responsive** — Mobile-friendly design
- **Search** — Full-text search across threads, posts, and users

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router) |
| CSS | Tailwind CSS 4.3.0 |
| UI Components | shadcn/ui v4 (Base UI) |
| Database | PostgreSQL + Prisma 7.8 |
| Auth | NextAuth.js v5 beta |
| Icons | Lucide React |
| Validation | Zod + react-hook-form |
| Dates | date-fns |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+

### Installation

```bash
git clone https://github.com/scodevn2025/robovac-forum.git
cd robovac-forum
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/robovac_forum"
AUTH_SECRET="your-secret-key"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
```

### Database Setup

```bash
npx prisma db push
npx prisma generate
npx tsx prisma/seed.ts
```

### Development

```bash
npm run dev
# → http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── admin/              # Admin panel
│   ├── api/auth/           # NextAuth API routes
│   ├── auth/               # Login/Register pages
│   ├── f/[slug]/           # Category listing
│   ├── post/new/           # New thread
│   ├── search/             # Search page
│   ├── t/[tid]/            # Thread detail
│   └── u/[uid]/            # User profile
├── components/
│   ├── auth/               # Login/Register/OAuth/AuthGuard
│   ├── category/           # FilterBar, ModelFilter, SubCategoryCard
│   ├── editor/             # PostEditor
│   ├── home/               # Carousel, ThreadCard, Pagination, Sidebar
│   ├── layout/             # Header, Footer, Breadcrumb
│   ├── search/             # SearchBar
│   ├── shared/             # NotificationBell
│   ├── thread/             # ThreadContent, PostCard, ReplyForm, InteractionBar
│   ├── ui/                 # shadcn/ui components
│   └── user/               # ProfileCard
├── lib/
│   ├── db/                 # Data access layer (thread, post, user, category, banner)
│   ├── i18n/               # i18n config + dictionaries (en/de/fr/it)
│   ├── auth.ts             # NextAuth configuration
│   ├── constants.ts        # App constants
│   ├── helpers.ts          # Date formatting, heat score
│   ├── prisma.ts           # Prisma client singleton
│   ├── utils.ts            # cn() utility
│   └── validations.ts      # Zod schemas
├── middleware.ts            # Auth middleware
└── types/                   # TypeScript types
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with carousel, thread feed, sidebar |
| `/f/[slug]` | Category listing with filters |
| `/t/[tid]` | Thread detail with replies |
| `/u/[uid]` | User profile |
| `/post/new` | Create new thread (auth required) |
| `/search` | Full-text search |
| `/auth/login` | Login page |
| `/auth/register` | Register page |
| `/admin` | Admin dashboard (admin only) |

## Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@robovac-forum.com | admin123 |
| User | demo@robovac-forum.com | password123 |

## License

MIT

---

Built by [scodevn2025](https://github.com/scodevn2025)
