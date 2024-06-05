import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

interface Body {
  value: string;
}

interface Leaderboard {
  user_id: string;
  fullname: string;
  user_stat_id: number;
  gauntlet_score: number;
  country_quiz_time: number;
  country_quiz_score: number;
  flag_quiz_time: number;
  flag_quiz_score: number;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;
  const { value } = body;

  try {
    const leaderboard = (await api.user.getLeaderboard({ value })) as
      | Leaderboard[]
      | undefined;
    if (!leaderboard) {
      throw new Error("Leaderboard data is undefined");
    }
    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Failed to retrieve leaderboard", error);
    return NextResponse.error();
  }
}
