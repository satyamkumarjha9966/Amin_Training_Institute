import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Enrollment } from "../../../../../models/Enrollment";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) return NextResponse.json({ success: false, message: "id missing" }, { status: 400 });

    const doc = await Enrollment.findById(id);
    if (!doc) return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });

    return NextResponse.json({ success: true, enrollment: doc });
  } catch (err: any) {
    console.error("enroll get by id error", err);
    return NextResponse.json({ success: false, message: "failed to fetch enrollment", error: err.message || "Unknown error" }, { status: 500 });
  }
}
