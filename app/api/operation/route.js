import { NextResponse } from "next/server";
import { runOperation } from "@/lib/wiki-core";

export async function POST(request) {
  try {
    const { operation } = await request.json();
    const data = await runOperation(operation);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
