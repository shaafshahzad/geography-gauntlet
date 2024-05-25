import { NextRequest, NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { value } = body;

  try {
    const leaderboard = await api.user.getLeaderboard({ value });
    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Failed to retrieve leaderboard", error);
    return NextResponse.error();
  }
}
