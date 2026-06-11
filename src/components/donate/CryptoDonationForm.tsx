"use client";

import { useState } from "react";
import { Bitcoin, Copy, Check, Loader2 } from "lucide-react";
import { cryptoWallets, siteConfig } from "@/lib/config";
import type { Organization } from "@/lib/organizations";
import { truncateAddress } from "@/lib/utils";

interface CryptoDonationFormProps {
  organization: Organization;
}

export default function CryptoDonationForm({
  organization,
}: CryptoDonationFormProps) {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoWallets[0]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    referenceId: string;
    message: string;
    estimatedSettlement?: string;
  } | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    estimatedValue: "",
    txHash: "",
  });

  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/donations/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "crypto",
          donor: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
          },
          details: {
            organizationSlug: organization.slug,
            organizationName: organization.name,
            asset: selectedCrypto.symbol,
            network: selectedCrypto.network,
            walletAddress: selectedCrypto.address,
            estimatedUsdValue: form.estimatedValue,
            transactionHash: form.txHash,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess({
        referenceId: data.referenceId,
        message: data.message,
        estimatedSettlement: data.estimatedSettlement,
      });
    } catch {
      alert("Unable to submit. Please email us with your transaction details.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <Check className="mx-auto mb-4 h-16 w-16 text-green-600" />
        <h2 className="mb-2 text-2xl font-bold text-green-900">Thank You!</h2>
        <p className="mb-2 text-green-700">{success.message}</p>
        <p className="text-sm text-navy-600">Reference: {success.referenceId}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gold-200 bg-gold-50/50 p-4">
        <p className="text-sm font-semibold text-navy-900">
          Auto-convert to cash on receipt
        </p>
        <p className="mt-1 text-sm text-navy-600">
          Like{" "}
          <a
            href="https://thegivingblock.com/crypto-donations/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-600 underline"
          >
            The Giving Block
          </a>
          , crypto gifts are liquidated to USD automatically—24/7—so we never hold
          volatile assets.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-navy-950">
          1. Select cryptocurrency
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cryptoWallets.map((wallet) => (
            <button
              key={wallet.symbol}
              type="button"
              onClick={() => setSelectedCrypto(wallet)}
              className={`rounded-xl border-2 p-4 text-center transition-all ${
                selectedCrypto.symbol === wallet.symbol
                  ? "border-gold-500 bg-gold-50"
                  : "border-navy-100 hover:border-navy-200"
              }`}
            >
              <div
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: wallet.color }}
              >
                {wallet.symbol.charAt(0)}
              </div>
              <p className="text-sm font-bold text-navy-950">{wallet.name}</p>
              <p className="text-xs text-navy-500">{wallet.symbol}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 md:p-8">
        <h3 className="mb-4 text-lg font-bold text-navy-950">
          2. Send to our wallet
        </h3>
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-navy-950 sm:h-48 sm:w-48">
              <div className="text-center">
                <Bitcoin className="mx-auto mb-2 h-10 w-10 text-gold-400" />
                <p className="text-xs text-navy-300">Scan with wallet app</p>
                <p className="mt-1 text-[10px] text-navy-500">
                  {selectedCrypto.symbol} · {selectedCrypto.network}
                </p>
              </div>
            </div>
          </div>
        </div>
        <label className="mb-2 block text-sm font-semibold text-navy-800">
          Wallet address
        </label>
        <div className="flex items-center gap-2">
          <code className="flex-1 overflow-hidden rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800">
            <span className="hidden sm:inline">{selectedCrypto.address}</span>
            <span className="sm:hidden">
              {truncateAddress(selectedCrypto.address, 12)}
            </span>
          </code>
          <button
            type="button"
            onClick={() => copyAddress(selectedCrypto.address)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-white hover:bg-navy-800"
            aria-label="Copy address"
          >
            {copiedAddress === selectedCrypto.address ? (
              <Check className="h-5 w-5 text-green-400" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleNotify} className="space-y-4">
        <h3 className="text-lg font-bold text-navy-950">
          3. Confirm donation (for receipt & auto-conversion)
        </h3>
        <p className="text-sm text-navy-600">
          After sending, complete this form so we can issue your tax receipt and
          track instant USD conversion.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="First name *"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="rounded-lg border border-navy-200 px-4 py-2.5"
          />
          <input
            required
            placeholder="Last name *"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="rounded-lg border border-navy-200 px-4 py-2.5"
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email for tax receipt *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <input
          placeholder="Estimated USD value (optional)"
          value={form.estimatedValue}
          onChange={(e) => setForm({ ...form, estimatedValue: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <input
          placeholder="Transaction hash (after you send)"
          value={form.txHash}
          onChange={(e) => setForm({ ...form, txHash: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Submit for Tax Receipt & Cash Conversion"
          )}
        </button>
      </form>

      <p className="text-xs text-navy-500">
        Only send {selectedCrypto.symbol} on {selectedCrypto.network}. Questions:{" "}
        {siteConfig.email}
      </p>
    </div>
  );
}
