import { NextResponse } from "next/server";
import Contact from "../../../../models/contactModel";

export async function GET() {
    const contact = await Contact.find({});
    return NextResponse.json({success: true, data: contact})
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newContact = await Contact.create(body);

    return NextResponse.json(
      { success: true, data: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}