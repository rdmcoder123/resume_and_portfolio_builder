import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
  useEffect(() => {
    document.title = 'Cookie Policy - Resumify';
  }, []);

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto prose"
        >
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <p className="text-muted-foreground">Last updated: March 17, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when
              you visit our website. They help us make your experience better.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authentication and security</li>
              <li>Preferences and settings</li>
              <li>Analytics and performance</li>
              <li>Feature functionality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibol

d mb-4">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for basic site functionality
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and choices
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how you use our site
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Track your activity across websites
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delete all cookies</li>
              <li>Block cookies from being set</li>
              <li>Allow only certain cookies</li>
              <li>Browse in private/incognito mode</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages.
              We do not control these cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any
              changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about our Cookie Policy, please contact us at{' '}
              <a 
                href="mailto:dhatshinaklu@gmail.com"
                className="text-primary-foreground hover:underline"
              >
                dhatshinaklu@gmail.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}