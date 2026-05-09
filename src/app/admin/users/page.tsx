import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  let users: Array<{
    id: string;
    username: string;
    email: string;
    role: string;
    threadCount: number;
    postCount: number;
    createdAt: Date;
  }> = [];

  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Username</th>
              <th className="text-left px-4 py-2 font-medium">Email</th>
              <th className="text-center px-4 py-2 font-medium">Role</th>
              <th className="text-center px-4 py-2 font-medium">Threads</th>
              <th className="text-center px-4 py-2 font-medium">Posts</th>
              <th className="text-right px-4 py-2 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2 font-medium">{u.username}</td>
                <td className="px-4 py-2 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`rounded px-1.5 py-0.5 text-xs ${
                    u.role === "ADMIN" ? "bg-red-100 text-red-700" :
                    u.role === "MODERATOR" ? "bg-blue-100 text-blue-700" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">{u.threadCount}</td>
                <td className="px-4 py-2 text-center">{u.postCount}</td>
                <td className="px-4 py-2 text-right text-muted-foreground text-xs">
                  {u.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
