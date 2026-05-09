import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Admin Dashboard | ${SITE_NAME}`,
};

export default async function AdminDashboard() {
  let stats = {
    users: 0,
    threads: 0,
    posts: 0,
    categories: 0,
  };

  try {
    const [users, threads, posts, categories] = await Promise.all([
      prisma.user.count(),
      prisma.thread.count(),
      prisma.post.count(),
      prisma.category.count(),
    ]);
    stats = { users, threads, posts, categories };
  } catch {
    // DB not connected
  }

  const cards = [
    { label: "Total Users", value: stats.users, color: "bg-blue-100 text-blue-800" },
    { label: "Total Threads", value: stats.threads, color: "bg-green-100 text-green-800" },
    { label: "Total Posts", value: stats.posts, color: "bg-purple-100 text-purple-800" },
    { label: "Categories", value: stats.categories, color: "bg-orange-100 text-orange-800" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-xl p-5 ${card.color}`}>
            <p className="text-sm opacity-80">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value.toLocaleString("en-US")}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="rounded-xl border p-6">
          <h2 className="font-semibold mb-2">Quick Actions</h2>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• <a href="/admin/categories" className="hover:text-primary">Manage Categories</a></li>
            <li>• <a href="/admin/threads" className="hover:text-primary">Moderate Threads</a></li>
            <li>• <a href="/admin/banners" className="hover:text-primary">Manage Banners</a></li>
          </ul>
        </div>
        <div className="rounded-xl border p-6">
          <h2 className="font-semibold mb-2">System Info</h2>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Next.js 16.2.6</p>
            <p>Tailwind CSS 4.3.0</p>
            <p>Prisma 7.8 + PostgreSQL</p>
            <p>NextAuth.js v5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
