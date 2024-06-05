import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

interface Body {
  value: string;
}

export async function POST(req: NextRequest) {
  const body: Body = await req.json();
  const { value } = body;

  try {
    const leaderboard: unknown = await api.user.getLeaderboard({ value });
    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Failed to retrieve leaderboard", error);
    return NextResponse.error();
  }
}
