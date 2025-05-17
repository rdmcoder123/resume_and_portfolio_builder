import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import ResumeTemplates from './components/ResumeTemplates';
import { Download, Save, ArrowLeft } from 'lucide-react';
import Loading from '../../components/common/Loading';
import html2pdf from 'html2pdf.js';

interface ResumeData {
  title: string;
  template: string;
  content: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
      website: string;
      summary: string;
    };
    experience: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
    }>;
    skills: Array<{
      id: string;
      name: string;
      level: number;
    }>;
    projects: Array<{
      id: string;
      name: string;
      description: string;
      url: string;
    }>;
    certifications: Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
      url: string;
    }>;
  };
}

const emptyResumeData: ResumeData = {
  title: 'My Resume',
  template: 'Professional',
  content: {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  },
};

export default function ResumeBuilder() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  // Form setup
  const { register, handleSubmit, watch, setValue, control, formState: { errors, isDirty } } = useForm<ResumeData>({
    defaultValues: resumeData
  });

  useEffect(() => {
    document.title = id ? 'Edit Resume - Resumify' : 'Create Resume - Resumify';
    
    if (id) {
      fetchResumeData();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const fetchResumeData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .eq('user_id', user!.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setResumeData(data as ResumeData);
        
        // Update form values
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as any, value);
        });
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      // If resume not found or not owned by user, redirect to create new
      navigate('/resume', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveResume = async (data: ResumeData) => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      if (id) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
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
        // Create new resume
        const { error, data: newResume } = await supabase
          .from('resumes')
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
        navigate(`/resume/${newResume.id}`, { replace: true });
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateSelect = (template: string) => {
    setValue('template', template);
    setShowTemplates(false);
  };

  const handleExportPDF = () => {
    const element = document.getElementById('resume-preview');
    
    if (!element) return;
    
    // Configure options
    const opt = {
      margin: [0, 0],
      filename: `${resumeData.title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {showTemplates ? (
        <ResumeTemplates 
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
                    {id ? 'Edit Resume' : 'Create Resume'}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {id ? 'Update your existing resume' : 'Create a new professional resume'}
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
                  onClick={handleExportPDF}
                >
                  <Download className="h-4 w-4" />
                  Export PDF
                </button>
                <button 
                  onClick={handleSubmit(handleSaveResume)} 
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
              <ResumeEditor 
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
              <ResumePreview 
                data={watch()} 
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}