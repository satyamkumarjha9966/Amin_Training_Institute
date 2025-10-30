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
    const { userId } = body;

    const doc = await Application.findOneAndUpdate(
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
          message: "Application not found for this user",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application: doc,
    });
  } catch (err: any) {
    console.error("final-submit error", err);
    return NextResponse.json(
      {
        success: false,
        message: "final submit failed",
        error: err.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}