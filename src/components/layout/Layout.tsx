import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';

export default function Layout() {
  const { user } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Don't show footer on auth pages or when logged in */}
      {!isAuthPage && !user && <Footer />}
    </div>
  );
}