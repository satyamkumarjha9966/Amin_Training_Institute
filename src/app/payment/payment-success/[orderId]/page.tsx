"use client";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/* ---------- Types ---------- */
interface Donor {
  name?: string;
  email?: string;
  phone?: string;
}

interface PaymentData {
  amount: number;
  status: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  createdAt: string;
  donor?: Donor;
}

interface State {
  loading: boolean;
  error: string;
  data: PaymentData | null;
}

/* ---------- Component ---------- */
export default function ThankYou() {
  const { orderId } = useParams<{ orderId: string }>();
  const [state, setState] = useState<State>({ loading: true, error: "", data: null });

  useEffect(() => {
    let ignore = false;

    async function fetchPayment() {
      if (!orderId) {
        setState({ loading: false, error: "Missing order_id", data: null });
        return;
      }
      try {
        const res = await fetch(`api/payment/order/${orderId}`);
        if (!res.ok) throw new Error("Network error");
        const data: PaymentData = await res.json();
        if (!ignore) setState({ loading: false, error: "", data });
      } catch {
        if (!ignore)
          setState({ loading: false, error: "Could not load receipt", data: null });
      }
    }

    fetchPayment();
    return () => {
      ignore = true;
    };
  }, [orderId]);

  if (state.loading)
    return (
      <Screen>
        <div className="w-full max-w-3xl text-center rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-xl">
          <p className="text-slate-600">Loading your receipt…</p>
        </div>
      </Screen>
    );

  if (state.error)
    return (
      <Screen>
        <div className="w-full max-w-3xl text-center rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-xl">
          <p className="text-rose-600">{state.error}</p>
          <div className="mt-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-slate-800 hover:bg-slate-50"
            >
              Back to payments
            </Link>
          </div>
        </div>
      </Screen>
    );

  const p = state.data!;
  const amountInRupees = (p.amount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return (
    <Screen>
      <div className="w-full max-w-5xl rounded-[22px] border border-black/10 bg-white/75 shadow-2xl backdrop-blur p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start gap-4">
          <IconCircle tone="success" />
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Payment Successful</h1>
            <p className="mt-1 text-slate-500">
              Thank you for your support! Your payment has been processed.
            </p>
          </div>
        </div>

        {/* Details panel */}
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300/70 bg-white/60 p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            <KV label="Amount" value={amountInRupees} />
            <KV label="Status" value={p.status} />
            <KV label="Payment ID" value={p.razorpay_payment_id} copy />
            <KV label="Order ID" value={p.razorpay_order_id} copy />
            <KV label="Name" value={p?.donor?.name || "-"} />
            <KV label="Email" value={p?.donor?.email || "-"} />
            <KV label="Phone" value={p?.donor?.phone || "-"} />
            <KV label="Date" value={new Date(p.createdAt).toLocaleString()} />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* <a
            href={`${import.meta.env.VITE_API_URL}/receipt/${p.razorpay_order_id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#483A31] px-4 py-2 text-white shadow-md hover:brightness-110 active:brightness-95"
          >
            Download Receipt (PDF)
          </a> */}

          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300/80 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Print
          </button>

          <Link
            to="/donate"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300/80 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Make Another Donation
          </Link>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- Helpers (Tailwind only) ---------- */

interface ScreenProps {
  children: React.ReactNode;
}

function Screen({ children }: ScreenProps) {
  return (
    <div className="relative min-h-screen text-slate-900 bg-gradient-to-b from-[#f1f4fb] to-[#f7f9fc]">
      {/* soft purple glows like the screenshot */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[-12%] top-[-14%] h-[520px] w-[920px] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 40% at 30% 30%, rgba(92,95,179,0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-10%] top-[-8%] h-[420px] w-[760px] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 40% at 70% 30%, rgba(112,116,197,0.25), transparent 70%)",
          }}
        />
      </div>

      <div className="grid min-h-screen place-items-center px-5 py-10">
        {children}
      </div>
    </div>
  );
}

interface KVProps {
  label: string;
  value: string | number;
  copy?: boolean;
}

function KV({ label, value, copy }: KVProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-2">
      <div className="text-slate-500">{label}</div>
      <div className="flex items-center gap-2 text-slate-800">
        <span className="truncate">{value}</span>
        {copy ? <CopyButton text={String(value)} ariaLabel={`Copy ${label}`} /> : null}
      </div>
    </div>
  );
}

interface CopyButtonProps {
  text: string;
  ariaLabel: string;
}

function CopyButton({ text, ariaLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore copy errors
    }
  }

  return (
    <button
      onClick={onCopy}
      aria-label={ariaLabel}
      title="Copy"
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-500 hover:bg-slate-50"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-emerald-600" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </button>
  );
}

interface IconCircleProps {
  tone?: "success" | "error";
}

function IconCircle({ tone = "success" }: IconCircleProps) {
  const toneClasses =
    tone === "success"
      ? "bg-emerald-50 ring-emerald-200 text-emerald-600"
      : "bg-rose-50 ring-rose-200 text-rose-600";
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full ring-2 ${toneClasses}`}
    >
      <CheckIcon className="h-6 w-6" />
    </div>
  );
}

interface IconProps {
  className?: string;
}

function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="none">
      <path
        d="M20 7L9 18l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      />
    </svg>
  );
}
