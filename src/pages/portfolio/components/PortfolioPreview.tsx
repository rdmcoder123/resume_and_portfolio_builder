import { useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';

interface PortfolioPreviewProps {
  data: any;
}

export default function PortfolioPreview({ data }: PortfolioPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = 0;
    }
  }, [data.template]);

  const renderTemplate = () => {
    const { content, template } = data;
    
    switch (template) {
      case 'Modern':
        return <ModernTemplate content={content} />;
      case 'Minimalist':
        return <MinimalTemplate content={content} />;
      case 'Creative':
      default:
        return <CreativeTemplate content={content} />;
    }
  };

  return (
    <div className="card max-h-[calc(100vh-12rem)] overflow-y-auto" ref={previewRef}>
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Portfolio Preview</h2>
      </div>
      <div className="p-4">
        <div 
          id="portfolio-preview" 
          className="w-full bg-white text-black"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}

const ModernTemplate = ({ content }: { content: any }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            {content.personalInfo?.photo && (
              <img 
                src={content.personalInfo.photo} 
                alt={content.personalInfo.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
            )}
            <h1 className="text-4xl font-bold mb-2">{content.personalInfo?.name}</h1>
            <p className="text-xl text-gray-400">{content.personalInfo?.title}</p>
          </div>
          <p className="max-w-2xl mx-auto text-gray-400">
            {content.personalInfo?.bio}
          </p>
          <div className="flex justify-center gap-4 mt-8">
            {content.social?.github && (
              <a href={content.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                GitHub
              </a>
            )}
            {content.social?.linkedin && (
              <a href={content.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
            )}
            {content.social?.twitter && (
              <a href={content.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Twitter
              </a>
            )}
            {content.social?.website && (
              <a href={content.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Website
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Skills Section */}
      {content.skills?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {content.skills.map((skill: any, index: number) => (
                <div key={skill.id || index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <h3 className="font-semibold mb-2">{skill.name}</h3>
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i < skill.level ? "bg-blue-500" : "bg-gray-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {content.projects?.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.projects.map((project: any, index: number) => (
                <div key={project.id || index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.map((tag: string, tagIndex: number) => (
                        <span 
                          key={tagIndex}
                          className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {content.experiences?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {content.experiences.map((exp: any, index: number) => (
                <div key={exp.id || index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {content.education?.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {content.education.map((edu: any, index: number) => (
                <div key={edu.id || index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500">{edu.field}</p>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {content.testimonials?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial: any, index: number) => (
                <div key={testimonial.id || index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.position} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-400">
            {content.contact?.message || "I'm always open to new opportunities and interesting projects."}
          </p>
          <div className="flex justify-center gap-6">
            {content.personalInfo?.email && (
              <a 
                href={`mailto:${content.personalInfo.email}`}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Send Email
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const MinimalTemplate = ({ content }: { content: any }) => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-4">{content.personalInfo?.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{content.personalInfo?.title}</p>
        <p className="max-w-2xl mx-auto text-gray-600">
          {content.personalInfo?.bio}
        </p>
        <div className="flex justify-center gap-6 mt-8">
          {content.social?.github && (
            <a href={content.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
              GitHub
            </a>
          )}
          {content.social?.linkedin && (
            <a href={content.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
              LinkedIn
            </a>
          )}
          {content.social?.twitter && (
            <a href={content.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
              Twitter
            </a>
          )}
          {content.social?.website && (
            <a href={content.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
              Website
            </a>
          )}
        </div>
      </header>

      {/* Projects */}
      {content.projects?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Selected Work</h2>
          <div className="space-y-12">
            {content.projects.map((project: any, index: number) => (
              <div key={project.id || index} className="grid md:grid-cols-2 gap-8">
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag: string, tagIndex: number) => (
                      <span 
                        key={tagIndex}
                        className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-600"
                      >
                        View Project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black"
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {content.experiences?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            {content.experiences.map((exp: any, index: number) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {content.skills?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {content.skills.map((skill: any, index: number) => (
              <div key={skill.id || index} className="border border-gray-200 px-4 py-2 rounded-lg">
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {content.education?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Education</h2>
          <div className="space-y-6">
            {content.education.map((edu: any, index: number) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500">{edu.field}</p>
                  </div>
                  <div className="text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          {content.contact?.message || "I'm always open to new opportunities and interesting projects."}
        </p>
        {content.personalInfo?.email && (
          <a 
            href={`mailto:${content.personalInfo.email}`}
            className="inline-block border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
          >
            Send Email
          </a>
        )}
      </section>
    </div>
  );
};

const CreativeTemplate = ({ content }: { content: any }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          {content.personalInfo?.photo && (
            <img 
              src={content.personalInfo.photo}
              alt={content.personalInfo.name}
              className="w-40 h-40 rounded-full mx-auto mb-8 object-cover border-4 border-white shadow-xl"
            />
          )}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {content.personalInfo?.name}
          </h1>
          <p className="text-2xl text-gray-600 mb-8">{content.personalInfo?.title}</p>
          <p className="max-w-2xl mx-auto text-gray-600 mb-12">
            {content.personalInfo?.bio}
          </p>
          <div className="flex justify-center gap-6">
            {content.social?.github && (
              <a 
                href={content.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                GitHub
              </a>
            )}
            {content.social?.linkedin && (
              <a 
                href={content.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {content.social?.twitter && (
              <a 
                href={content.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Twitter
              </a>
            )}
            {content.social?.website && (
              <a 
                href={content.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Projects */}
      {content.projects?.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.projects.map((project: any, index: number) => (
                <div 
                  key={project.id || index}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {project.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.map((tag: string, tagIndex: number) => (
                        <span 
                          key={tagIndex}
                          className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          View Project
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {content.skills?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {content.skills.map((skill: any, index: number) => (
                <div 
                  key={skill.id || index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl text-center"
                >
                  <h3 className="font-semibold mb-3">{skill.name}</h3>
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i < skill.level ? "bg-purple-600" : "bg-purple-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {content.experiences?.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Work Experience
            </h2>
            <div className="max-w-4xl mx-auto space-y-12">
              {content.experiences.map((exp: any, index: number) => (
                <div 
                  key={exp.id || index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p className="text-purple-600">{exp.company}</p>
                    </div>
                    <div className="text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {content.education?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Education
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {content.education.map((edu: any, index: number) => (
                <div 
                  key={edu.id || index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                  <p className="text-purple-600 mb-1">{edu.institution}</p>
                  <p className="text-gray-600 mb-2">{edu.field}</p>
                  <p className="text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {content.testimonials?.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Testimonials
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial: any, index: number) => (
                <div 
                  key={testimonial.id || index}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-purple-600 text-sm">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="max-w-2xl mx-auto mb-12 text-purple-100">
            {content.contact?.message || "I'm always open to new opportunities and interesting projects."}
          </p>
          {content.personalInfo?.email && (
            <a 
              href={`mailto:${content.personalInfo.email}`}
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors"
            >
              Get in Touch
            </a>
          )}
        </div>
      </section>
    </div>
  );
};