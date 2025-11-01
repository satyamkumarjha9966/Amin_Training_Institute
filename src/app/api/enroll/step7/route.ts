import { UpdateQuery } from "mongoose";
import { Enrollment } from "../../../../../models/Enrollment";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "User not found with this userId!! First login" }, { status: 400 });
    }

    const doc = await Enrollment.findOneAndUpdate(
      { userId },
      {
        $set: {
          isFinalSubmitted: true,
          finalSubmittedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!doc) {
      return NextResponse.json(
        {
          success: false,
          message: "Enrollment not found for this user",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enrollment: doc,
    });
  } catch (err: any) {
    console.error("enroll final-submit error", err);
    return NextResponse.json({
      success: false,
      message: "final submit failed",
      error: err.message || "Unknown error",
    }, { status: 500 });
  }
}
