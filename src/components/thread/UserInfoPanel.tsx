import Link from "next/link";
import { formatDate } from "@/lib/helpers";

interface UserInfoPanelProps {
  user: {
    id: string;
    username: string;
    image: string | null;
    avatarUrl: string | null;
    geoFlag: string | null;
    postCount?: number;
    createdAt?: Date;
  };
}

export function UserInfoPanel({ user }: UserInfoPanelProps) {
  const firstLetter = user.username.charAt(0).toUpperCase();

  return (
    <div className="w-40 shrink-0 text-center">
      <Link href={`/u/${user.id}`}>
        {user.avatarUrl || user.image ? (
          <img
            src={user.avatarUrl ?? user.image ?? ""}
            alt={user.username}
            className="mx-auto h-16 w-16 rounded-full object-cover border-2 border-border"
          />
        ) : (
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary border-2 border-border">
            {firstLetter}
          </div>
        )}
        <p className="mt-1 font-medium text-sm hover:text-primary">{user.username}</p>
      </Link>
      {user.postCount !== undefined && (
        <p className="text-xs text-muted-foreground mt-0.5">
          {user.postCount} posts
        </p>
      )}
      {user.createdAt && (
        <p className="text-xs text-muted-foreground mt-0.5">
          Joined {formatDate(user.createdAt)}
        </p>
      )}
    </div>
  );
}
