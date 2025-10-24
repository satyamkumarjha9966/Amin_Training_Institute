import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing and enrolling in courses at Amin Training Institute,
            you agree to be bound by these Terms and Conditions, all applicable
            laws and regulations, and agree that you are responsible for
            compliance with any applicable local laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Course Enrollment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Course enrollment is subject to availability and eligibility
              criteria
            </li>
            <li>Payment must be completed before course commencement</li>
            <li>
              Course materials are for personal use only and cannot be shared
            </li>
            <li>
              Students must maintain minimum attendance as per course
              requirements
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All fees must be paid in full before course commencement</li>
            <li>Payment plans, if available, must be strictly followed</li>
            <li>Late payment fees may be applicable</li>
            <li>All payment transactions are secured and encrypted</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Student Conduct</h2>
          <p className="mb-4">Students are expected to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain professional conduct during classes</li>
            <li>Respect instructors and fellow students</li>
            <li>Follow academic integrity guidelines</li>
            <li>Adhere to attendance policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            All course materials, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Course content and materials</li>
            <li>Videos and presentations</li>
            <li>Study guides and handouts</li>
            <li>Assessment materials</li>
          </ul>
          <p className="mt-4">
            are the intellectual property of Amin Training Institute and are
            protected by copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Privacy Policy</h2>
          <p>
            Your use of our services is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand our practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting on our website. Your continued
            use of our services constitutes acceptance of these modifications.
          </p>
        </section>
      </div>
    </div>
  );
}
