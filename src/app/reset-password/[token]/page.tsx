"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  params: {
    token: string;
  };
};

const ResetPasswordPage: React.FC<Props> = ({ params }) => {
  const { token } = params;
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!password) {
      setError("Please enter a new password.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to reset password");
      }

      setMessage(
        "Password has been reset. You can now sign in with your new password."
      );
      // redirect to sign in after short delay
      setTimeout(() => router.push("/signin"), 1500);
    } catch (err: any) {
      setError(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Reset password</h2>

        {message && (
          <div className="bg-green-50 text-green-700 border border-green-200 p-2 rounded mb-3 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium">New password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border rounded p-2 mt-1 text-sm"
              type="password"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm password</label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="block w-full border rounded p-2 mt-1 text-sm"
              type="password"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
            <Link
              href="/signin"
              className="text-sm text-gray-600 hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
