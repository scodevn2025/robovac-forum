"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PostActionsProps {
  postId: string;
  postAuthorId: string;
  postContent: string;
  threadId: string;
  onQuote?: (content: string) => void;
}

export function PostActions({ postId, postAuthorId, postContent, threadId, onQuote }: PostActionsProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwner = session?.user?.id === postAuthorId;
  const isMod = session?.user?.role === "ADMIN" || session?.user?.role === "MODERATOR";
  if (!isOwner && !isMod) return null;

  function startEdit() {
    try {
      const doc = JSON.parse(postContent);
      const text = doc.content?.[0]?.content?.[0]?.text ?? postContent;
      setContent(text);
    } catch {
      setContent(postContent);
    }
    setEditing(true);
    setError(null);
  }

  async function saveEdit() {
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: JSON.stringify({
            type: "doc",
            content: [{ type: "paragraph", content: [{ type: "text", text: content }] }],
          }),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message ?? "Lỗi khi sửa");
        setLoading(false);
        return;
      }

      setEditing(false);
      router.refresh();
    } catch {
      setError("Lỗi kết nối");
      setLoading(false);
    }
  }

  async function deletePost() {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    setLoading(true);
    try {
      await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  function handleQuote() {
    try {
      const doc = JSON.parse(postContent);
      const text = doc.content?.[0]?.content?.[0]?.text ?? postContent;
      onQuote?.(text);
    } catch {
      onQuote?.(postContent);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      {onQuote && (
        <button onClick={handleQuote} className="text-xs text-muted-foreground hover:text-primary transition-colors">
          Trích dẫn
        </button>
      )}
      {isOwner && (
        <button onClick={startEdit} disabled={loading} className="text-xs text-muted-foreground hover:text-primary transition-colors">
          Sửa
        </button>
      )}
      {(isOwner || isMod) && (
        <button onClick={deletePost} disabled={loading} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
          Xóa
        </button>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setEditing(false)}>
          <div className="bg-card rounded-xl border shadow-xl w-full max-w-lg mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold mb-3">Sửa bài viết</h3>
            {error && <p className="text-sm text-destructive mb-2">{error}</p>}
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mb-3"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(false)} disabled={loading}>
                Hủy
              </Button>
              <Button size="sm" onClick={saveEdit} disabled={loading || !content.trim()}>
                {loading ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
