import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

interface LoginGateProps {
  children: React.ReactNode;
  message?: string;
}

export async function LoginGate({
  children,
  message = "Please log in to continue",
}: LoginGateProps) {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <p className="text-muted-foreground mb-4">{message}</p>
        <Link href="/auth/login">
          <Button>Sign In</Button>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
