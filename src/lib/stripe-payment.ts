import type Stripe from "stripe";
import { getStripe } from "./stripe";
import type { SafeCardMeta } from "./card-utils";

export interface StripePaymentContext {
  paymentIntentId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  cardMeta: SafeCardMeta | null;
  stripeCustomerId?: string;
}

function brandLabel(brand: string | undefined): string {
  if (!brand) return "Card";
  const map: Record<string, string> = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "Amex",
    discover: "Discover",
    diners: "Diners",
    jcb: "JCB",
    unionpay: "UnionPay",
  };
  return map[brand.toLowerCase()] || brand;
}

function cardMetaFromPaymentMethod(
  pm: Stripe.PaymentMethod | null | undefined
): SafeCardMeta | null {
  if (!pm?.card) return null;
  return {
    last4: pm.card.last4,
    brand: brandLabel(pm.card.brand),
    expMonth: String(pm.card.exp_month).padStart(2, "0"),
    expYear: String(pm.card.exp_year),
  };
}

export async function verifyStripePayment(
  paymentIntentId: string,
  expectedAmountCents: number
): Promise<StripePaymentContext> {
  const stripe = getStripe();
  const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["payment_method"],
  });

  if (pi.status !== "succeeded") {
    throw new Error(`Payment not completed (status: ${pi.status})`);
  }

  if (pi.amount !== expectedAmountCents) {
    throw new Error("Payment amount does not match donation amount");
  }

  const pm =
    typeof pi.payment_method === "string"
      ? await stripe.paymentMethods.retrieve(pi.payment_method)
      : pi.payment_method;

  return {
    paymentIntentId: pi.id,
    subscriptionId:
      typeof pi.metadata?.subscription_id === "string"
        ? pi.metadata.subscription_id
        : undefined,
    amount: pi.amount / 100,
    currency: pi.currency.toUpperCase(),
    cardMeta: cardMetaFromPaymentMethod(pm),
    stripeCustomerId:
      typeof pi.customer === "string" ? pi.customer : pi.customer?.id,
  };
}

export async function createOneTimePaymentIntent(params: {
  amountCents: number;
  email: string;
  name: string;
  organizationSlug: string;
  organizationName: string;
  frequency: "one-time" | "monthly";
}) {
  const stripe = getStripe();

  return stripe.paymentIntents.create({
    amount: params.amountCents,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    receipt_email: params.email,
    metadata: {
      organization_slug: params.organizationSlug,
      organization_name: params.organizationName,
      donor_name: params.name,
      frequency: params.frequency,
    },
  });
}

export async function createMonthlySubscriptionPayment(params: {
  amountCents: number;
  email: string;
  name: string;
  organizationSlug: string;
  organizationName: string;
}) {
  const stripe = getStripe();

  const customer = await stripe.customers.create({
    email: params.email,
    name: params.name,
    metadata: {
      organization_slug: params.organizationSlug,
    },
  });

  const product = await stripe.products.create({
    name: `Monthly donation — ${params.organizationName}`,
    metadata: { organization_slug: params.organizationSlug },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: params.amountCents,
    currency: "usd",
    recurring: { interval: "month" },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: price.id }],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
    },
    expand: ["latest_invoice.payment_intent"],
    metadata: {
      organization_slug: params.organizationSlug,
      organization_name: params.organizationName,
      donor_name: params.name,
      frequency: "monthly",
    },
  });

  type InvoiceWithPi = Stripe.Invoice & {
    payment_intent?: Stripe.PaymentIntent | string | null;
  };
  const invoice = subscription.latest_invoice as InvoiceWithPi | null;
  const pi =
    typeof invoice?.payment_intent === "object"
      ? invoice.payment_intent
      : null;

  if (!pi?.client_secret) {
    throw new Error("Unable to start monthly subscription payment");
  }

  await stripe.paymentIntents.update(pi.id, {
    metadata: {
      ...pi.metadata,
      subscription_id: subscription.id,
      organization_slug: params.organizationSlug,
      organization_name: params.organizationName,
      donor_name: params.name,
      frequency: "monthly",
    },
  });

  return {
    clientSecret: pi.client_secret,
    paymentIntentId: pi.id,
    subscriptionId: subscription.id,
    customerId: customer.id,
  };
}
