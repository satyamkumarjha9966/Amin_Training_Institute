"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButtonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Optional: Check script load status
    if (window.Razorpay) setRazorpayLoaded(true);
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK not yet loaded. Please wait a moment.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order from backend
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1 }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Order creation failed");

      const order = data.order;

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Amin Training Center",
        description: "Fee Payment",
        order_id: order.id,
        handler: async (response: any) => {
          // 3️⃣ Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          alert(verifyData.message);

          // if (verifyRes.ok) {
          //   router.push(`/payment/payment-success/${verifyData.razorpay_order_id}`)
          // } else {
          //   router.push(`/payment/payment-failed/${verifyData.razorpay_order_id}`)
          // }
        },
        prefill: {
          name: "Shivam Jha",
          email: "shivam@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error(error);
      alert("Payment failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-5">
      <h1 className="text-2xl font-bold">💳 Razorpay Pay Now Button</h1>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay ₹1"}
      </button>

      {/* ✅ Proper way to load Razorpay script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />
    </main>
  );
}
