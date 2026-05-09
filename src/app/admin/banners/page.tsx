import { prisma } from "@/lib/prisma";

export default async function AdminBannersPage() {
  let banners: Array<{
    id: string;
    title: string;
    imageUrl: string;
    linkUrl: string | null;
    sortOrder: number;
    isActive: boolean;
  }> = [];

  try {
    banners = await prisma.banner.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Banners</h1>
        <button className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90">
          Add Banner
        </button>
      </div>

      <div className="round-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Title</th>
              <th className="text-left px-4 py-2 font-medium">Image URL</th>
              <th className="text-center px-4 py-2 font-medium">Order</th>
              <th className="text-center px-4 py-2 font-medium">Active</th>
              <th className="text-right px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-2 font-medium">{b.title}</td>
                <td className="px-4 py-2 text-muted-foreground max-w-xs truncate">{b.imageUrl}</td>
                <td className="px-4 py-2 text-center">{b.sortOrder}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`rounded px-1.5 py-0.5 text-xs ${
                    b.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  }`}>
                    {b.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="text-primary hover:underline text-xs">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
