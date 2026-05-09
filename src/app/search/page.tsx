import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { SearchBar } from "@/components/search/SearchBar";

export const metadata: Metadata = {
  title: `Search | ${SITE_NAME}`,
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search</h1>

      <Suspense fallback={<div className="animate-pulse h-10 bg-muted rounded" />}>
        <SearchBar />
      </Suspense>

      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>Enter a search term to find threads, posts, and users.</p>
        <p className="mt-1">Search supports full-text matching across the entire forum.</p>
      </div>
    </div>
  );
}
