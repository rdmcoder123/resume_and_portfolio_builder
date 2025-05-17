import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms of Service - Resumify';
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
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-muted-foreground">Last updated: March 17, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Resumify, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p>
              Resumify provides tools for creating and managing professional resumes and portfolios.
              We reserve the right to modify or discontinue the service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must notify us of any unauthorized account use</li>
              <li>We may terminate accounts that violate our terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
            <p>
              You retain ownership of content you create. By using our service, you grant us license
              to host and display your content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violating laws or regulations</li>
              <li>Impersonating others</li>
              <li>Distributing malware</li>
              <li>Interfering with service operation</li>
              <li>Automated access without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
            <p>
              Paid services are billed in advance. Refunds are handled according to our refund policy.
              We may change pricing with notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend access to our service immediately, without prior notice,
              for conduct that violates these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              We are not liable for indirect, incidental, special, or consequential damages
              resulting from your use of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p>
              Questions about these Terms should be sent to{' '}
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