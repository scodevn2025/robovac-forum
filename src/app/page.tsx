import { Suspense } from "react";
import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { TabFilter } from "@/components/home/TabFilter";
import { ThreadList } from "@/components/home/ThreadList";
import { HotPostsSidebar } from "@/components/home/HotPostsSidebar";
import { Pagination } from "@/components/home/Pagination";
import { VideoSection } from "@/components/home/VideoSection";
import { getThreads, getHotThreads, type ThreadFilters } from "@/lib/db/thread";
import { getActiveBanners } from "@/lib/db/banner";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { BRANDS, THREADS_PER_PAGE } from "@/lib/constants";
import type { ThreadWithRelations } from "@/types";

interface HomePageProps {
  searchParams: Promise<{ tab?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const tab = params.tab ?? "featured";
  const page = Number(params.page) || 1;
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const th = (key: string) => dict.homepage?.[key] ?? key;
  const tn = (key: string) => dict.nav?.[key] ?? key;

  const filters: ThreadFilters = { tab: tab as ThreadFilters["tab"], page, limit: THREADS_PER_PAGE };

  let threads: ThreadWithRelations[] = [];
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
    // DB not connected — will show empty state
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="bg-card border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <HeroSlider />
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-8">
          {/* Main feed */}
          <div className="flex-1 min-w-0">
            {/* Tab Filter */}
            <div className="bg-card rounded-xl border px-5 pt-4 pb-0 mb-4">
              <TabFilter currentTab={tab} labels={{
                featured: th("featured"),
                new: th("new"),
                hot: th("hot"),
              }} />
            </div>

            {/* Thread list */}
            <Suspense fallback={
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border p-5 animate-pulse">
                    <div className="flex gap-4">
                      <div className="h-11 w-11 rounded-full bg-muted shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/3" />
                        <div className="h-5 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <ThreadList threads={threads} />
            </Suspense>

            {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}

            {/* Brands */}
            <section className="mt-10">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-bold mb-4">{th("browseByBrand")}</h2>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map((brand) => (
                    <Link
                      key={brand.name}
                      href={`/f/${brand.name.toLowerCase().replace(/\s+/g, "-").replace("/", "-")}`}
                      className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-all"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Video Reviews Section */}
            <VideoSection locale={locale} />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Stats card */}
              <div className="bg-card rounded-xl border p-5">
                <h3 className="font-bold text-sm mb-3">
                  {locale === "vi" ? "Thống kê diễn đàn" : "Forum Stats"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Bài viết", value: threads.length > 0 ? "1.2K" : "--" },
                    { label: "Bình luận", value: "--" },
                    { label: "Thành viên", value: "--" },
                    { label: "Thương hiệu", value: "12" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hot posts */}
              <div className="bg-card rounded-xl border p-5">
                <HotPostsSidebar threads={hotThreads} title={th("hotPosts")} />
              </div>

              {/* Quick links */}
              <div className="bg-card rounded-xl border p-5">
                <h3 className="font-bold text-sm mb-3">{th("quickLinks")}</h3>
                <div className="space-y-0.5">
                  {[
                    { label: tn("reviews"), href: "/f/reviews" },
                    { label: tn("discussion"), href: "/f/discussion" },
                    { label: tn("troubleshooting"), href: "/f/troubleshooting" },
                    { label: tn("deals"), href: "/f/deals" },
                    { label: tn("guides"), href: "/f/guides" },
                    { label: tn("showcase"), href: "/f/showcase" },
                    { label: tn("news"), href: "/f/news" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
