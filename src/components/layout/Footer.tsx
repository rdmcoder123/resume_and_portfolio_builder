import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-border bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Resumify</h3>
            <p className="text-sm text-muted-foreground">
              Build beautiful resumes and portfolios, and showcase your professional achievements.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <nav className="flex flex-col gap-2">
              <h4 className="text-base font-medium">Product</h4>
              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground">
                Templates
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </nav>
            <nav className="flex flex-col gap-2">
              <h4 className="text-base font-medium">Company</h4>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-medium">Subscribe to our newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest features and releases.
            </p>
            <form className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
                required
              />
              <button className="btn btn-primary" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Resumify. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}