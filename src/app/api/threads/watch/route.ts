import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { threadId, watch } = await req.json();
    if (!threadId) return NextResponse.json({ message: "threadId required" }, { status: 400 });

    // In a full implementation, store watch status in DB
    // For now, return success for the optimistic UI
    return NextResponse.json({ watching: watch });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
