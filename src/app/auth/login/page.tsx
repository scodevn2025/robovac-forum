import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to your {SITE_NAME} account
        </p>
      </div>

      <div className="rounded-xl border p-6">
        <Suspense
          fallback={
            <div className="space-y-4 animate-pulse">
              <div className="h-10 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
