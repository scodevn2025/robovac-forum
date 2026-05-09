import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProfileCard } from "@/components/user/ProfileCard";
import { getUserById, getUserThreads } from "@/lib/db/user";
import { ThreadCard } from "@/components/home/ThreadCard";
import { SITE_NAME } from "@/lib/constants";
import type { ThreadWithRelations } from "@/types";

interface ProfilePageProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { uid } = await params;
  const user = await getUserById(uid).catch(() => null);
  if (!user) return { title: `User | ${SITE_NAME}` };
  return { title: `${user.username} | ${SITE_NAME}` };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { uid } = await params;

  const user = await getUserById(uid).catch(() => null);
  if (!user) notFound();

  let threads: ThreadWithRelations[] = [];
  try {
    const result = await getUserThreads(uid);
    threads = result.threads as unknown as ThreadWithRelations[];
  } catch {
    // DB not connected
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <ProfileCard user={user} />

      <section className="mt-8">
        <h2 className="font-semibold text-lg mb-4">
          Recent Threads by {user.username}
        </h2>
        {threads.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">
            No threads yet
          </p>
        ) : (
          <div>
            {threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} showExcerpt={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
