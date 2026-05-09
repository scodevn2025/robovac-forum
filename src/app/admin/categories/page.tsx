import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  let categories: Array<{
    id: string;
    name: string;
    slug: string;
    threadCount: number;
    postCount: number;
    parentId: string | null;
  }> = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Add Category
        </Link>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Name</th>
              <th className="text-left px-4 py-2 font-medium">Slug</th>
              <th className="text-center px-4 py-2 font-medium">Threads</th>
              <th className="text-center px-4 py-2 font-medium">Posts</th>
              <th className="text-right px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="px-4 py-2">
                  {cat.parentId && <span className="text-muted-foreground mr-1">└</span>}
                  {cat.name}
                </td>
                <td className="px-4 py-2 text-muted-foreground">{cat.slug}</td>
                <td className="px-4 py-2 text-center">{cat.threadCount}</td>
                <td className="px-4 py-2 text-center">{cat.postCount}</td>
                <td className="px-4 py-2 text-right">
                  <Link href={`/admin/categories/${cat.id}`} className="text-primary hover:underline text-xs">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No categories yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
