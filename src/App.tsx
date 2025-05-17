import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import Loading from './components/common/Loading';

// Lazy-loaded pages
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const ResumeBuilder = lazy(() => import('./pages/resume/ResumeBuilder'));
const PortfolioBuilder = lazy(() => import('./pages/portfolio/PortfolioBuilder'));
const Features = lazy(() => import('./pages/Features'));
const Templates = lazy(() => import('./pages/Templates'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Landing />} />
          <Route path="login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
          <Route path="register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />
          <Route path="features" element={<Features />} />
          <Route path="templates" element={<Templates />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Navigate to="/" replace />} />
          
          {/* Legal routes */}
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookies" element={<CookiePolicy />} />
          
          {/* Protected routes */}
          <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="resume/:id?" element={user ? <ResumeBuilder /> : <Navigate to="/login" replace />} />
          <Route path="portfolio/:id?" element={user ? <PortfolioBuilder /> : <Navigate to="/login" replace />} />
          
          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;