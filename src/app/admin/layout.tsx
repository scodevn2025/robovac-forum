import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Categories", href: "/admin/categories", icon: "📁" },
  { label: "Threads", href: "/admin/threads", icon: "📝" },
  { label: "Users", href: "/admin/users", icon: "👥" },
  { label: "Banners", href: "/admin/banners", icon: "🖼️" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-muted/20 p-4 shrink-0">
        <h2 className="font-bold text-sm mb-4 px-2">Admin Panel</h2>
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 pt-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Forum
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
}
