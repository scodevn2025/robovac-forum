import { UserInfoPanel } from "@/components/thread/UserInfoPanel";
import { InteractionBar } from "@/components/thread/InteractionBar";
import { PostActions } from "@/components/thread/PostActions";
import { ThreadContent } from "@/components/thread/ThreadContent";
import { formatDateTime } from "@/lib/helpers";
import type { PostWithAuthor } from "@/types";

interface PostCardProps {
  post: PostWithAuthor;
  threadId: string;
  isMainPost?: boolean;
}

export function PostCard({ post, threadId, isMainPost = false }: PostCardProps) {
  return (
    <article className={`flex gap-4 py-4 ${!isMainPost ? "border-t" : ""}`} id={`post-${post.id}`}>
      {/* User sidebar */}
      <UserInfoPanel user={post.author} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          {post.floorNum && <span>#{post.floorNum}</span>}
          <span>{formatDateTime(post.createdAt)}</span>
          {post.updatedAt > post.createdAt && <span className="italic">(đã sửa)</span>}
          <div className="ml-auto">
            <PostActions
              postId={post.id}
              postAuthorId={post.authorId}
              postContent={post.content}
              threadId={threadId}
            />
          </div>
        </div>

        {/* Body */}
        <ThreadContent content={post.content} />

        {/* Actions */}
        <div className="mt-3">
          <InteractionBar
            likeCount={post.likeCount}
            favCount={0}
            replyCount={0}
            threadId={threadId}
          />
        </div>
      </div>
    </article>
  );
}
