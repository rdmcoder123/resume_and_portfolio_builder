import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found - Resumify';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-primary-foreground">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link to="/" className="btn btn-primary flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}