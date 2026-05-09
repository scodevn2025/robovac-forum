"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_PREFIXES, GEO_FLAGS } from "@/lib/constants";

interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

interface PostEditorProps {
  categories: Category[];
  initialData?: {
    title?: string;
    content?: string;
    categoryId?: string;
    prefix?: string;
    geoFlag?: string;
  };
}

export function PostEditor({ categories, initialData }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");
  const [prefix, setPrefix] = useState(initialData?.prefix ?? "");
  const [geoFlag, setGeoFlag] = useState(initialData?.geoFlag ?? "GLOBAL");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) {
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: JSON.stringify({
            type: "doc",
            content: [
              { type: "paragraph", content: [{ type: "text", text: content }] },
            ],
          }),
          excerpt: content.slice(0, 200),
          categoryId,
          prefix: prefix || undefined,
          geoFlag,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body.message ?? "Failed to create thread");
        setIsSubmitting(false);
        return;
      }

      const thread = await res.json();
      router.push(`/t/${thread.id}`);
      router.refresh();
    } catch {
      setError("Something went wrong");
      setIsSubmitting(false);
    }
  }

  const flattenCategories = (cats: Category[], depth = 0): Category[] => {
    const result: Category[] = [];
    for (const cat of cats) {
      result.push(cat);
      if (cat.children) {
        result.push(...flattenCategories(cat.children, depth + 1));
      }
    }
    return result;
  };

  const allCats = flattenCategories(categories);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title *</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thread title (min. 5 characters)"
          maxLength={200}
        />
      </div>

      {/* Category */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value="">Select...</option>
            {allCats.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Prefix Tag</label>
          <select
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value="">None</option>
            {CATEGORY_PREFIXES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Region</label>
          <select
            value={geoFlag}
            onChange={(e) => setGeoFlag(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            {Object.entries(GEO_FLAGS).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Content *</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thread content here... (markdown-style text)"
          rows={12}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Supports basic formatting: line breaks, lists, bold (**text**), italic (*text*)
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Thread"}
        </Button>
      </div>
    </form>
  );
}
