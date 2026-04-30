import { NextResponse } from "next/server";
import { searchWiki } from "@/lib/wiki-core";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = Number(searchParams.get("limit") || 80);
    const data = await searchWiki(query, limit);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
