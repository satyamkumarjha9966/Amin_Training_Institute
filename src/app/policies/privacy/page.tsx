import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <div className="space-y-4">
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Personal identification information (Name, email address, phone
                number)
              </li>
              <li>Educational background and qualifications</li>
              <li>Payment information</li>
              <li>Course progress and performance data</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To process your course enrollments</li>
            <li>To communicate important course information</li>
            <li>To improve our services and user experience</li>
            <li>To process payments and refunds</li>
            <li>To maintain academic records</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal
            information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure SSL encryption for all data transmission</li>
            <li>Regular security audits and updates</li>
            <li>
              Limited access to personal information by authorized personnel
              only
            </li>
            <li>Secure data storage and backup systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Data Sharing</h2>
          <p className="mb-4">
            We do not share your personal information with third parties except:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>When required by law</li>
            <li>With your explicit consent</li>
            <li>With service providers who assist in our operations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Request corrections to your data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Cookies and Tracking
          </h2>
          <p>
            We use cookies and similar tracking technologies to improve your
            browsing experience on our website. You can control cookie settings
            through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact
            us through our contact form or reach out to our support team.
          </p>
        </section>
      </div>
    </div>
  );
}
