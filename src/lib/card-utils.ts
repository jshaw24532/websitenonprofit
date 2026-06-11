/**
 * PCI-DSS: never persist full PAN or CVV. Only last4, brand, and expiry are stored.
 * Production should use Stripe Elements / tokenization.
 */

export function detectCardBrand(number: string): string {
  const n = number.replace(/\D/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^6(?:011|5)/.test(n)) return "Discover";
  return "Card";
}

export function maskCardNumber(number: string): string {
  const digits = number.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  return `**** **** **** ${last4}`;
}

export function parseExpiry(exp: string): { month: string; year: string } | null {
  const cleaned = exp.replace(/\s/g, "");
  const match = cleaned.match(/^(\d{2})\/?(\d{2,4})$/);
  if (!match) return null;
  let year = match[2];
  if (year.length === 2) year = `20${year}`;
  return { month: match[1], year };
}

export interface SafeCardMeta {
  last4: string;
  brand: string;
  expMonth: string;
  expYear: string;
}

export function toSafeCardMeta(
  cardNumber: string,
  expiry: string
): SafeCardMeta | null {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13) return null;
  const exp = parseExpiry(expiry);
  if (!exp) return null;
  return {
    last4: digits.slice(-4),
    brand: detectCardBrand(digits),
    expMonth: exp.month,
    expYear: exp.year,
  };
}
