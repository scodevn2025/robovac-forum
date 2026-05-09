import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SubCategoryCard } from "@/components/category/SubCategoryCard";
import { FilterBar } from "@/components/category/FilterBar";
import { ModelFilter } from "@/components/category/ModelFilter";
import { ThreadList } from "@/components/home/ThreadList";
import { Pagination } from "@/components/home/Pagination";
import { getCategoryBySlug } from "@/lib/db/category";
import { getThreads } from "@/lib/db/thread";
import { SITE_NAME, THREADS_PER_PAGE } from "@/lib/constants";
import type { ThreadWithRelations } from "@/types";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: string;
    time?: string;
    type?: string;
    model?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug).catch(() => null);
  if (!category) return { title: `Not Found | ${SITE_NAME}` };
  return {
    title: category.name,
    description: category.description ?? `Browse ${category.name} threads`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const sort = sp.sort ?? "lastpost";
  const timeFilter = sp.time ?? "all";
  const typeFilter = sp.type ?? "all";
  const modelTag = sp.model;
  const page = Number(sp.page) || 1;

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    category = null;
  }

  if (!category) {
    notFound();
  }

  const subCategories = category.children ?? [];
  const modelTags = category.modelTags ?? [];

  let threads: ThreadWithRelations[] = [];
  let totalPages = 1;

  try {
    const result = await getThreads({
      categoryId: category.id,
      sort: sort as never,
      timeFilter: timeFilter as never,
      typeFilter: typeFilter as never,
      modelTag,
      page,
      limit: THREADS_PER_PAGE,
    });
    threads = result.threads;
    totalPages = result.totalPages;
  } catch {
    // DB not connected
  }

  const breadcrumbItems = [];
  if (category.parent) {
    breadcrumbItems.push({
      label: category.parent.name,
      href: `/f/${category.parent.slug}`,
    });
  }
  breadcrumbItems.push({ label: category.name });

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <Breadcrumb items={breadcrumbItems} />

      {/* Sub-categories */}
      {subCategories.length > 0 && (
        <section className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {subCategories.map((sub) => (
              <SubCategoryCard
                key={sub.id}
                category={{
                  id: sub.id,
                  name: sub.name,
                  slug: sub.slug,
                  description: sub.description,
                  icon: sub.icon,
                  threadCount: sub.threadCount,
                  postCount: sub.postCount,
                  lastPost: null,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Model filter */}
      {modelTags.length > 0 && (
        <ModelFilter modelTags={modelTags} currentModel={modelTag} />
      )}

      {/* Filter bar */}
      <FilterBar
        currentSort={sort}
        currentTime={timeFilter}
        currentType={typeFilter}
      />

      {/* Thread list */}
      <Suspense fallback={<div className="py-8 space-y-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-5 bg-muted rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>}>
        <ThreadList threads={threads} />
      </Suspense>

      <Pagination currentPage={page} totalPages={totalPages} baseUrl={`/f/${slug}`} />

      {/* Category description */}
      {category.description && (
        <div className="mt-8 p-4 rounded-xl bg-muted/30 text-sm text-muted-foreground">
          {category.description}
        </div>
      )}
    </div>
  );
}
