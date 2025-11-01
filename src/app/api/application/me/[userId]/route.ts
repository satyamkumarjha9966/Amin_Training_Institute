import Application from "../../../../../../models/applicationModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    let { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not found with this userId!! First login" },
        { status: 400 }
      );
    }

    const doc = await Application.findOne({ userId });

    return NextResponse.json({
      success: true,
      application: doc || null,
    });
  } catch (err: any) {
    console.error("get /me error", err);
    return NextResponse.json(
      {
        success: false,
        message: "fetch /me failed",
        error: err.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
