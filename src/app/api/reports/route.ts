import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { targetId, targetType, reason, detail } = await req.json();

    if (!targetId || !targetType || !reason) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // In a full implementation, store report in DB with Report model
    console.log(`[Report] User ${session.user.id} reported ${targetType} ${targetId}: ${reason} — ${detail}`);

    return NextResponse.json({ success: true, message: "Report submitted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
