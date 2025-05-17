import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Download, Globe, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  useEffect(() => {
    document.title = 'Resumify - Create Beautiful Resumes & Portfolios';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-primary/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Build Your Career Presence in Minutes
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Create stunning resumes and portfolios that stand out, save them securely, and easily share them with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/register" className="btn btn-primary">
                  Get Started — It's Free
                </Link>
                <Link to="/examples" className="btn btn-outline">
                  See Examples
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="relative lg:ml-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Resume and portfolio builder dashboard"
                className="mx-auto rounded-lg shadow-2xl border border-border/50"
                width="600"
                height="400"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Professionals</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              All the tools you need to build your personal brand and showcase your talent.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-primary-foreground" />}
              title="Resume Builder"
              description="Create professional resumes with customizable sections, modern templates, and real-time preview."
            />
            <FeatureCard 
              icon={<Briefcase className="h-10 w-10 text-primary-foreground" />}
              title="Portfolio Builder"
              description="Showcase your work with a beautiful portfolio website, complete with project details and images."
            />
            <FeatureCard 
              icon={<Download className="h-10 w-10 text-primary-foreground" />}
              title="PDF Export"
              description="Export your resume as a PDF file to easily share with potential employers."
            />
            <FeatureCard 
              icon={<Globe className="h-10 w-10 text-primary-foreground" />}
              title="Publish Online"
              description="Publish your portfolio with one click and share it with the world using your personalized domain."
            />
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-primary-foreground" />}
              title="Auto-Save"
              description="Never lose your work with real-time autosaving that stores your progress as you type."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary-foreground" />}
              title="Secure Storage"
              description="Your data is always safe and secure with encrypted storage and regular backups."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              See what our users are saying about their experience with Resumify.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard 
              quote="Resumify helped me create a standout resume that landed me my dream job in tech. The templates are modern and the interface is intuitive."
              author="Alex Johnson"
              role="Software Engineer"
              avatarUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard 
              quote="The portfolio builder is amazing. I was able to showcase my design work beautifully and got multiple freelance opportunities as a result!"
              author="Sarah Chen"
              role="UX Designer"
              avatarUrl="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard 
              quote="As a freelancer, having a professional portfolio is essential. Resumify made it incredibly easy to create one that truly represents my work."
              author="Michael Torres"
              role="Freelance Developer"
              avatarUrl="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-foreground text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Professional Presence?</h2>
          <p className="text-primary/90 max-w-[800px] mx-auto mb-8">
            Join thousands of professionals who have boosted their careers with Resumify.
            Get started for free today!
          </p>
          <Link to="/register" className="btn bg-white text-primary-foreground hover:bg-white/90">
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      className="card p-6 flex flex-col items-center text-center"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-full bg-primary p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
  return (
    <motion.div 
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4">
        <p className="italic text-muted-foreground">"{quote}"</p>
        <div className="flex items-center gap-4 mt-4">
          <img 
            src={avatarUrl} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}