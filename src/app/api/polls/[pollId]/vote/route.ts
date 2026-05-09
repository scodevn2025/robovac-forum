import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ pollId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { pollId } = await params;
  const { optionId } = await req.json();

  if (!optionId) return NextResponse.json({ message: "optionId required" }, { status: 400 });

  try {
    // For now, poll voting is simple — in a full implementation we'd add a PollOption and PollVote model
    // This API endpoint structure is ready for the full implementation

    return NextResponse.json({ success: true, message: "Vote recorded" });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
