# Features Research — Modern Forum Platform

## Table Stakes (Must Have — Users Expect These)

| Feature | Complexity | Dependencies | Notes |
|---------|-----------|--------------|-------|
| Thread CRUD | Medium | Auth, Categories | Đã có |
| Reply/Quote | Medium | Thread, Auth | Đã có reply, cần thêm quote |
| Categories + Filters | Medium | Thread | Đã có |
| Search | High (full-text) | PostgreSQL tsvector | Đã có cơ bản |
| Auth (Email + OAuth) | Medium | NextAuth | Đã có |
| User Profiles | Medium | Auth | Đã có cơ bản |
| Like/Favorite | Low | Thread, User | Đã có |
| Pagination | Low | Thread | Đã có |
| Moderation Tools | High | Auth (RBAC) | Đã có cơ bản |
| Mobile Responsive | Medium | CSS | Cần hoàn thiện |
| i18n | High | All UI | Đã có VI/EN |

## Differentiators (Competitive Advantage)

| Feature | Complexity | Impact | Notes |
|---------|-----------|--------|-------|
| Gamification (points/badges) | Medium | High — tăng engagement | Cần design system badges |
| Reactions (6 emoji types) | Low | Medium — vui hơn | Thay thế like đơn giản |
| Private Messaging | High | High — giữ chân users | Cần real-time |
| @mentions | Medium | Medium — tăng tương tác | Cần autocomplete |
| Notification System | Medium | High | Email + in-app |
| Dark Mode | Low | Medium — UX | Tailwind dark: class |
| PWA Support | Medium | Medium — mobile app-like | Next.js PWA plugin |
| Tag System | Low | Medium — discoverability | Cần search integration |
| Polls | Medium | Medium — engagement | Đã có schema |
| Watch/Subscribe | Medium | Medium — retention | Cần notification integration |
| REST API | High | High — mở rộng ecosystem | Documented, versioned |

## Anti-Features (Deliberately NOT Building)

| Feature | Why NOT |
|---------|---------|
| AI Chatbot | Quá phức tạp, chi phí cao. v2 research. |
| Marketplace | Legal + moderation burden. Không phải core. |
| Video Hosting | Dùng YouTube embed. Tự host video quá tốn băng thông. |
| Live Streaming | Không phải use case của forum. |
| Paid Subscriptions | v2 nếu có nhu cầu. |

## Feature Dependencies Map

```
Auth → User Profiles → PM System
Auth → Threads → Replies/Quotes → Mentions → Notifications
Auth → Threads → Like/Reactions → Gamification
Threads → Tags → Advanced Search
Threads → Polls
Threads → Watch/Subscribe → Notifications → Email
Auth → Moderation → Report System → Warning/Ban
UI → Dark Mode
UI → PWA
API → All Features (read-only v1)
```
