import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import PortfolioEditor from './components/PortfolioEditor';
import PortfolioPreview from './components/PortfolioPreview';
import PortfolioTemplates from './components/PortfolioTemplates';
import { Download, Save, ArrowLeft } from 'lucide-react';
import Loading from '../../components/common/Loading';

interface PortfolioData {
  title: string;
  template: string;
  content: {
    personalInfo: {
      name: string;
      title: string;
      email: string;
      phone: string;
      location: string;
      bio: string;
      photo: string;
    };
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      website: string;
    };
    skills: Array<{
      id: string;
      name: string;
      level: number;
    }>;
    projects: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      tags: string[];
      liveUrl: string;
      githubUrl: string;
    }>;
    experiences: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
    }>;
    testimonials: Array<{
      id: string;
      name: string;
      position: string;
      company: string;
      text: string;
      avatar: string;
    }>;
    contact: {
      message: string;
    };
  };
}

const emptyPortfolioData: PortfolioData = {
  title: 'My Portfolio',
  template: 'Modern',
  content: {
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
    },
    skills: [],
    projects: [],
    experiences: [],
    education: [],
    testimonials: [],
    contact: {
      message: 'Feel free to reach out to me for collaboration or job opportunities.',
    }
  }
};

export default function PortfolioBuilder() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(emptyPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  // Form setup
  const { register, handleSubmit, watch, setValue, control, formState: { errors, isDirty } } = useForm<PortfolioData>({
    defaultValues: portfolioData
  });

  useEffect(() => {
    document.title = id ? 'Edit Portfolio - Resumify' : 'Create Portfolio - Resumify';
    
    if (id) {
      fetchPortfolioData();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const fetchPortfolioData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('id', id)
        .eq('user_id', user!.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setPortfolioData(data as PortfolioData);
        
        // Update form values
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as any, value);
        });
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      // If portfolio not found or not owned by user, redirect to create new
      navigate('/portfolio', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePortfolio = async (data: PortfolioData) => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      if (id) {
        // Update existing portfolio
        const { error } = await supabase
          .from('portfolios')
          .update({
            title: data.title,
            template: data.template,
            content: data.content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .eq('user_id', user.id);
          
        if (error) throw error;
      } else {
        // Create new portfolio
        const { error, data: newPortfolio } = await supabase
          .from('portfolios')
          .insert({
            user_id: user.id,
            title: data.title,
            template: data.template,
            content: data.content,
          })
          .select('id')
          .single();
          
        if (error) throw error;
        
        // Redirect to edit page
        navigate(`/portfolio/${newPortfolio.id}`, { replace: true });
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Failed to save portfolio. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateSelect = (template: string) => {
    setValue('template', template);
    setShowTemplates(false);
  };

  const handleDownloadHTML = () => {
    const portfolioContent = document.getElementById('portfolio-preview');
    if (!portfolioContent) return;

    // Create a new document with necessary meta tags and styles
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${watch('title')}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body>
    ${portfolioContent.outerHTML}
</body>
</html>`;

    // Create a Blob containing the HTML content
    const blob = new Blob([html], { type: 'text/html' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${watch('title').toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {showTemplates ? (
        <PortfolioTemplates 
          currentTemplate={watch('template')} 
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container px-4 py-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="rounded-full p-2 hover:bg-muted transition-colors"
                  aria-label="Back to Dashboard"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">
                    {id ? 'Edit Portfolio' : 'Create Portfolio'}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {id ? 'Update your existing portfolio' : 'Create a new professional portfolio website'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button 
                  className="btn btn-outline flex items-center gap-2"
                  onClick={() => setShowTemplates(true)}
                >
                  Choose Template
                </button>
                <button 
                  className="btn btn-outline flex items-center gap-2"
                  onClick={handleDownloadHTML}
                >
                  <Download className="h-4 w-4" />
                  Download HTML
                </button>
                <button 
                  onClick={handleSubmit(handleSavePortfolio)} 
                  disabled={isSaving || !isDirty}
                  className="btn btn-primary flex items-center gap-2"
                >
                  {isSaving ? (
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortfolioEditor 
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
              <PortfolioPreview 
                data={watch()}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}