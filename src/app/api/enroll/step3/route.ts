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

    const { userId, highestQualification, institutionName, yearOfPassing, marksheet } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "User not found with this userId!! First login" }, { status: 400 });
    }

    const dataToSet: any = {
      highestQualification,
      institutionName,
      yearOfPassing,
      currentStep: 3,
    };

    if (marksheet) {
      dataToSet.files = { ...(dataToSet.files || {}), marksheet };
    }

    const doc = await upsertByUserId(userId, dataToSet);

    return NextResponse.json({ success: true, enrollment: doc });
  } catch (err: any) {
    console.error("enroll step3 error", err);
    return NextResponse.json({
      success: false,
      message: "step3 failed",
      error: err.message || "Unknown error",
    }, { status: 500 });
  }
}
