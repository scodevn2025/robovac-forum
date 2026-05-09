# RoboVac Forum

**Cộng đồng robot hút bụi lớn nhất — tất cả thương hiệu, mọi dòng máy.**

Modern, full-featured forum: Next.js 16, Tailwind CSS 4, Prisma 7, NextAuth v5, PostgreSQL 16.

## Features

| Category | Features |
|----------|----------|
| Auth | Email/password + Google/GitHub OAuth, JWT sessions, email verification |
| Content | Threads, replies, rich text editor, image upload (drag-drop, paste), polls, tags |
| Discovery | Categories, filters (model, time, type), full-text search, sitemap |
| Social | 6 emoji reactions, @mentions, watch/subscribe, quote reply, live chat |
| Gamification | 8 badges, 10 reputation levels, points system |
| Notifications | In-app bell, mark read, 30s polling |
| Messages | Private messaging inbox |
| Moderation | Lock/sticky/digest, report system (6 reasons), RBAC |
| Profiles | Avatar upload, bio, signature, badge showcase, reputation bar |
| UI/UX | Dark mode, PWA, mobile responsive, toast notifications, Vietnamese (default) + English |
| API | REST API v1 with pagination and filtering |
| SEO | Sitemap, dynamic meta tags, robots.txt, structured data |

## Quick Start

### Prerequisites
- Node.js 22+
- PostgreSQL 16+ (or use Docker)

### Development

```bash
git clone https://github.com/scodevn2025/robovac-forum.git
cd robovac-forum
cp .env.example .env     # Edit with your config
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts   # Seed demo data
npm run dev              # → http://localhost:3000
```

### Docker (Production)

```bash
# Clone and configure
cp .env.example .env     # Set DB_PASSWORD, AUTH_SECRET
nano .env

# Start all services
docker compose up -d

# Run database migrations
docker compose exec app npx prisma db push

# Seed data (optional)
docker compose exec app npx tsx prisma/seed.ts

# Check status
docker compose ps
curl http://localhost:3000
```

### Deploy with Nginx

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/robovac-forum
sudo ln -s /etc/nginx/sites-available/robovac-forum /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL certificate
sudo certbot --nginx -d forum.scode.works
```

## Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── admin/               # Admin panel (dashboard, categories, threads, users, banners)
│   ├── api/                 # REST API (auth, threads, posts, upload, notifications, reports)
│   ├── auth/                # Login & Register pages
│   ├── f/[slug]/            # Category listing with filters
│   ├── messages/            # Private messaging
│   ├── post/new/            # Thread creation
│   ├── search/              # Full-text search
│   ├── t/[tid]/             # Thread detail + replies
│   └── u/[uid]/             # User profile
├── components/
│   ├── auth/                # AuthGuard, LoginGate, LoginForm, RegisterForm, OAuthButtons
│   ├── category/            # FilterBar, ModelFilter, SubCategoryCard
│   ├── editor/              # PostEditor, ImageUploader
│   ├── home/                # HeroSlider, TabFilter, ThreadCard, ThreadList, VideoSection, Pagination
│   ├── layout/              # Header, Footer, Breadcrumb
│   ├── search/              # SearchBar
│   ├── shared/              # ChatBox, ThemeToggle, LanguageSwitcher, Toast, ReportModal, MentionInput
│   ├── thread/              # ThreadContent, PostCard, ReplyForm, InteractionBar, ReactionPicker, ModActions
│   ├── user/                # ProfileCard, ProfileEditor
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── db/                  # Data access (thread, post, user, category, banner)
│   ├── i18n/                # i18n config, dictionaries (vi/en/de/fr/it), locale detection
│   ├── auth.ts              # NextAuth config
│   ├── badges.ts            # Badge definitions & reputation system
│   ├── constants.ts         # App constants
│   ├── helpers.ts           # Date formatting, heat score
│   ├── prisma.ts            # Prisma client
│   └── validations.ts       # Zod schemas
├── middleware.ts             # Auth middleware
└── types/                    # TypeScript types
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `AUTH_SECRET` | NextAuth secret key | Required |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | Optional |
| `AUTH_GOOGLE_SECRET` | Google OAuth secret | Optional |
| `AUTH_GITHUB_ID` | GitHub OAuth client ID | Optional |
| `AUTH_GITHUB_SECRET` | GitHub OAuth secret | Optional |
| `NEXT_PUBLIC_APP_URL` | Public URL | `http://localhost:3000` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npx prisma db push` | Push schema to database |
| `npx prisma studio` | Open Prisma Studio GUI |
| `npx tsx prisma/seed.ts` | Seed demo data |
| `npx tsx prisma/import-articles.ts` | Import batch 1 articles |
| `npx tsx prisma/import-articles-2.ts` | Import batch 2 articles |
| `npx tsx prisma/import-articles-vn.ts` | Import VN articles |
| `docker compose up -d` | Start Docker stack |

## API v1

```
GET /api/v1/threads?page=1&limit=20&category=reviews
```

Response:
```json
{
  "data": [
    {
      "id": "...",
      "title": "...",
      "excerpt": "...",
      "createdAt": "...",
      "viewCount": 0,
      "likeCount": 0,
      "replyCount": 0,
      "author": { "id": "...", "username": "..." },
      "category": { "id": "...", "name": "...", "slug": "..." }
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 }
}
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| CSS | Tailwind CSS 4.3.0 |
| UI | shadcn/ui v4 (Base UI) |
| Database | PostgreSQL 16 + Prisma 7.8 + pg Adapter |
| Auth | NextAuth.js v5 beta |
| Icons | Lucide React |
| Validation | Zod + react-hook-form |
| Dates | date-fns |
| Deployment | Docker + Nginx |

## Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@robovac-forum.com | admin123 |
| User | demo@robovac-forum.com | password123 |

## License

MIT — Built by [scodevn2025](https://github.com/scodevn2025)
