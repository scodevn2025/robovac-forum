"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface InteractionBarProps {
  likeCount: number;
  favCount: number;
  replyCount: number;
  threadId: string;
  liked?: boolean;
  favorited?: boolean;
  onLike?: () => void;
  onFav?: () => void;
}

export function InteractionBar({
  likeCount,
  favCount,
  replyCount,
  threadId,
  liked = false,
  favorited = false,
}: InteractionBarProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isFavd, setIsFavd] = useState(favorited);
  const [likes, setLikes] = useState(likeCount);
  const [favs, setFavs] = useState(favCount);

  function handleLike() {
    if (isLiked) {
      setLikes((c) => c - 1);
    } else {
      setLikes((c) => c + 1);
    }
    setIsLiked(!isLiked);
  }

  function handleFav() {
    if (isFavd) {
      setFavs((c) => c - 1);
    } else {
      setFavs((c) => c + 1);
    }
    setIsFavd(!isFavd);
  }

  function handleShare() {
    const url = `${window.location.origin}/t/${threadId}`;
    if (navigator.share) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors",
          isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
        )}
      >
        <svg className="size-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {likes}
      </button>

      <button
        onClick={handleFav}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors",
          isFavd ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"
        )}
      >
        <svg className="size-4" fill={isFavd ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        {favs}
      </button>

      <span className="flex items-center gap-1 text-sm text-muted-foreground">
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {replyCount}
      </span>

      <button onClick={handleShare} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
    </div>
  );
}
