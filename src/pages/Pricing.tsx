import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackToHome from '../components/BackToHome';

export default function Pricing() {
  useEffect(() => {
    document.title = 'Pricing - Resumify';
  }, []);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Create 1 resume',
        'Basic templates',
        'PDF export',
        'Cloud storage',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/month',
      description: 'Best for professionals',
      features: [
        'Unlimited resumes',
        'All resume templates',
        'Create 1 portfolio',
        'Priority support',
        'Remove watermark',
        'Custom domain',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Business',
      price: '$29',
      period: '/month',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Unlimited portfolios',
        'Team collaboration',
        'Analytics dashboard',
        'API access',
        'Dedicated support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <BackToHome />
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card p-8 relative ${
                plan.popular ? 'border-primary-foreground shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-primary-foreground text-white text-sm rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary-foreground" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`btn w-full ${
                  plan.popular ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid gap-6">
            <div className="card p-6 text-left">
              <h3 className="font-semibold mb-2">Can I cancel my subscription?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your billing period.
              </p>
            </div>
            <div className="card p-6 text-left">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.
              </p>
            </div>
            <div className="card p-6 text-left">
              <h3 className="font-semibold mb-2">Can I switch plans?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. The change will be prorated based on your remaining subscription period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}