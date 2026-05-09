"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface ModelFilterProps {
  modelTags: string[];
  currentModel?: string;
}

export function ModelFilter({ modelTags, currentModel }: ModelFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (modelTags.length === 0) return null;

  function selectModel(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("model", tag);
    } else {
      params.delete("model");
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-1.5 py-2">
      <button
        onClick={() => selectModel(null)}
        className={cn(
          "px-2.5 py-1 text-xs rounded-full border transition-colors",
          !currentModel
            ? "bg-primary text-primary-foreground border-primary"
            : "text-muted-foreground hover:bg-muted"
        )}
      >
        All
      </button>
      {modelTags.map((tag) => (
        <button
          key={tag}
          onClick={() => selectModel(tag)}
          className={cn(
            "px-2.5 py-1 text-xs rounded-full border transition-colors",
            currentModel === tag
              ? "bg-primary text-primary-foreground border-primary"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
