"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TabFilterProps {
  currentTab?: string;
  labels?: { featured: string; new: string; hot: string };
}

export function TabFilter({ currentTab = "featured", labels }: TabFilterProps) {
  const TABS = [
    { label: labels?.featured ?? "Featured", value: "featured" },
    { label: labels?.new ?? "New", value: "new" },
    { label: labels?.hot ?? "Hot", value: "hot" },
  ] as const;
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTabChange(tab: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    params.delete("page");
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex gap-1 border-b">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
            currentTab === tab.value
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}


