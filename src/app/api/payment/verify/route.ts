import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Payment from "../../../../../models/paymentModel";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    } = await req.json();

    await connectDB();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET as string)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });

    // Fetch order to get amount + donor notes
    const order = await razorpay.orders.fetch(razorpay_order_id);

    const paymentRecord = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: order.amount || "",
      currency: "INR",
      status: isValid ? "success" : "failed",
    });

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: "Payment verified and stored ✅",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid signature ❌" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Verification failed", error: error.message },
      { status: 500 }
    );
  }
}
