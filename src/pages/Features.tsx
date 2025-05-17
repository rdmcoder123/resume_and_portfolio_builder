import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Download, Globe, Clock, Shield, Palette, Layout, Sparkles } from 'lucide-react';
import BackToHome from '../components/BackToHome';

export default function Features() {
  useEffect(() => {
    document.title = 'Features - Resumify';
  }, []);

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Professional Resume Builder',
      description: 'Create polished resumes with our intuitive builder. Choose from multiple templates and customize every detail.',
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Portfolio Creator',
      description: 'Showcase your work with a beautiful portfolio website. Add projects, skills, and testimonials effortlessly.',
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'Multiple Templates',
      description: 'Choose from a variety of professionally designed templates for both resumes and portfolios.',
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: 'Customizable Sections',
      description: 'Add, remove, and rearrange sections to create the perfect layout for your content.',
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: 'PDF Export',
      description: 'Download your resume as a professional PDF file, ready to share with potential employers.',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'One-Click Publishing',
      description: 'Publish your portfolio online instantly and share it with the world.',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Auto-Save',
      description: 'Never lose your work with automatic saving as you type.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Storage',
      description: 'Your data is encrypted and safely stored in the cloud.',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Regular Updates',
      description: 'We continuously add new features and templates to keep your content fresh and modern.',
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
          <h1 className="text-4xl font-bold mb-4">Powerful Features for Professionals</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to create stunning resumes and portfolios that get you noticed.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="rounded-full bg-primary p-3 w-fit mb-4">
                <div className="text-primary-foreground">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}