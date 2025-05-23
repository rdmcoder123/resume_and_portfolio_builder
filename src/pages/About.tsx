import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackToHome from '../components/BackToHome';

export default function About() {
  useEffect(() => {
    document.title = 'About Us - Resumify';
  }, []);

  return (
    <div className="min-h-screen bg-background py-20">
      <BackToHome />
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">About Resumify</h1>
          
          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-6">
              Resumify is a powerful platform designed to help professionals create stunning resumes
              and portfolios that stand out in today's competitive job market. Our mission is to
              empower individuals to showcase their skills and achievements effectively.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Team</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="card p-6 text-center">
                  <h3 className="font-semibold mb-2">DHATSHINAMOORTHY R</h3>
                  <p className="text-muted-foreground">Tech Lead</p>
                </div>
              <div className="card p-6 text-center">
                <h3 className="font-semibold mb-2">AKASH T</h3>
                <p className="text-muted-foreground">Backend Developer</p>
              </div>
              
              <div className="card p-6 text-center">
                <h3 className="font-semibold mb-2">PRAKASH S</h3>
                <p className="text-muted-foreground">Frontend Developer</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              Have questions or need assistance? Feel free to reach out to us at:
            </p>
            <a 
              href="mailto:dhatshinaklu@gmail.com"
              className="text-primary-foreground hover:underline"
            >
              dhatshinaklu@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
