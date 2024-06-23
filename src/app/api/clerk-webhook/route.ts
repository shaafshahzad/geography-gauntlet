import { NextRequest, NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.data && body.data.deleted && body.type === "user.deleted") {
      const userId = body.data.id;

      await api.user.deleteUser({ user_id: userId });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
