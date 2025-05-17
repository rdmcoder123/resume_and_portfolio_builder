import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Briefcase, Trash2, Edit, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../utils/supabase';
import Loading from '../../components/common/Loading';

interface Resume {
  id: string;
  title: string;
  updated_at: string;
  template: string;
}

interface Portfolio {
  id: string;
  title: string;
  updated_at: string;
  template: string;
  published_url: string | null;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resumes' | 'portfolios'>('resumes');

  useEffect(() => {
    document.title = 'Dashboard - Resumify';
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Fetch resumes
      const { data: resumeData, error: resumeError } = await supabase
        .from('resumes')
        .select('id, title, updated_at, template')
        .eq('user_id', user!.id)
        .order('updated_at', { ascending: false });

      if (resumeError) throw resumeError;
      setResumes(resumeData || []);

      // Fetch portfolios
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('portfolios')
        .select('id, title, updated_at, template, published_url')
        .eq('user_id', user!.id)
        .order('updated_at', { ascending: false });

      if (portfolioError) throw portfolioError;
      setPortfolios(portfolioData || []);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = () => {
    navigate('/resume');
  };

  const handleCreatePortfolio = () => {
    navigate('/portfolio');
  };

  const handleDeleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user!.id);
        
      if (error) throw error;
      
      setResumes(resumes.filter(resume => resume.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;
    
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id)
        .eq('user_id', user!.id);
        
      if (error) throw error;
      
      setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your resumes and portfolios
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button onClick={handleCreateResume} className="btn btn-primary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Resume
            </button>
            <button onClick={handleCreatePortfolio} className="btn btn-secondary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Portfolio
            </button>
          </div>
        </div>

        <div className="mb-6">
          <nav className="flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab('resumes')}
              className={`pb-2 px-1 font-medium text-sm transition-colors relative ${
                activeTab === 'resumes'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Resumes
              {activeTab === 'resumes' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground"
                  initial={false}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('portfolios')}
              className={`pb-2 px-1 font-medium text-sm transition-colors relative ${
                activeTab === 'portfolios'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Portfolios
              {activeTab === 'portfolios' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground"
                  initial={false}
                />
              )}
            </button>
          </nav>
        </div>

        {activeTab === 'resumes' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.length > 0 ? (
              resumes.map(resume => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card overflow-hidden"
                >
                  <div className="p-4 border-b border-border bg-muted/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold truncate">{resume.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Link
                          to={`/resume/${resume.id}`}
                          className="p-2 text-muted-foreground hover:text-foreground rounded-md"
                          aria-label="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteResume(resume.id)}
                          className="p-2 text-muted-foreground hover:text-error-foreground rounded-md"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                      <span className="text-sm">{resume.template}</span>
                    </div>
                    <Link to={`/resume/${resume.id}`} className="btn btn-sm btn-outline">
                      Edit Resume
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-primary p-3 mb-4">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">No resumes yet</h3>
                <p className="text-muted-foreground mb-4">Create your first resume to get started</p>
                <button onClick={handleCreateResume} className="btn btn-primary">Create Resume</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'portfolios' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.length > 0 ? (
              portfolios.map(portfolio => (
                <motion.div
                  key={portfolio.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card overflow-hidden"
                >
                  <div className="p-4 border-b border-border bg-muted/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold truncate">{portfolio.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last updated: {new Date(portfolio.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Link
                          to={`/portfolio/${portfolio.id}`}
                          className="p-2 text-muted-foreground hover:text-foreground rounded-md"
                          aria-label="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeletePortfolio(portfolio.id)}
                          className="p-2 text-muted-foreground hover:text-error-foreground rounded-md"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-secondary-foreground" />
                        <span className="text-sm">{portfolio.template}</span>
                      </div>
                      <Link to={`/portfolio/${portfolio.id}`} className="btn btn-sm btn-outline">
                        Edit Portfolio
                      </Link>
                    </div>
                    {portfolio.published_url && (
                      <a
                        href={portfolio.published_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary-foreground hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Published Site
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-secondary p-3 mb-4">
                  <Briefcase className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">No portfolios yet</h3>
                <p className="text-muted-foreground mb-4">Create your first portfolio to get started</p>
                <button onClick={handleCreatePortfolio} className="btn btn-secondary">Create Portfolio</button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}