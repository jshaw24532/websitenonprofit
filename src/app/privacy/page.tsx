import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="section-padding bg-white">
        <div className="container-wide prose-content max-w-3xl">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and safeguard your information when you visit our
            website or make a donation.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address,
            phone number, and payment information when you donate, volunteer, or
            contact us.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            We use your information to process donations, send tax receipts,
            communicate about our programs, and improve our services.
          </p>
          <h2>Contact Us</h2>
          <p>
            For privacy-related questions, contact us at {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  );
}
