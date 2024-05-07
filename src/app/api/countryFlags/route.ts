import { NextRequest, NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function GET(req: NextRequest) {
  try {
    const countryFlags = await api.flagQuiz.getCountryFlags();
    countryFlags.sort(() => Math.random() - 0.5);
    return NextResponse.json(countryFlags);
  } catch (error) {
    console.error("Failed to get flags", error);
    return NextResponse.error();
  }
}
