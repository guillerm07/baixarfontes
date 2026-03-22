import { NextRequest, NextResponse } from "next/server";
import { searchFonts } from "@/lib/fonts";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");

  if (!q.trim()) {
    return NextResponse.json({ fonts: [], total: 0, totalPages: 0 });
  }

  const result = await searchFonts(q.trim(), page);
  return NextResponse.json(result);
}
