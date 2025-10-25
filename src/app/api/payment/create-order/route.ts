import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

     const rupees = Number(amount);
    if (!Number.isFinite(rupees) || rupees <= 0) {
      return NextResponse.json({ message: "Invalid amount", success: false }, { status: 400 });
    }

    await connectDB();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Order creation failed", error: error.message },
      { status: 500 }
    );
  }
}
