import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackToHome from '../components/BackToHome';

export default function Templates() {
  useEffect(() => {
    document.title = 'Templates - Resumify';
  }, []);

  const resumeTemplates = [
    {
      name: 'Professional',
      description: 'A clean, traditional template perfect for job applications in corporate settings.',
      image: 'https://images.pexels.com/photos/3760093/pexels-photo-3760093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Modern',
      description: 'A contemporary design with sidebar for skills and education.',
      image: 'https://images.pexels.com/photos/4195324/pexels-photo-4195324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Minimal',
      description: 'A simple, elegant layout focusing on content with minimal styling.',
      image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const portfolioTemplates = [
    {
      name: 'Modern',
      description: 'A clean, professional design with a light background and blue accents.',
      image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Minimalist',
      description: 'A simple, elegant design focusing on content with minimal styling.',
      image: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Creative',
      description: 'A bold, colorful design with a dark background and vibrant gradient accents.',
      image: 'https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
          <h1 className="text-4xl font-bold mb-4">Beautiful Templates</h1>
          <p className="text-xl text-muted-foreground">
            Choose from our collection of professionally designed templates for resumes and portfolios.
          </p>
        </motion.div>

        <div className="space-y-20">
          {/* Resume Templates */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Resume Templates</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resumeTemplates.map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card overflow-hidden"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg">{template.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    <Link to="/resume" className="btn btn-primary w-full">
                      Use Template
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Portfolio Templates */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Portfolio Templates</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {portfolioTemplates.map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card overflow-hidden"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg">{template.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    <Link to="/portfolio" className="btn btn-primary w-full">
                      Use Template
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}