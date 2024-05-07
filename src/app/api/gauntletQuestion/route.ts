import { NextRequest, NextResponse } from "next/server";
import { generateQuestion } from "~/lib/utils/generate-question";

export async function GET(req: NextRequest) {
  try {
    const question = await generateQuestion();
    return NextResponse.json(question);
  } catch (error) {
    console.error("Failed to generate question", error);
    return NextResponse.error();
  }
}
