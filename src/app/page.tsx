import { Suspense } from "react";
import Link from "next/link";
import { CarouselBanner } from "@/components/home/CarouselBanner";
import { TabFilter } from "@/components/home/TabFilter";
import { ThreadList } from "@/components/home/ThreadList";
import { HotPostsSidebar } from "@/components/home/HotPostsSidebar";
import { Pagination } from "@/components/home/Pagination";
import { getThreads, getHotThreads, type ThreadFilters } from "@/lib/db/thread";
import { getActiveBanners } from "@/lib/db/banner";
import { SITE_NAME, SITE_DESCRIPTION, BRANDS, THREADS_PER_PAGE } from "@/lib/constants";
import type { ThreadWithRelations } from "@/types";
import type { Banner } from "@/generated/prisma/client";

interface HomePageProps {
  searchParams: Promise<{ tab?: string; page?: string }>;
}

// Placeholder threads for when DB is not yet set up
const PLACEHOLDER_THREADS: ThreadWithRelations[] = [
  {
    id: "demo-1",
    title: "Roborock S8 MaxV Ultra vs Dreame X40 Ultra — Which is the King?",
    content: "",
    excerpt: "After testing both flagships for 2 weeks each, here's my detailed comparison.",
    categoryId: "",
    authorId: "",
    prefix: "Comparison",
    isSticky: true,
    isDigest: true,
    heatScore: 98,
    viewCount: 3200,
    likeCount: 87,
    favCount: 34,
    replyCount: 56,
    geoFlag: "DE",
    featureImage: null,
    status: "ACTIVE",
    isPoll: false,
    isReward: false,
    modelTypeId: null,
    lastPostAt: new Date(),
    lastPostById: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: { id: "u1", username: "roboter_de", image: null, avatarUrl: null, geoFlag: "DE" },
    category: { id: "c1", name: "Reviews", slug: "reviews" },
  },
  {
    id: "demo-2",
    title: "Best Robot Vacuum Deals — Amazon Spring Sale 2026 Megathread",
    content: "",
    excerpt: "Amazon Spring Sale is live! Post the best robot vacuum deals you find here.",
    categoryId: "",
    authorId: "",
    prefix: "Deal Alert",
    isSticky: true,
    isDigest: false,
    heatScore: 91,
    viewCount: 4800,
    likeCount: 65,
    favCount: 42,
    replyCount: 89,
    geoFlag: "GLOBAL",
    featureImage: null,
    status: "ACTIVE",
    isPoll: false,
    isReward: false,
    modelTypeId: null,
    lastPostAt: new Date(Date.now() - 900000),
    lastPostById: null,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
    author: { id: "u2", username: "vac_fan", image: null, avatarUrl: null, geoFlag: "GB" },
    category: { id: "c4", name: "Deals", slug: "deals" },
  },
];

const PLACEHOLDER_BANNERS = [
  { id: "b1", title: "Roborock vs Dreame Comparison", imageUrl: "/banners/comparison-banner.jpg", linkUrl: "/t/demo-1", sortOrder: 0, isActive: true, categoryId: null, threadId: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "b2", title: "Amazon Spring Sale Deals", imageUrl: "/banners/deals-banner.jpg", linkUrl: "/t/demo-2", sortOrder: 1, isActive: true, categoryId: null, threadId: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "b3", title: "Beginner's Guide", imageUrl: "/banners/guide-banner.jpg", linkUrl: "/f/guides", sortOrder: 2, isActive: true, categoryId: null, threadId: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "b4", title: "Join the Community", imageUrl: "/banners/community-banner.jpg", linkUrl: "/f/discussion", sortOrder: 3, isActive: true, categoryId: null, threadId: null, createdAt: new Date(), updatedAt: new Date() },
];

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const tab = params.tab ?? "featured";
  const page = Number(params.page) || 1;

  const filters: ThreadFilters = { tab: tab as ThreadFilters["tab"], page, limit: THREADS_PER_PAGE };

  let threads: ThreadWithRelations[] = PLACEHOLDER_THREADS;
  let totalPages = 1;
  let banners: Banner[] = PLACEHOLDER_BANNERS;
  let hotThreads: { id: string; title: string; featureImage: string | null; heatScore: number }[] = [];

  try {
    const [threadResult, bannersResult, hotResult] = await Promise.all([
      getThreads(filters),
      getActiveBanners(),
      getHotThreads(3),
    ]);
    threads = threadResult.threads;
    totalPages = threadResult.totalPages;
    banners = bannersResult;
    hotThreads = hotResult;
  } catch {
    // DB not connected yet — use placeholders
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Carousel Banner */}
      <section className="mb-6">
        <CarouselBanner banners={banners} />
      </section>

      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Tab Filter */}
          <TabFilter currentTab={tab} />

          {/* Thread List */}
          <Suspense
            fallback={
              <div className="space-y-4 py-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4" />
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ThreadList threads={threads} />
          </Suspense>

          {/* Pagination - top + bottom */}
          {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}

          {/* Brand showcase */}
          <section className="mt-12 py-8 border-t">
            <h2 className="text-xl font-bold mb-4">Browse by Brand</h2>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/f/${brand.name.toLowerCase().replace(/\s+/g, "-").replace("/", "-")}`}
                  className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-20 space-y-4">
            <HotPostsSidebar threads={hotThreads.length > 0 ? hotThreads : [
              { id: "demo-1", title: "Roborock S8 MaxV Ultra vs Dreame X40 Ultra — Which is the King?", featureImage: null, heatScore: 98 },
              { id: "demo-2", title: "Best Robot Vacuum Deals — Amazon Spring Sale 2026", featureImage: null, heatScore: 91 },
              { id: "demo-3", title: "Beginner's Guide: Choosing Your First Robot Vacuum", featureImage: null, heatScore: 85 },
            ]} />

            {/* Quick links */}
            <div className="rounded-xl border p-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Quick Links
              </h3>
              <div className="space-y-1 text-sm">
                <Link href="/f/reviews" className="block text-muted-foreground hover:text-primary">Reviews</Link>
                <Link href="/f/discussion" className="block text-muted-foreground hover:text-primary">Discussion</Link>
                <Link href="/f/troubleshooting" className="block text-muted-foreground hover:text-primary">Troubleshooting</Link>
                <Link href="/f/deals" className="block text-muted-foreground hover:text-primary">Deals & Discounts</Link>
                <Link href="/f/guides" className="block text-muted-foreground hover:text-primary">Guides & How-To</Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
