import { NextRequest, NextResponse } from "next/server";
import { api } from "~/trpc/server";

type UpdateStatsRequest = {
  user_id: string;
  target: string;
  value: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UpdateStatsRequest;

    const { user_id, target, value } = body;

    await api.user.updateStats({
      user_id,
      target,
      value,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update stats", error);
    return NextResponse.error();
  }
}
