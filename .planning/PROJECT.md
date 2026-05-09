# RoboVac Forum — Project Context

## What This Is

Diễn đàn robot hút bụi toàn diện nhất — cộng đồng cho tất cả thương hiệu (Roborock, Dreame, iRobot, Ecovacs, Xiaomi, Samsung, Eufy, Narwal, Shark, Yeedi, MOVA, SwitchBot). Người dùng có thể đọc reviews, thảo luận, săn deal, sửa lỗi, khoe máy.

## Core Value

**Nơi duy nhất người Việt cần đến để tìm hiểu và thảo luận về robot hút bụi** — từ chọn mua, sử dụng, sửa chữa đến săn deal.

## Current State (Brownfield)

- **Stack**: Next.js 16.2.6, Tailwind CSS 4.3.0, shadcn/ui v4, Prisma 7.8, NextAuth v5, PostgreSQL 16
- **18 routes**: Homepage, categories, thread detail, user profiles, auth, admin, search, post creation
- **~34 bài viết** tiếng Việt đã import từ Reddit research + tự viết
- **i18n**: VI (default) + EN, LanguageSwitcher trong header
- **Auth**: Email/password + Google + GitHub OAuth
- **Features built**: Carousel, thread cards, badges, pagination, filters, chatbox, mod actions (lock/sticky/digest)
- **DB**: PostgreSQL trên VPS 91.99.161.14, scram-sha-256 auth
- **Repo**: github.com/scodevn2025/robovac-forum

## Requirements

### Validated (existing)

- ✓ Thread CRUD — existing
- ✓ Category listing with filters — existing
- ✓ Auth (email + OAuth) — existing
- ✓ Admin dashboard — existing
- ✓ i18n VI/EN — existing
- ✓ ChatBox cơ bản — existing
- ✓ Mod actions (lock/sticky/digest) — existing
- ✓ Search — existing

### Active (v1 — đang build)

- [ ] **PM-01**: Private messaging giữa 2 người dùng
- [ ] **NOTIF-01**: Hệ thống notification real-time (like, reply, mention, system)
- [ ] **GAMIFY-01**: Hệ thống điểm & level (points cho post, like, reply)
- [ ] **GAMIFY-02**: Huy hiệu (badges) tự động dựa trên activity
- [ ] **SOCIAL-01**: Reactions đa dạng (like, love, haha, wow, sad, angry)
- [ ] **SOCIAL-02**: @mentions trong post/reply
- [ ] **SOCIAL-03**: Quote reply (trích dẫn post khi reply)
- [ ] **SEARCH-02**: Advanced search với filters (category, date range, author, tags)
- [ ] **UI-01**: Dark mode toggle
- [ ] **UI-02**: Mobile responsive hoàn thiện (PWA-ready)
- [ ] **FILE-01**: Upload ảnh trong post (drag-drop, paste, resize)
- [ ] **FILE-02**: Avatar upload với crop
- [ ] **MOD-01**: Report system (user báo cáo post/thread vi phạm)
- [ ] **MOD-02**: Warning/ban system với audit log
- [ ] **MOD-03**: Mod dashboard với queue reports
- [ ] **API-01**: REST API cho mobile app (documented)
- [ ] **POLL-01**: Poll creation với multiple options + expiry
- [ ] **TAG-01**: Tag system cho threads (searchable, filterable)
- [ ] **SUB-01**: Subscribe/watch thread (nhận notification khi có reply)
- [ ] **PROFILE-01**: User profile nâng cao (signature, reputation, badges)
- [ ] **PROFILE-02**: Edit profile (bio, avatar, signature, social links)
- [ ] **SEO-01**: Sitemap, structured data, meta tags hoàn thiện
- [ ] **PERF-01**: Redis cache cho hot threads, user sessions
- [ ] **EMAIL-01**: Email verification khi đăng ký
- [ ] **EMAIL-02**: Email notification cho replies, mentions

### Out of Scope (v2+)

- Mobile native app — PWA đủ tốt cho v1
- Video upload — dùng YouTube embed
- Marketplace (mua bán) — quá phức tạp cho v1
- AI chatbot assistant — v2 research

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 16 App Router | Đã chọn từ đầu, SSR + RSC | Pending |
| Prisma 7 với pg adapter | Đã chọn, direct DB access | Pending |
| Tiếng Việt làm default | Target audience là người Việt | Pending |
| Cloudflare cho production | Bảo vệ DDoS, CDN | Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions

**After each milestone:**
1. Full review of all sections
2. Core Value check
3. Audit Out of Scope

---
*Last updated: 2026-05-09 after initialization*
