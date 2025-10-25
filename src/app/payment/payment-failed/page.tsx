import React from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

/* ---------- Component ---------- */
export default function PaymentFailed(): JSX.Element {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");
  const reason = params.get("reason");
  const navigate = useNavigate();

  return (
    <Screen>
      <div className="w-full max-w-5xl rounded-[22px] border border-black/10 bg-white/80 backdrop-blur shadow-2xl p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start gap-4">
          <IconCircle tone="danger" />
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Payment Failed</h1>
            <p className="mt-1 text-slate-500">
              We couldn’t complete your transaction.{" "}
              {reason ? `Reason: ${reason}` : "Please try again."}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300/70 bg-white/60 p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            {orderId && <KV label="Order ID" value={orderId} />}
            <KV
              label="Tip"
              value="If money was deducted, it will be auto-refunded by the provider."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/donate", { replace: true })}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-white shadow-md
                       bg-[#483A31] hover:brightness-110 active:brightness-95"
          >
            Try Again
          </button>

          <Link
            to="/donate"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300/80 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Back to payments
          </Link>

          <a
            href="mailto:support@yourdomain.com?subject=Payment%20help"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300/80 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Contact Support
          </a>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- Helpers (Tailwind only) ---------- */

interface ScreenProps {
  children: React.ReactNode;
}

function Screen({ children }: ScreenProps): JSX.Element {
  return (
    <div className="relative min-h-screen text-slate-900 bg-gradient-to-b from-[#f4f5f2] to-[#faf9f7]">
      {/* subtle glows (danger + coffee) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[-12%] top-[-14%] h-[520px] w-[920px] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 40% at 30% 30%, rgba(239,68,68,0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-10%] top-[-8%] h-[420px] w-[760px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 40% at 70% 30%, rgba(72,58,49,0.22), transparent 70%)",
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
  value: string;
}

function KV({ label, value }: KVProps): JSX.Element {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-2">
      <div className="text-slate-500">{label}</div>
      <div className="text-slate-800">{value}</div>
    </div>
  );
}

interface IconCircleProps {
  tone?: "danger" | "success";
}

function IconCircle({ tone = "danger" }: IconCircleProps): JSX.Element {
  const toneClasses =
    tone === "danger"
      ? "bg-rose-50 ring-rose-200 text-rose-600"
      : "bg-emerald-50 ring-emerald-200 text-emerald-600";
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full ring-2 ${toneClasses}`}
    >
      <XIcon className="h-6 w-6" />
    </div>
  );
}

interface IconProps {
  className?: string;
}

function XIcon({ className = "" }: IconProps): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
