import Link from "next/link";
import { formatDate } from "@/lib/helpers";

interface ProfileCardProps {
  user: {
    id: string;
    username: string;
    image: string | null;
    avatarUrl: string | null;
    bio: string | null;
    role: string;
    geoFlag: string | null;
    postCount: number;
    threadCount: number;
    likeCount: number;
    createdAt: Date;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  const firstLetter = user.username.charAt(0).toUpperCase();

  return (
    <div className="rounded-xl border p-6">
      <div className="flex items-center gap-4">
        {user.avatarUrl || user.image ? (
          <img
            src={user.avatarUrl ?? user.image ?? ""}
            alt={user.username}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {firstLetter}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold">{user.username}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span className="rounded bg-muted px-2 py-0.5 text-xs">{user.role}</span>
            {user.geoFlag && user.geoFlag !== "GLOBAL" && (
              <span>{user.geoFlag}</span>
            )}
          </div>
          {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
          <p className="text-xs text-muted-foreground mt-1">
            Joined {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
        <div className="text-center">
          <p className="text-lg font-bold">{user.threadCount}</p>
          <p className="text-xs text-muted-foreground">Threads</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{user.postCount}</p>
          <p className="text-xs text-muted-foreground">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{user.likeCount}</p>
          <p className="text-xs text-muted-foreground">Likes</p>
        </div>
      </div>
    </div>
  );
}
