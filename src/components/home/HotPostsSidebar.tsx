import Link from "next/link";

interface HotThread {
  id: string;
  title: string;
  featureImage: string | null;
  heatScore: number;
}

interface HotPostsSidebarProps {
  threads: HotThread[];
  title?: string;
}

export function HotPostsSidebar({ threads, title = "Hot Posts" }: HotPostsSidebarProps) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {threads.map((thread, i) => (
          <Link
            key={thread.id}
            href={`/t/${thread.id}`}
            className="flex gap-3 group"
          >
            <span className="text-2xl font-bold text-muted-foreground/30 tabular-nums leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                {thread.title}
              </p>
              {thread.featureImage && (
                <img
                  src={thread.featureImage}
                  alt=""
                  className="mt-1 w-full h-16 object-cover rounded"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
