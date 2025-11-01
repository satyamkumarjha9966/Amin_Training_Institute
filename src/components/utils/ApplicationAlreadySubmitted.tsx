"use client";

import Link from "next/link";

export function ApplicationAlreadySubmitted() {
  return (
    <div className="text-center py-10">
      <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Application Submitted Successfully!
      </h2>
      <p className="text-gray-600 mb-6">
        Your application has been received and is being processed.
      </p>
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            You can check your application status and download the
            acknowledgment slip from your profile page.
          </p>
        </div>
        <Link
          href="/enroll"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Go to Student Zone
        </Link>
      </div>
    </div>
  );
}
