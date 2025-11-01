import { UpdateQuery } from "mongoose";
import { Enrollment } from "../../../../../models/Enrollment";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

async function upsertByUserId(
  userId: string,
  dataToSet: UpdateQuery<any>
): Promise<any> {
  const doc = await Enrollment.findOneAndUpdate(
    { userId },
    { $set: dataToSet },
    { new: true, upsert: true }
  );
  return doc;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { userId, aadhaarNumber, panNumber, aadhaarCard, photograph, signature } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "User not found with this userId!! First login" }, { status: 400 });
    }

    const dataToSet: any = {
      aadhaarNumber,
      panNumber,
      currentStep: 2,
    };

    // files metadata (optional) - store under files subdocument
    const files: any = {};
    if (aadhaarCard) files.aadhaarCard = aadhaarCard;
    if (photograph) files.photograph = photograph;
    if (signature) files.signature = signature;

    if (Object.keys(files).length) {
      dataToSet.files = files;
    }

    const doc = await upsertByUserId(userId, dataToSet);

    return NextResponse.json({ success: true, enrollment: doc });
  } catch (err: any) {
    console.error("enroll step2 error", err);
    return NextResponse.json({
      success: false,
      message: "step2 failed",
      error: err.message || "Unknown error",
    }, { status: 500 });
  }
}
