import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminThreadsPage() {
  let threads: Array<{
    id: string;
    title: string;
    status: string;
    viewCount: number;
    replyCount: number;
    author: { username: string };
    category: { name: string };
    createdAt: Date;
  }> = [];

  try {
    threads = await prisma.thread.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        author: { select: { username: true } },
        category: { select: { name: true } },
      },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Threads</h1>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Title</th>
              <th className="text-left px-4 py-2 font-medium">Category</th>
              <th className="text-left px-4 py-2 font-medium">Author</th>
              <th className="text-center px-4 py-2 font-medium">Status</th>
              <th className="text-center px-4 py-2 font-medium">Views</th>
              <th className="text-center px-4 py-2 font-medium">Replies</th>
              <th className="text-right px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2 max-w-xs truncate">
                  <Link href={`/t/${t.id}`} className="hover:text-primary">
                    {t.title}
                  </Link>
                </td>
                <td className="px-4 py-2 text-muted-foreground">{t.category.name}</td>
                <td className="px-4 py-2">{t.author.username}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`rounded px-1.5 py-0.5 text-xs ${
                    t.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                    t.status === "LOCKED" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">{t.viewCount}</td>
                <td className="px-4 py-2 text-center">{t.replyCount}</td>
                <td className="px-4 py-2 text-right">
                  <Link href={`/admin/threads/${t.id}`} className="text-primary hover:underline text-xs">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
