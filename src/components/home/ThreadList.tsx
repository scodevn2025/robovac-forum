import { ThreadCard } from "@/components/home/ThreadCard";
import type { ThreadWithRelations } from "@/types";

interface ThreadListProps {
  threads: ThreadWithRelations[];
}

export function ThreadList({ threads }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p className="text-lg">No threads yet</p>
        <p className="text-sm mt-1">Be the first to start a discussion!</p>
      </div>
    );
  }

  return (
    <div>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
