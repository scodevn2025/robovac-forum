import Link from "next/link";
import { timeAgo } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import type { ThreadWithRelations } from "@/types";

const GEO_FLAG_MAP: Record<string, string> = {
  DE: "https://flagcdn.com/w40/de.png",
  GB: "https://flagcdn.com/w40/gb.png",
  IT: "https://flagcdn.com/w40/it.png",
  FR: "https://flagcdn.com/w40/fr.png",
  GLOBAL: "",
};

interface ThreadCardProps {
  thread: ThreadWithRelations;
  showExcerpt?: boolean;
}

export function ThreadCard({ thread, showExcerpt = true }: ThreadCardProps) {
  const geoFlagSrc = thread.geoFlag ? GEO_FLAG_MAP[thread.geoFlag] : null;
  const firstLetter = thread.author.username.charAt(0).toUpperCase();

  return (
    <article className="border-b py-4 hover:bg-muted/30 transition-colors">
      <div className="flex gap-4">
        {/* Avatar */}
        <Link href={`/u/${thread.author.id}`} className="shrink-0">
          {thread.author.avatarUrl || thread.author.image ? (
            <img
              src={thread.author.avatarUrl ?? thread.author.image ?? ""}
              alt={thread.author.username}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
              {firstLetter}
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <Link
              href={`/u/${thread.author.id}`}
              className="font-medium text-foreground hover:text-primary"
            >
              {thread.author.username}
            </Link>
            <span>{timeAgo(thread.createdAt)}</span>
            {geoFlagSrc && (
              <img src={geoFlagSrc} alt={thread.geoFlag ?? ""} className="h-3 w-5 object-cover rounded-sm" />
            )}
            <span className="flex items-center gap-1">
              <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {thread.viewCount.toLocaleString()}
            </span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 mt-1">
            {thread.isSticky && (
              <span className="inline-flex items-center gap-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                </svg>
                Pinned
              </span>
            )}
            {thread.isDigest && (
              <span className="inline-flex items-center gap-0.5 rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Digest
              </span>
            )}
            {thread.heatScore > 0 && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-medium",
                  thread.heatScore >= 80
                    ? "bg-red-100 text-red-700"
                    : thread.heatScore >= 50
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                )}
              >
                <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 23c-1.66 0-3-1.34-3-3V10c0-2.21 1.79-4 4-4s4 1.79 4 4v10c0 1.66-1.34 3-3 3zm-1-3h2V10c0-1.1-.9-2-2-2s-2 .9-2 2v10zm3.5-12.5l1.5-1.5c1.93-1.93 5.07-1.93 7 0l1.5 1.5-1.41 1.41-1.5-1.5c-1.17-1.17-3.07-1.17-4.24 0L16.5 7.5 15.09 6.09l1.5-1.5z" />
                </svg>
                {thread.heatScore}
              </span>
            )}
          </div>

          {/* Category prefix + Title */}
          <h3 className="mt-1 text-base">
            {thread.prefix && (
              <Link
                href={`/f/${thread.category.slug}`}
                className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground hover:text-primary mr-1.5"
              >
                {thread.prefix}
              </Link>
            )}
            <Link
              href={`/t/${thread.id}`}
              className="font-semibold hover:text-primary transition-colors"
            >
              {thread.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {showExcerpt && thread.excerpt && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {thread.excerpt}
              <Link href={`/t/${thread.id}`} className="text-primary hover:underline ml-1 whitespace-nowrap">
                view all
              </Link>
            </p>
          )}

          {/* Feature image */}
          {thread.featureImage && (
            <Link href={`/t/${thread.id}`} className="mt-2 block">
              <img
                src={thread.featureImage}
                alt={thread.title}
                className="w-full max-w-[730px] aspect-[730/495] object-cover rounded-lg"
              />
            </Link>
          )}

          {/* Interaction bar */}
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {thread.likeCount}
            </button>
            <button className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {thread.favCount}
            </button>
            <Link
              href={`/t/${thread.id}#replies`}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {thread.replyCount}
            </Link>
            <button
              className="flex items-center gap-1 hover:text-primary transition-colors ml-auto"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/t/${thread.id}`
                );
              }}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
