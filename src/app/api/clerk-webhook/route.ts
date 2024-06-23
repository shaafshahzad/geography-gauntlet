import { NextRequest, NextResponse } from "next/server";
import { object } from "zod";
import { api } from "~/trpc/server";

interface Body {
  data: {
    deleted: boolean;
    id: string;
    object: string;
  };
  event_attributes: {
    http_request: {
      client_ip: string;
      user_agent: string;
    };
  };
  object: string;
  type: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();

    if (body.data?.deleted && body.type === "user.deleted") {
      const userId = body.data.id!;

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
