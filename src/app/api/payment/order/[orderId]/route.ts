import { connectDB } from "@/lib/db";
import Payment, { IPayment } from "../../../../../../models/paymentModel";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: {orderId: string}}) {
    try {
        const { orderId } = params;

        await connectDB();

        const payment = await Payment.findOne({ razorpay_order_id: orderId }).lean<IPayment>();

    if (!payment) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(payment);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}