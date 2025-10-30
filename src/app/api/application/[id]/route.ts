import { NextResponse } from "next/server";
import Application from "../../../../../models/applicationModel";
import { connectDB } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    const doc = await Application.findById(id);

    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, application: doc });
  } catch (err: any) {
    console.error("get /:id error", err);
    return NextResponse.json(
      {
        success: false,
        message: "fetch by id failed",
        error: err.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
