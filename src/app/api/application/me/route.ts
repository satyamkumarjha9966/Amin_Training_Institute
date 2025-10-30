import Application from "../../../../../models/applicationModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Try to get userId from query, header, or body (fallback)
    const { searchParams } = new URL(req.url);
    const userIdFromQuery = searchParams.get("userId");
    const userIdFromHeader = req.headers.get("x-user-id");
    let userId = userIdFromQuery || userIdFromHeader;

    // If not found in query/header, try reading from body (for non-GET requests)
    if (!userId && req.method !== "GET") {
      const body = await req.json().catch(() => null);
      userId = body?.userId;
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId required" },
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
