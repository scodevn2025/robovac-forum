import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PostCard } from "@/components/thread/PostCard";
import { ThreadContent } from "@/components/thread/ThreadContent";
import { ReplyForm } from "@/components/thread/ReplyForm";
import { InteractionBar } from "@/components/thread/InteractionBar";
import { ModActions } from "@/components/thread/ModActions";
import { ReactionPicker } from "@/components/thread/ReactionPicker";
import { WatchButton } from "@/components/thread/WatchButton";
import { auth } from "@/lib/auth";
import { getThreadById, getPostsByThreadId } from "@/lib/db/thread";
import { SITE_NAME } from "@/lib/constants";
import type { PostWithAuthor } from "@/types";

interface ThreadPageProps {
  params: Promise<{ tid: string }>;
  searchParams: Promise<{ page?: string; order?: string }>;
}

export async function generateMetadata({ params }: ThreadPageProps): Promise<Metadata> {
  const { tid } = await params;
  const thread = await getThreadById(tid).catch(() => null);
  if (!thread) return { title: `Thread | ${SITE_NAME}` };
  return {
    title: thread.title,
    description: thread.excerpt ?? undefined,
  };
}

export default async function ThreadPage({ params, searchParams }: ThreadPageProps) {
  const { tid } = await params;
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const order = (sp.order as "asc" | "desc") || "asc";

  const session = await auth();
  const thread = await getThreadById(tid).catch(() => null);
  if (!thread) notFound();

  const isLocked = thread.status === "LOCKED";
  let posts: PostWithAuthor[] = [];
  let totalPages = 1;

  try {
    const result = await getPostsByThreadId(tid, page, 20, order);
    posts = result.posts;
    totalPages = result.totalPages;
  } catch {
    // DB not connected
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      <Breadcrumb
        items={[
          { label: thread.category.name, href: `/f/${thread.category.slug}` },
          { label: thread.title },
        ]}
      />

      {/* Main thread post */}
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {thread.prefix && (
            <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {thread.prefix}
            </span>
          )}
          {thread.isSticky && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">Pinned</span>
          )}
          {thread.isDigest && (
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">Digest</span>
          )}
        </div>

        <h1 className="text-xl font-bold">{thread.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">
          {thread.viewCount.toLocaleString("en-US")} views · Posted by {thread.author.username}
        </p>

        {isLocked && (
          <div className="mt-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive font-medium">
            🔒 Chủ đề này đã bị khóa. Bạn không thể gửi trả lời mới.
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <ReactionPicker threadId={tid} />
          <InteractionBar
            likeCount={thread.likeCount}
            favCount={thread.favCount}
            replyCount={thread.replyCount}
            threadId={tid}
          />
          <WatchButton threadId={tid} />
          <ModActions
            threadId={tid}
            isSticky={thread.isSticky}
            isDigest={thread.isDigest}
            isLocked={isLocked}
            userRole={session?.user?.role}
          />
        </div>
      </div>

      {/* Main post content */}
      <div className="flex gap-4 border-b pb-6">
        <div className="w-40 shrink-0 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
            {thread.author.username.charAt(0).toUpperCase()}
          </div>
          <p className="mt-1 font-medium text-sm">{thread.author.username}</p>
        </div>
        <div className="flex-1 min-w-0">
          <ThreadContent content={thread.content} />
        </div>
      </div>

      {/* Sort toggle */}
      <div className="flex items-center justify-between py-3">
        <h2 className="font-semibold text-sm">
          {posts.length} Replies
        </h2>
        <div className="flex gap-1 text-xs">
          <a href={`?order=asc`} className={`px-2 py-1 rounded ${order === "asc" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
            Oldest
          </a>
          <a href={`?order=desc`} className={`px-2 py-1 rounded ${order === "desc" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
            Newest
          </a>
        </div>
      </div>

      {/* Replies */}
      <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Loading replies...</div>}>
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} threadId={tid} />
          ))}
        </div>
      </Suspense>

      {/* Reply form — only if not locked */}
      {!isLocked && <ReplyForm threadId={tid} />}
    </div>
  );
}
