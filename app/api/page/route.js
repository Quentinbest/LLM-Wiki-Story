import { NextResponse } from "next/server";
import { getPage } from "@/lib/wiki-core";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang");
    const relativePath = searchParams.get("path");
    const data = await getPage(lang, relativePath);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
