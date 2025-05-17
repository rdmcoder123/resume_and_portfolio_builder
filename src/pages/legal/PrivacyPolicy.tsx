import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy - Resumify';
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
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-muted-foreground">Last updated: March 17, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>
              At Resumify, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Profile information you provide</li>
              <li>Resume and portfolio content</li>
              <li>Usage data and analytics</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To improve user experience</li>
              <li>To communicate with you</li>
              <li>To ensure security of our platform</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information.
              Contact us at akashseenuoffficial@gmail.com for assistance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of any changes by
              posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
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