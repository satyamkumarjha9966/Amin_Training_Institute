import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Shipping & Delivery Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Digital Content Delivery
          </h2>
          <p className="mb-4">
            For digital course materials and online content:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Immediate access after successful payment</li>
            <li>Access through student portal/dashboard</li>
            <li>Download links sent via email when applicable</li>
            <li>24/7 access to online materials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Physical Study Materials
          </h2>
          <p className="mb-4">
            For physical course materials, books, and study guides:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processing time: 1-2 business days</li>
            <li>Standard delivery: 3-5 business days</li>
            <li>Express delivery available on request</li>
            <li>Free delivery within city limits</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Shipping Areas</h2>
          <p className="mb-4">We currently deliver to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All major cities in India</li>
            <li>Remote locations (additional delivery time may apply)</li>
            <li>International shipping available for select materials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Tracking Orders</h2>
          <p className="mb-4">Track your physical material delivery:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tracking information sent via email</li>
            <li>Track through student portal</li>
            <li>Customer support assistance for tracking queries</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Damaged or Lost Items
          </h2>
          <p className="mb-4">In case of damaged or lost materials:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Report within 48 hours of delivery</li>
            <li>Replacement for damaged items</li>
            <li>Investigation for lost packages</li>
            <li>Photo evidence may be required for damaged items</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Contact Information
          </h2>
          <p>
            For any shipping-related queries or concerns, please contact our
            support team through the contact form or reach out to our dedicated
            shipping support line.
          </p>
        </section>
      </div>
    </div>
  );
}
