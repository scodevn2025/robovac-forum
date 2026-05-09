# Roadmap — RoboVac Forum

## Milestone 1: Foundation → Full Featured Forum

**12 phases | 50+ requirements | Đã có 4 phases done**

### Phase Structure

| # | Phase | Goal | Requirements | Status |
|---|-------|------|-------------|--------|
| 1 | Auth Foundation | User can register, login, stay logged in | AUTH-01→04 | ✅ Done |
| 2 | Content Core | Threads, replies, categories, filters | CONT-01→02, DISC-01→03 | ✅ Done |
| 3 | Engagement | Likes, favorites, share, chat | SOC-01→03,09, MOD-01→03 | ✅ Done |
| 4 | Home & Discovery | Carousel, sidebar, search, i18n | UI-01→02, SEARCH-01 | ✅ Done |
| 5 | Content Enhancement | Edit, upload images, polls, tags, quote | CONT-03→07 | 🔨 Todo |
| 6 | Rich Profiles | Avatar upload, bio, signature, badges display | PROF-02→05, AUTH-05→06 | 🔨 Todo |
| 7 | Social Reactions | 6 emoji reactions, @mentions, gamification | SOC-04→08 | 🔨 Todo |
| 8 | Notifications | In-app bell, email digest, real-time | NOTIF-01→06 | 🔨 Todo |
| 9 | Private Messaging | PM inbox, threaded convos, notifications | PM-01→04 | 🔨 Todo |
| 10 | Moderation System | Reports, warnings, bans, audit log | MOD-04→08 | 🔨 Todo |
| 11 | Polish & SEO | Dark mode, PWA, sitemap, performance | UI-03→05, PERF-01, SEO-01→03 | 🔨 Todo |
| 12 | Public API | REST API, docs, auth | API-01→03 | 🔨 Todo |

---

## Phase 5: Content Enhancement

**Goal**: Người dùng có thể chỉnh sửa bài viết, upload ảnh, tạo poll, gắn tag, quote reply.

**Requirements**: CONT-03, CONT-04, CONT-05, CONT-06, CONT-07

**Success Criteria**:
1. User can edit their thread title and content within 5 minutes of posting
2. User can drag-drop or paste images into post editor (max 5MB, auto-resize)
3. User can create poll with 2-10 options and set expiry date
4. User can add up to 5 tags when creating thread
5. User can click "Quote" on any reply to insert quoted content

**UI hint**: yes — Rich text editor, image drop zone, poll builder, tag input

---

## Phase 6: Rich Profiles

**Goal**: Hồ sơ người dùng đầy đủ với avatar, bio, signature, badges, email verify.

**Requirements**: PROF-02, PROF-03, PROF-04, PROF-05, AUTH-05, AUTH-06

**Success Criteria**:
1. User can upload and crop avatar (max 2MB)
2. User can edit bio (max 500 chars) and signature (max 250 chars)
3. Profile page shows all badges earned with tooltip descriptions
4. Profile page shows reputation points breakdown
5. New user receives email verification link
6. User can request password reset via email

**UI hint**: yes — Avatar crop tool, profile edit form, badge showcase

---

## Phase 7: Social Reactions

**Goal**: Tăng engagement với 6 loại reaction, @mentions, hệ thống điểm và badge tự động.

**Requirements**: SOC-04, SOC-05, SOC-06, SOC-07, SOC-08

**Success Criteria**:
1. User can long-press like button to choose from 6 reactions
2. Typing @ triggers username autocomplete dropdown
3. User earns +2 points per post, +1 per reply, +1 per like received
4. Auto-badges: First Post (1), Contributor (50), Expert (200), Popular (100 likes)
5. User can subscribe to thread and receive notification on new replies

**UI hint**: yes — Reaction picker, mention autocomplete, badge notification

---

## Phase 8: Notifications

**Goal**: Hệ thống notification đầy đủ — in-app bell + email digest.

**Requirements**: NOTIF-01, NOTIF-02, NOTIF-03, NOTIF-04, NOTIF-05, NOTIF-06

**Success Criteria**:
1. Header shows notification bell with unread count badge
2. Notification dropdown shows recent 10 notifications
3. User can mark single or all notifications as read
4. Clicking notification navigates to relevant thread/post
5. Email digest sent daily (if user opted in) with top 5 notifications

**UI hint**: yes — Notification bell, dropdown, email template

---

## Phase 9: Private Messaging

**Goal**: Người dùng có thể nhắn tin riêng tư với nhau.

**Requirements**: PM-01, PM-02, PM-03, PM-04

**Success Criteria**:
1. User can click "Message" on any user profile to start conversation
2. PM shows threaded conversation view (like Messenger/WhatsApp)
3. Inbox shows all conversations sorted by last message
4. Unread PM count shown in header
5. User can't message users who blocked them

**UI hint**: yes — PM inbox, conversation view, message composer

---

## Phase 10: Moderation System

**Goal**: Hệ thống báo cáo và xử lý vi phạm chuyên nghiệp.

**Requirements**: MOD-04, MOD-05, MOD-06, MOD-07, MOD-08

**Success Criteria**:
1. User can report any post/thread with reason selection
2. Mod dashboard shows report queue sorted by priority
3. Mod can dismiss report or take action (delete post, warn user, ban user)
4. Temp ban (1-30 days) and permanent ban supported
5. All mod actions logged to audit trail

**UI hint**: yes — Report modal, mod queue, ban form

---

## Phase 11: Polish & SEO

**Goal**: Dark mode, PWA, sitemap, structured data, performance optimization.

**Requirements**: UI-03, UI-04, UI-05, PERF-01, SEO-01, SEO-02, SEO-03

**Success Criteria**:
1. Dark mode toggle in header, preference saved to localStorage
2. PWA manifest + service worker for offline access
3. Lighthouse Performance > 80, Accessibility > 90, SEO = 100
4. Sitemap.xml auto-generated with all public threads
5. Structured data (DiscussionForumPosting) on every thread page

**UI hint**: yes — Dark mode, PWA install prompt, toast notifications

---

## Phase 12: Public API

**Goal**: REST API cho bên thứ 3 tích hợp, có documentation.

**Requirements**: API-01, API-02, API-03

**Success Criteria**:
1. GET endpoints for threads, posts, users, categories
2. API key authentication
3. Rate limiting (100 req/min per key)
4. OpenAPI/Swagger documentation tại /api/docs
5. API versioning (v1 prefix)

**UI hint**: no — Backend only

---

## Coverage Summary

| Metric | Count |
|--------|-------|
| Total v1 Requirements | 50 |
| Already Done (Phases 1-4) | 18 |
| Remaining (Phases 5-12) | 32 |
| Coverage | 100% mapped |

---
*Roadmap created: 2026-05-09*
*Last updated: 2026-05-09*
