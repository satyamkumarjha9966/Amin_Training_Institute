
import { NextResponse } from "next/server";
import Contact from "../../../../models/contactModel";
import mongoose from "mongoose";

export async function GET() {
    const contact = await Contact.find({});
    return NextResponse.json({success: true, data: contact})
}

export async function POST(req: Request) {
  try {
    // Check DB connection
    if (mongoose.connection.readyState !== 1) {
      return NextResponse.json(
        { error: "Database not connected", details: `Mongoose readyState: ${mongoose.connection.readyState}` },
        { status: 500 }
      );
    }
    const body = await req.json();
    try {
      const newContact = await Contact.create(body);
      return NextResponse.json(
        { success: true, data: newContact },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json(
        { error: "Database operation failed", details: dbError || dbError },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Request processing failed", details: error || error },
      { status: 500 }
    );
  }
}