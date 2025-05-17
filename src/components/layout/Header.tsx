import { Link, useNavigate } from 'react-router-dom';
import { FileText, Briefcase, User, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

export default function Header() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary-foreground" />
          <span className="font-bold text-xl">Resumify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary-foreground">
                Dashboard
              </Link>
              <Link to="/resume" className="text-sm font-medium transition-colors hover:text-primary-foreground">
                Resume Builder
              </Link>
              <Link to="/portfolio" className="text-sm font-medium transition-colors hover:text-primary-foreground">
                Portfolio Builder
              </Link>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary-foreground">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-muted"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Mobile menu button */}
          <button
            className="flex md:hidden rounded-full p-2 transition-colors hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-x-0 top-16 z-50 bg-background border-b border-border/40 md:hidden transition-all duration-200 ease-in-out transform",
        mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <nav className="container flex flex-col gap-4 px-4 py-6">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                Dashboard
              </Link>
              <Link 
                to="/resume" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                Resume Builder
              </Link>
              <Link 
                to="/portfolio" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase className="h-5 w-5" />
                Portfolio Builder
              </Link>
              <button 
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-left"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}