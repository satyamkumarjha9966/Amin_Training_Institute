import React from "react";

export default function CancellationRefundsPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Cancellation & Refunds Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Course Cancellation
          </h2>
          <p className="mb-4">
            Students may request a cancellation of their course enrollment under
            the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Cancellation requests must be submitted within 7 days of
              enrollment
            </li>
            <li>
              Cancellation before course commencement: Full refund minus
              processing fees
            </li>
            <li>
              Cancellation after course commencement: Pro-rata refund based on
              attended classes
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Refund Process</h2>
          <p className="mb-4">
            All approved refunds will be processed within 7-10 business days
            through the original payment method:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Online payment refunds will be credited back to the original
              payment source
            </li>
            <li>Processing fees are non-refundable</li>
            <li>
              Bank charges for refund processing may be deducted from the refund
              amount
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. Non-Refundable Items
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Registration fees</li>
            <li>Study materials already provided</li>
            <li>Processing fees</li>
            <li>Services already rendered</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. How to Request a Refund
          </h2>
          <p className="mb-4">
            To request a refund, please follow these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Contact our support team through the contact form</li>
            <li>Provide your enrollment details and reason for cancellation</li>
            <li>Fill out the refund request form (if applicable)</li>
            <li>Wait for confirmation email regarding your refund status</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Special Circumstances
          </h2>
          <p>
            We understand that special circumstances may arise. Please contact
            our support team for any specific cases not covered in this policy.
            Each case will be reviewed individually, and decisions will be made
            at the discretion of the management.
          </p>
        </section>
      </div>
    </div>
  );
}
