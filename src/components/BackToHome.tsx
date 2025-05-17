import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BackToHome() {
  return (
    <Link to="/" className="back-to-home" aria-label="Back to Home">
      <Home className="h-5 w-5" />
    </Link>
  );
}