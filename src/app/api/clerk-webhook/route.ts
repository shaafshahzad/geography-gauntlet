import { NextRequest, NextResponse } from "next/server";
import { api } from "~/trpc/server"; // Adjust the import to match your project structure

const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET; // Set this in your environment variables

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const signature = req.headers.get("clerk-signature");

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
