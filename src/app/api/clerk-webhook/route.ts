import { NextRequest, NextResponse } from "next/server";
import { api } from "~/trpc/server";

interface Body {
  data?: {
    deleted?: boolean;
    id?: string;
  };
  type?: string;
}

interface UserDeletedEvent {
  data: {
    deleted: boolean;
    id: string;
  };
  type: "user.deleted";
}

function isUserDeletedEvent(body: any): body is UserDeletedEvent {
  return (
    body &&
    body.data &&
    typeof body.data.deleted === "boolean" &&
    typeof body.data.id === "string" &&
    body.type === "user.deleted"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (isUserDeletedEvent(body)) {
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
