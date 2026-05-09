"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { TOPIC_TYPES, TIME_FILTERS, SORT_OPTIONS } from "@/lib/constants";

interface FilterBarProps {
  currentSort?: string;
  currentTime?: string;
  currentType?: string;
}

export function FilterBar({ currentSort = "lastpost", currentTime = "all", currentType = "all" }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "default" || value === "lastpost") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 border-b">
      {/* Topic type */}
      <div className="flex gap-1">
        {TOPIC_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => updateParam("type", t.value)}
            className={cn(
              "px-3 py-1 text-xs rounded-full border transition-colors",
              currentType === t.value
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Time filter */}
      <div className="flex gap-1 ml-auto">
        {TIME_FILTERS.map((t) => (
          <button
            key={t.value}
            onClick={() => updateParam("time", t.value)}
            className={cn(
              "px-2 py-1 text-xs rounded transition-colors",
              currentTime === t.value
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="text-xs border rounded px-2 py-1 bg-background"
      >
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
