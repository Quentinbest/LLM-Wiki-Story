import { NextResponse } from "next/server";
import { scanWiki } from "@/lib/wiki-core";

export async function GET() {
  try {
    const data = await scanWiki();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
