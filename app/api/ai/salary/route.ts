import { NextResponse } from "next/server";
import { getSalarySuggestion } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { position } = await req.json();

    if (!position) {
      return NextResponse.json(
        { error: "Position is required" },
        { status: 400 }
      );
    }

    const suggestion = await getSalarySuggestion(position);

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    );
  }
}