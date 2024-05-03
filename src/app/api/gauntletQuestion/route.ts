import { NextRequest, NextResponse } from "next/server";
import { generateQuestion } from "~/app/lib/utils/generate-question";

export async function POST(req: NextRequest) {
  try {
    const question = await generateQuestion();
    return NextResponse.json(question);
  } catch (error) {
    console.error("Failed to generate question", error);
    return NextResponse.error();
  }
}
