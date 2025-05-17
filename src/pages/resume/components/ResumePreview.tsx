import { useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';

interface ResumePreviewProps {
  data: any;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll preview to top when data changes
    if (previewRef.current) {
      previewRef.current.scrollTop = 0;
    }
  }, [data.template]);

  const renderTemplate = () => {
    const { content, template } = data;
    
    switch (template) {
      case 'Modern':
        return <ModernTemplate content={content} />;
      case 'Minimal':
        return <MinimalTemplate content={content} />;
      case 'Professional':
      default:
        return <ProfessionalTemplate content={content} />;
    }
  };

  return (
    <div className="card max-h-[calc(100vh-12rem)] overflow-y-auto" ref={previewRef}>
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Resume Preview</h2>
      </div>
      <div className="p-4">
        <div 
          id="resume-preview" 
          className="border border-border shadow-sm w-full bg-white text-black"
          style={{ 
            height: '297mm', // A4 height
            width: '210mm', // A4 width
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}

const ProfessionalTemplate = ({ content }: { content: any }) => {
  return (
    <div className="flex flex-col min-h-full p-8 font-sans">
      {/* Header */}
      <header className="mb-6 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold text-blue-800 mb-1">{content.personalInfo.name}</h1>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {content.personalInfo.email && (
            <div>{content.personalInfo.email}</div>
          )}
          {content.personalInfo.phone && (
            <div>{content.personalInfo.phone}</div>
          )}
          {content.personalInfo.address && (
            <div>{content.personalInfo.address}</div>
          )}
          {content.personalInfo.website && (
            <div>{content.personalInfo.website}</div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {content.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2 border-b border-gray-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm">{content.personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {content.experience && content.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {content.experience.map((job: any, index: number) => (
              <div key={job.id || index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{job.position}</h3>
                    <div className="text-sm">{job.company}</div>
                  </div>
                  {(job.startDate || job.endDate) && (
                    <div className="text-sm text-gray-600">
                      {job.startDate} {job.startDate && job.endDate && '–'} {job.endDate}
                    </div>
                  )}
                </div>
                {job.description && (
                  <p className="text-sm mt-1">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {content.education && content.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {content.education.map((edu: any, index: number) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{edu.degree}{edu.field && `, ${edu.field}`}</h3>
                    <div className="text-sm">{edu.institution}</div>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-sm text-gray-600">
                      {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                    </div>
                  )}
                </div>
                {edu.description && (
                  <p className="text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {content.skills && content.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-1 gap-y-2">
            {content.skills.map((skill: any, index: number) => (
              <div 
                key={skill.id || index}
                className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {content.projects && content.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {content.projects.map((project: any, index: number) => (
              <div key={project.id || index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.url && (
                    <div className="text-sm text-blue-700">{project.url}</div>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Certifications */}
      {content.certifications && content.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">
            Certifications
          </h2>
          <div className="space-y-2">
            {content.certifications.map((cert: any, index: number) => (
              <div key={cert.id || index} className="flex justify-between">
                <div>
                  <span className="font-medium">{cert.name}</span>
                  {cert.issuer && (
                    <span className="text-sm text-gray-600">, {cert.issuer}</span>
                  )}
                </div>
                {cert.date && (
                  <div className="text-sm text-gray-600">{cert.date}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ModernTemplate = ({ content }: { content: any }) => {
  return (
    <div className="flex min-h-full">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-6 flex flex-col">
        <div className="mb-8 text-center">
          <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4">
            {/* Placeholder for photo */}
          </div>
          <h1 className="text-xl font-bold">{content.personalInfo.name}</h1>
        </div>
        
        <div className="space-y-6">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-teal-700 border-b border-gray-300 pb-1">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              {content.personalInfo.email && (
                <div>{content.personalInfo.email}</div>
              )}
              {content.personalInfo.phone && (
                <div>{content.personalInfo.phone}</div>
              )}
              {content.personalInfo.address && (
                <div>{content.personalInfo.address}</div>
              )}
              {content.personalInfo.website && (
                <div>{content.personalInfo.website}</div>
              )}
            </div>
          </section>
          
          {/* Skills */}
          {content.skills && content.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3 text-teal-700 border-b border-gray-300 pb-1">
                Skills
              </h2>
              <div className="space-y-2">
                {content.skills.map((skill: any, index: number) => (
                  <div key={skill.id || index} className="flex flex-col">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i}
                            className={cn(
                              "inline-block w-2 h-2 rounded-full mx-0.5",
                              i < skill.level ? "bg-teal-600" : "bg-gray-300"
                            )}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {content.education && content.education.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3 text-teal-700 border-b border-gray-300 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {content.education.map((edu: any, index: number) => (
                  <div key={edu.id || index} className="text-sm">
                    <div className="font-semibold">{edu.degree}</div>
                    <div>{edu.field}</div>
                    <div>{edu.institution}</div>
                    <div className="text-gray-600">
                      {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications */}
          {content.certifications && content.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3 text-teal-700 border-b border-gray-300 pb-1">
                Certifications
              </h2>
              <div className="space-y-2 text-sm">
                {content.certifications.map((cert: any, index: number) => (
                  <div key={cert.id || index}>
                    <div className="font-semibold">{cert.name}</div>
                    <div>{cert.issuer}</div>
                    <div className="text-gray-600">{cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {content.personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-teal-700 border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm">{content.personalInfo.summary}</p>
          </section>
        )}
        
        {/* Experience */}
        {content.experience && content.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-teal-700 border-b border-gray-300 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {content.experience.map((job: any, index: number) => (
                <div key={job.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold">{job.position}</h3>
                      <div className="text-sm">{job.company}</div>
                    </div>
                    {(job.startDate || job.endDate) && (
                      <div className="text-sm text-gray-600">
                        {job.startDate} {job.startDate && job.endDate && '–'} {job.endDate}
                      </div>
                    )}
                  </div>
                  {job.description && (
                    <p className="text-sm mt-1">{job.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {content.projects && content.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-teal-700 border-b border-gray-300 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {content.projects.map((project: any, index: number) => (
                <div key={project.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">{project.name}</h3>
                    {project.url && (
                      <div className="text-sm text-teal-700">{project.url}</div>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-sm">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const MinimalTemplate = ({ content }: { content: any }) => {
  return (
    <div className="flex flex-col min-h-full p-8 font-sans">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">{content.personalInfo.name}</h1>
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm">
          {content.personalInfo.email && (
            <div>{content.personalInfo.email}</div>
          )}
          {content.personalInfo.phone && (
            <div>{content.personalInfo.phone}</div>
          )}
          {content.personalInfo.address && (
            <div>{content.personalInfo.address}</div>
          )}
          {content.personalInfo.website && (
            <div>{content.personalInfo.website}</div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {content.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 uppercase tracking-wider">
            About Me
          </h2>
          <p className="text-sm">{content.personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {content.experience && content.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider">
            Experience
          </h2>
          <div className="space-y-4">
            {content.experience.map((job: any, index: number) => (
              <div key={job.id || index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{job.position}</h3>
                    <div className="text-sm">{job.company}</div>
                  </div>
                  {(job.startDate || job.endDate) && (
                    <div className="text-sm text-gray-600">
                      {job.startDate} {job.startDate && job.endDate && '–'} {job.endDate}
                    </div>
                  )}
                </div>
                {job.description && (
                  <p className="text-sm mt-1">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {content.education && content.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider">
            Education
          </h2>
          <div className="space-y-4">
            {content.education.map((edu: any, index: number) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{edu.degree}{edu.field && `, ${edu.field}`}</h3>
                    <div className="text-sm">{edu.institution}</div>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-sm text-gray-600">
                      {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                    </div>
                  )}
                </div>
                {edu.description && (
                  <p className="text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {content.skills && content.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {content.skills.map((skill: any, index: number) => (
              <div 
                key={skill.id || index}
                className="border border-gray-300 px-3 py-1 rounded-sm text-sm"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {content.projects && content.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider">
            Projects
          </h2>
          <div className="space-y-4">
            {content.projects.map((project: any, index: number) => (
              <div key={project.id || index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.url && (
                    <div className="text-sm text-gray-600">{project.url}</div>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Certifications */}
      {content.certifications && content.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider">
            Certifications
          </h2>
          <div className="space-y-2">
            {content.certifications.map((cert: any, index: number) => (
              <div key={cert.id || index} className="flex justify-between">
                <div>
                  <span className="font-medium">{cert.name}</span>
                  {cert.issuer && (
                    <span className="text-sm text-gray-600">, {cert.issuer}</span>
                  )}
                </div>
                {cert.date && (
                  <div className="text-sm text-gray-600">{cert.date}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};