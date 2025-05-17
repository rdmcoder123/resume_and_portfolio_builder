import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import BackToHome from '../components/BackToHome';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us - Resumify';
  }, []);

  return (
    <div className="min-h-screen bg-background py-20">
      <BackToHome />
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="rounded-full bg-primary p-4 w-fit mx-auto mb-6">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions or need assistance? We're here to help!
          </p>

          <div className="card p-8">
            <p className="text-lg mb-6">
              Email us at:
            </p>
            <a 
              href="mailto:dhatshinaklu@gmail.com"
              className="text-xl text-primary-foreground hover:underline"
            >
              dhatshinaklu@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}