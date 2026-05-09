# Requirements — RoboVac Forum v1

## v1 Requirements

### Authentication & User Management
- [x] **AUTH-01**: User can register with email/password ✓
- [x] **AUTH-02**: User can login with email/password ✓
- [x] **AUTH-03**: User can login with Google/GitHub OAuth ✓
- [x] **AUTH-04**: User stays logged in across sessions (JWT) ✓
- [ ] **AUTH-05**: User receives email verification after registration
- [ ] **AUTH-06**: User can reset password via email link

### Content Management
- [x] **CONT-01**: User can create threads with title, content, category ✓
- [x] **CONT-02**: User can reply to threads ✓
- [ ] **CONT-03**: User can edit their own threads/posts
- [ ] **CONT-04**: User can upload images in posts (drag-drop, paste)
- [ ] **CONT-05**: User can create polls (multiple options, expiry)
- [ ] **CONT-06**: User can add tags to threads
- [ ] **CONT-07**: User can quote another post when replying

### Content Discovery
- [x] **DISC-01**: Browse threads by category with filters ✓
- [x] **DISC-02**: Sort by newest, hottest, most viewed ✓
- [x] **DISC-03**: Full-text search across threads, posts, users ✓
- [ ] **DISC-04**: Advanced search filters (date range, category, author, tags)
- [ ] **DISC-05**: Thread recommendations based on user activity

### Social & Engagement
- [x] **SOC-01**: User can like threads and posts ✓
- [x] **SOC-02**: User can favorite/bookmark threads ✓
- [x] **SOC-03**: User can share thread URL ✓
- [ ] **SOC-04**: User can react with 6 emoji types (like, love, haha, wow, sad, angry)
- [ ] **SOC-05**: User can @mention other users in posts
- [ ] **SOC-06**: User earns points for activity (post, reply, like received)
- [ ] **SOC-07**: User earns badges automatically (First Post, 100 Posts, Popular, etc.)
- [ ] **SOC-08**: User can subscribe to threads for reply notifications
- [x] **SOC-09**: Live chat box for all online users ✓

### User Profiles
- [x] **PROF-01**: View user profile with stats ✓
- [ ] **PROF-02**: Edit profile (bio, avatar, signature)
- [ ] **PROF-03**: Upload avatar with crop tool
- [ ] **PROF-04**: Display user badges and reputation points
- [ ] **PROF-05**: User activity history (recent threads, posts)

### Notifications
- [ ] **NOTIF-01**: In-app notification bell with unread count
- [ ] **NOTIF-02**: Get notification when someone replies to your thread
- [ ] **NOTIF-03**: Get notification when someone @mentions you
- [ ] **NOTIF-04**: Get notification when someone likes your post
- [ ] **NOTIF-05**: Mark notifications as read
- [ ] **NOTIF-06**: Email notification digest (daily/weekly)

### Private Messaging
- [ ] **PM-01**: User can send private message to another user
- [ ] **PM-02**: Threaded PM conversation view
- [ ] **PM-03**: PM inbox with read/unread status
- [ ] **PM-04**: PM notification in header

### Moderation & Admin
- [x] **MOD-01**: Admin/Mod can lock/unlock threads ✓
- [x] **MOD-02**: Admin/Mod can sticky/digest threads ✓
- [x] **MOD-03**: Admin dashboard with stats ✓
- [ ] **MOD-04**: User can report inappropriate content
- [ ] **MOD-05**: Mod queue for reviewing reports
- [ ] **MOD-06**: Admin/Mod can warn/ban users
- [ ] **MOD-07**: Audit log of moderation actions
- [ ] **MOD-08**: Admin can manage categories, banners, users

### UI/UX
- [x] **UI-01**: Responsive design for mobile/tablet ✓
- [x] **UI-02**: Vietnamese (default) + English language support ✓
- [ ] **UI-03**: Dark mode toggle
- [ ] **UI-04**: PWA support (offline access, install prompt)
- [ ] **UI-05**: Toast notifications for actions (post created, liked, etc.)

### Performance & SEO
- [ ] **PERF-01**: Page load < 2s on 3G (Lighthouse score > 80)
- [ ] **PERF-02**: Image optimization (next/image, lazy loading)
- [ ] **SEO-01**: Dynamic meta tags for every thread
- [ ] **SEO-02**: Sitemap.xml auto-generation
- [ ] **SEO-03**: Structured data (DiscussionForumPosting schema)

### API
- [ ] **API-01**: REST API for reading threads, posts, users
- [ ] **API-02**: API authentication (API keys or Bearer tokens)
- [ ] **API-03**: API documentation (OpenAPI/Swagger)

## v2 Requirements (Deferred)

- Mobile native app (React Native or Flutter)
- AI-powered content moderation
- Video embed support
- Marketplace/classifieds
- Paid subscriptions/premium features
- Advanced analytics dashboard
- Multi-forum instances (like subreddits)

## Out of Scope

- Video hosting — use YouTube/Vimeo embed
- Live chat support — use external service
- Payment processing — no paid features in v1
- SSO for enterprise — not target market

## Traceability

| REQ-ID | Phase | Status |
|--------|-------|--------|
| AUTH-01 → AUTH-04 | Phase 1 | ✓ Done |
| CONT-01 → CONT-02 | Phase 2 | ✓ Done |
| DISC-01 → DISC-03 | Phase 3 | ✓ Done |
| SOC-01 → SOC-03 | Phase 4 | ✓ Done |
| MOD-01 → MOD-03 | Phase 4 | ✓ Done |
| SOC-09 | Phase 4 | ✓ Done |
| UI-01 → UI-02 | Phase 4 | ✓ Done |
| AUTH-05 → AUTH-06 | Phase 5 | Todo |
| CONT-03 → CONT-07 | Phase 5-6 | Todo |
| PROF-02 → PROF-05 | Phase 6 | Todo |
| SOC-04 → SOC-08 | Phase 7 | Todo |
| NOTIF-01 → NOTIF-06 | Phase 8 | Todo |
| PM-01 → PM-04 | Phase 9 | Todo |
| MOD-04 → MOD-08 | Phase 10 | Todo |
| UI-03 → UI-05 | Phase 11 | Todo |
| PERF-01 → SEO-03 | Phase 11 | Todo |
| API-01 → API-03 | Phase 12 | Todo |

---
*Last updated: 2026-05-09*
