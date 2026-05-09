# Pitfalls Research — Forum Platforms

## Common Mistakes & Prevention

### 1. Real-time Over-engineering
- **Warning sign**: "We need WebSockets for notifications"
- **Prevention**: Start with polling (30s interval) for notifications. Upgrade to SSE/Pusher only when needed.
- **Phase**: 6 (Notifications)

### 2. Full-text Search Performance
- **Warning sign**: PostgreSQL `LIKE '%keyword%'` on 100K+ threads
- **Prevention**: Use tsvector + GIN indexes from day one. Consider Meilisearch/Algolia at 50K+ threads.
- **Phase**: 4 (Search)

### 3. N+1 Queries in Nested Comments
- **Warning sign**: Loading replies then loading each reply's author separately
- **Prevention**: Prisma `include` to eager-load relations. Keep reply depth flat (no nesting).
- **Phase**: 3 (Thread Detail)

### 4. Auth Token Expiry UX
- **Warning sign**: Users getting logged out while writing long posts
- **Prevention**: JWT refresh tokens. Auto-save drafts to localStorage.
- **Phase**: 1 (Auth)

### 5. File Upload Abuse
- **Warning sign**: Users uploading 50MB images, filling storage
- **Prevention**: Max file size (5MB), auto-resize to 1200px width, rate limit uploads.
- **Phase**: 5 (File Upload)

### 6. Moderation Burnout
- **Warning sign**: Single admin handling all reports
- **Prevention**: RBAC with mod roles. Report queue with priority. Auto-flag suspicious content (spam patterns).
- **Phase**: 7 (Moderation)

### 7. Mobile UX Gap
- **Warning sign**: "We'll fix mobile later"
- **Prevention**: Test every component on 375px viewport. Touch targets minimum 44px. PWA for offline access.
- **Phase**: All phases (continuous)

### 8. SEO missed opportunity
- **Warning sign**: All threads return 200 with no meta tags
- **Prevention**: Dynamic `generateMetadata()` for every thread. Sitemap generation. Structured data (DiscussionForumPosting).
- **Phase**: 8 (SEO)
