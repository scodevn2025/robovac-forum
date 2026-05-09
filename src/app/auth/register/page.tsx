import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Join {SITE_NAME}</h1>
        <p className="mt-2 text-muted-foreground">
          Create an account to start posting and engaging
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
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
