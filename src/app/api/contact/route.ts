import { NextRequest, NextResponse } from "next/server";
import Contact from "../../../../models/contactModel";

export async function GET() {
    const contact = await Contact.find({});
    return NextResponse.json({success: true, data: contact})
}

export async function POST() {
    const { name } = NextRequest;

    const contact = await Contact.create({name});

    return NextResponse.json({success: true, contact})
}