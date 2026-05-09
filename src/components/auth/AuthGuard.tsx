import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export async function AuthGuard({ children, adminOnly = false }: AuthGuardProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (adminOnly && session.user.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
