import { Suspense } from "react";
import Link from "next/link";
import { CarouselBanner } from "@/components/home/CarouselBanner";
import { TabFilter } from "@/components/home/TabFilter";
import { ThreadList } from "@/components/home/ThreadList";
import { HotPostsSidebar } from "@/components/home/HotPostsSidebar";
import { Pagination } from "@/components/home/Pagination";
import { getThreads, getHotThreads, type ThreadFilters } from "@/lib/db/thread";
import { getActiveBanners } from "@/lib/db/banner";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { BRANDS, THREADS_PER_PAGE } from "@/lib/constants";
import type { ThreadWithRelations } from "@/types";

interface HomePageProps {
  searchParams: Promise<{ tab?: string; page?: string }>;
}

const PLACEHOLDER_THREADS: ThreadWithRelations[] = [
  {
    id: "demo-1", title: "Roborock S8 MaxV Ultra vs Dreame X40 Ultra — Đâu là vua robot 2026?",
    content: "", excerpt: "Sau 2 tuần test cả 2 flagship, đây là so sánh chi tiết của mình.", categoryId: "", authorId: "",
    prefix: "So sánh", isSticky: true, isDigest: true, heatScore: 98, viewCount: 3200,
    likeCount: 87, favCount: 34, replyCount: 56, geoFlag: "DE", featureImage: null, status: "ACTIVE",
    isPoll: false, isReward: false, modelTypeId: null, lastPostAt: new Date(), lastPostById: null,
    createdAt: new Date(), updatedAt: new Date(),
    author: { id: "u1", username: "roboter_de", image: null, avatarUrl: null, geoFlag: "DE" },
    category: { id: "c1", name: "Đánh giá", slug: "reviews" },
  },
  {
    id: "demo-2", title: "Săn deal robot hút bụi — Amazon Sale 2026 Megathread",
    content: "", excerpt: "Amazon Spring Sale đang diễn ra! Tổng hợp deal ngon nhất.", categoryId: "", authorId: "",
    prefix: "Deal", isSticky: true, isDigest: false, heatScore: 91, viewCount: 4800,
    likeCount: 65, favCount: 42, replyCount: 89, geoFlag: "GLOBAL", featureImage: null, status: "ACTIVE",
    isPoll: false, isReward: false, modelTypeId: null, lastPostAt: new Date(Date.now() - 900000), lastPostById: null,
    createdAt: new Date(Date.now() - 86400000), updatedAt: new Date(),
    author: { id: "u2", username: "vac_fan", image: null, avatarUrl: null, geoFlag: "GB" },
    category: { id: "c4", name: "Khuyến mãi", slug: "deals" },
  },
];

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const tab = params.tab ?? "featured";
  const page = Number(params.page) || 1;
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const th = (key: string) => dict.homepage?.[key] ?? key;
  const tn = (key: string) => dict.nav?.[key] ?? key;

  const filters: ThreadFilters = { tab: tab as ThreadFilters["tab"], page, limit: THREADS_PER_PAGE };

  let threads: ThreadWithRelations[] = PLACEHOLDER_THREADS;
  let totalPages = 1;
  let banners: Array<{ id: string; title: string; imageUrl: string; linkUrl: string | null }> = [];
  let hotThreads: Array<{ id: string; title: string; featureImage: string | null; heatScore: number }> = [];

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
    // Fallback to placeholder
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Hero section */}
      <section className="mb-6">
        {banners.length > 0 ? (
          <CarouselBanner banners={banners} />
        ) : (
          <div className="rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 md:p-12">
            <h1 className="text-2xl md:text-3xl font-bold">{th("title")}</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">{th("subtitle")}</p>
            <div className="mt-4 flex gap-3">
              <Link href="/f/reviews" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                {th("browseReviews")}
              </Link>
              <Link href="/f/discussion" className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                {th("joinDiscussion")}
              </Link>
            </div>
          </div>
        )}
      </section>

      <div className="flex gap-8">
        {/* Main */}
        <div className="flex-1 min-w-0">
          <TabFilter currentTab={tab} labels={{
            featured: th("featured"),
            new: th("new"),
            hot: th("hot"),
          }} />

          <Suspense fallback={
            <div className="space-y-4 py-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          }>
            <ThreadList threads={threads} />
          </Suspense>

          {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}

          {/* Brands */}
          <section className="mt-10 py-8 border-t">
            <h2 className="text-xl font-bold mb-4">{th("browseByBrand")}</h2>
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
            <HotPostsSidebar threads={hotThreads} title={th("hotPosts")} />

            <div className="roud-xl border p-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {th("quickLinks")}
              </h3>
              <div className="space-y-1 text-sm">
                {[
                  { label: tn("reviews"), href: "/f/reviews" },
                  { label: tn("discussion"), href: "/f/discussion" },
                  { label: tn("troubleshooting"), href: "/f/troubleshooting" },
                  { label: tn("deals"), href: "/f/deals" },
                  { label: tn("guides"), href: "/f/guides" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
