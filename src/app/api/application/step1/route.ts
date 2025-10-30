import { UpdateQuery } from "mongoose";
import Application from "../../../../../models/applicationModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

async function upsertByUserId(
  userId: string,
  dataToSet: UpdateQuery<any>
): Promise<any> {
  const doc = await Application.findOneAndUpdate(
    { userId },
    { $set: dataToSet },
    { new: true, upsert: true }
  );
  return doc;
};

export async function POST(req: Request) {
    try {
    await connectDB();

    const body = await req.json();
    const {
      userId,
      fullName,
      email,
      mobile,
      provisionalRegNo,
      passwordHash,
    } = body;

    const dataToSet = {
      userId,
      fullName,
      email,
      mobile,
      provisionalRegNo,
      passwordHash,
      currentStep: 1,
    };

    const doc = await upsertByUserId(userId, dataToSet);

    return NextResponse.json({ success: true, application: doc });
  } catch (err: any) {
    console.error("step1 error", err);
    return NextResponse.json(
      {
        success: false,
        message: "step1 failed",
        error: err.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}