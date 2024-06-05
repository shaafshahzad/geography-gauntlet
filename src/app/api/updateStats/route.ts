import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, target, value } = body;

  try {
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
