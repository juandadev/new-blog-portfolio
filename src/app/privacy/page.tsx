import React from 'react';
import Link from '@/components/ui/Link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – Juandadev',
  description:
    'Read how Juandadev uses Databuddy for privacy-focused analytics. Learn what information is collected, how it’s used, and how your privacy is protected.',
  keywords: [
    'privacy policy',
    'Databuddy analytics',
    'data privacy',
    'GDPR compliance',
    'web analytics',
    'user data protection',
    'Juandadev privacy',
  ],
  alternates: {
    canonical: 'https://juanda.dev/privacy',
  },
  openGraph: {
    title: 'Privacy Policy – Juandadev',
    description:
      'Juandadev uses Databuddy to track site performance while respecting your privacy. Transparent analytics, no intrusive tracking.',
    url: 'https://juanda.dev/privacy',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy – Juandadev',
    description:
      'How Juandadev collects and uses anonymous analytics through Databuddy while keeping your data private and secure.',
    creator: '@juandadotdev',
  },
} as const;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="space-y-8">
          <header className="border-border space-y-4 border-b pb-8">
            <h1 className="font-heading text-foreground text-4xl font-bold sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: October, 2025
            </p>
          </header>
          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This privacy policy explains how we collect, use, and protect your
              information when you visit our website. We are committed to
              protecting your privacy and being transparent about our data
              practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Analytics & Tracking
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use{' '}
              <Link
                className="hyperlink"
                href="https://www.databuddy.cc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Databuddy
              </Link>
              , a privacy-first, cookieless analytics service, to understand how
              visitors use our website. Databuddy is designed to be fully
              compliant with GDPR, CCPA, and other privacy regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              What We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Through Databuddy, we collect anonymous, aggregated data about
              website usage:
            </p>
            <ul className="text-muted-foreground ml-6 list-disc space-y-2">
              <li>Page URLs (without personal parameters)</li>
              <li>Referrer information (where you came from)</li>
              <li>Browser and device type</li>
              <li>Geographic region (country/city level only)</li>
              <li>Session duration and page views</li>
              <li>Custom events (button clicks, form submissions)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              What We Don&apos;t Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Importantly, we do{' '}
              <strong className="text-foreground">NOT</strong> collect:
            </p>
            <ul className="text-muted-foreground ml-6 list-disc space-y-2">
              <li>IP addresses</li>
              <li>Personal identifiers or user IDs</li>
              <li>Cookies or persistent tracking identifiers</li>
              <li>Cross-site tracking data</li>
              <li>Device fingerprints</li>
              <li>Personal information of any kind</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              No Cookies Required
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Databuddy uses a completely cookieless approach to analytics. This
              means:
            </p>
            <ul className="text-muted-foreground ml-6 list-disc space-y-2">
              <li>No consent banners are required</li>
              <li>No cookies are stored on your device</li>
              <li>No personal data is processed</li>
              <li>100% GDPR compliant by design</li>
              <li>Works even with ad blockers enabled</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              GDPR Compliance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our analytics setup is fully compliant with the General Data
              Protection Regulation (GDPR) because:
            </p>
            <ul className="text-muted-foreground ml-6 list-disc space-y-2">
              <li>We don&apos;t collect personal data as defined by GDPR</li>
              <li>All data is immediately anonymized and aggregated</li>
              <li>No consent is required for anonymous analytics</li>
              <li>Data is processed within privacy-safe boundaries</li>
              <li>No data transfers to third parties for advertising</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Data Storage & Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All analytics data is:
            </p>
            <ul className="text-muted-foreground ml-6 list-disc space-y-2">
              <li>Stored securely on Databuddy&apos;s servers</li>
              <li>Encrypted in transit and at rest</li>
              <li>Automatically anonymized at collection</li>
              <li>Retained only as long as necessary for analytics purposes</li>
              <li>Never sold or shared with third parties</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Since we don&apos;t collect personal data, most data subject
              rights under GDPR don&apos;t apply. However, you have the right
              to:
            </p>
            <ul className="text-muted-foreground ml-6 list-disc space-y-2">
              <li>Know what data is being collected (outlined above)</li>
              <li>Contact us with questions about our data practices</li>
              <li>Request information about our analytics setup</li>
              <li>Opt-out of analytics by using browser privacy features</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Apart from Databuddy for analytics, we may use other third-party
              services for website functionality. Any such services are
              carefully selected to respect user privacy and comply with
              applicable regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated &quot;Last
              updated&quot; date. We encourage you to review this policy
              periodically.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or our data
              practices, please contact us at:
            </p>
            <div className="border-border bg-muted/50 rounded-lg border p-4">
              <p className="text-foreground">
                Email:{' '}
                <a
                  href="mailto:juanda.martinezn@gmail.com"
                  className="text-primary hover:underline"
                >
                  juanda.martinezn@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-foreground text-2xl font-semibold">
              Learn More About Databuddy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For more information about Databuddy&apos;s privacy practices and
              cookieless analytics approach, visit:
            </p>
            <ul className="text-muted-foreground ml-6 list-disc space-y-2">
              <li>
                <a
                  href="https://www.databuddy.cc/docs/compliance/gdpr-compliance-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Databuddy GDPR Compliance Guide
                </a>
              </li>
              <li>
                <a
                  href="https://www.databuddy.cc/docs/privacy/cookieless-analytics-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Databuddy Cookieless Analytics Guide
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
