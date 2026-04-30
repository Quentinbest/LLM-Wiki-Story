import { NextResponse } from "next/server";
import { savePage } from "@/lib/wiki-core";

export async function POST(request) {
  try {
    const payload = await request.json();
    const data = await savePage(payload);
    return NextResponse.json({ ok: true, page: data });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: error.status || 500 });
  }
}
