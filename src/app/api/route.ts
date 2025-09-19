import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ ok: true, state: 'DB connected' });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}