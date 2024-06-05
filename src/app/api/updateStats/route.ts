import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

interface RequestBody {
  user_id: string;
  target: string;
  value: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody;
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
