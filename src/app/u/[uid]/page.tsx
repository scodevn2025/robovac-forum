import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { ProfileCard } from "@/components/user/ProfileCard";
import { ProfileEditor } from "@/components/user/ProfileEditor";
import { getUserById, getUserThreads } from "@/lib/db/user";
import { ThreadCard } from "@/components/home/ThreadCard";
import { calculateReputation, getReputationLevel, getEarnedBadges, type UserStats } from "@/lib/badges";
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
  const session = await auth();
  const isOwnProfile = session?.user?.id === uid;

  const user = await getUserById(uid).catch(() => null);
  if (!user) notFound();

  const stats: UserStats = {
    threadCount: user.threadCount,
    postCount: user.postCount,
    likeCount: user.likeCount,
    accountAgeDays: Math.floor((Date.now() - user.createdAt.getTime()) / 86400000),
  };

  const reputation = calculateReputation(stats);
  const level = getReputationLevel(reputation);
  const badges = getEarnedBadges(stats);

  let threads: ThreadWithRelations[] = [];
  try {
    const result = await getUserThreads(uid);
    threads = result.threads as unknown as ThreadWithRelations[];
  } catch {
    // DB not connected
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Profile header */}
      <div className="bg-card rounded-xl border p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          {user.avatarUrl || user.image ? (
            <img src={user.avatarUrl ?? user.image ?? ""} alt={user.username} className="h-24 w-24 rounded-full object-cover border-4 border-primary/20" />
          ) : (
            <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <span className="rounded-full bg-primary/10 text-primary text-xs px-2 py-0.5 font-medium">{level.title}</span>
              <span className="text-xs text-muted-foreground">Lv.{level.level}</span>
            </div>

            {/* Reputation bar */}
            <div className="mt-2 max-w-xs">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Uy tín: {reputation} điểm</span>
                <span>Lv.{level.level}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-green-400 transition-all" style={{ width: `${Math.min((reputation / 5000) * 100, 100)}%` }} />
              </div>
            </div>

            {user.bio && <p className="mt-2 text-sm text-muted-foreground">{user.bio}</p>}
            <p className="text-xs text-muted-foreground mt-1">Tham gia {stats.accountAgeDays} ngày trước</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center shrink-0">
            <div><p className="text-2xl font-bold">{user.threadCount}</p><p className="text-xs text-muted-foreground">Bài viết</p></div>
            <div><p className="text-2xl font-bold">{user.postCount}</p><p className="text-xs text-muted-foreground">Bình luận</p></div>
            <div><p className="text-2xl font-bold">{user.likeCount}</p><p className="text-xs text-muted-foreground">Thích</p></div>
          </div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-semibold mb-2">Huy hiệu</h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1 text-sm" title={badge.description}>
                  <span>{badge.icon}</span>
                  <span className="text-xs font-medium">{badge.name}</span>
                </div>
              ))}
              {badges.length === 0 && (
                <p className="text-xs text-muted-foreground">Chưa có huy hiệu nào. Hãy tích cực tham gia!</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit profile (own profile only) */}
      {isOwnProfile && (
        <div className="bg-card rounded-xl border p-6 mb-6">
          <ProfileEditor user={{ id: user.id, username: user.username, bio: user.bio, avatarUrl: user.avatarUrl, geoFlag: user.geoFlag }} />
        </div>
      )}

      {/* Recent threads */}
      <section>
        <h2 className="font-semibold text-lg mb-4">Bài viết gần đây</h2>
        {threads.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Chưa có bài viết nào</p>
        ) : (
          <div>{threads.map((thread) => <ThreadCard key={thread.id} thread={thread} showExcerpt={false} />)}</div>
        )}
      </section>
    </div>
  );
}
