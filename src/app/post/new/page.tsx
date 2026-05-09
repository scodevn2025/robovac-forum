import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { PostEditor } from "@/components/editor/PostEditor";
import { getCategories } from "@/lib/db/category";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Create Thread | ${SITE_NAME}`,
};

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch {
    // DB not connected
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Thread</h1>
      <PostEditor categories={categories} />
    </div>
  );
}
