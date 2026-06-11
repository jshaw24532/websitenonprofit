"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-4 sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-4 h-12 w-12 text-gold-500" />
          <h1 className="text-2xl font-bold text-navy-950">Admin Portal</h1>
          <p className="mt-2 text-sm text-navy-600">
            Donations management &amp; donor communications
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-navy-200 px-4 py-3"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-navy-200 px-4 py-3"
          />
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-navy-400">
          Default: admin@on3rdoutreach.org / Admin@2026!
        </p>
      </div>
    </div>
  );
}
