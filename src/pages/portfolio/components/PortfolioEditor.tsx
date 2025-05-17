import { useState } from 'react';
import { UseFormRegister, Control, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, GripVertical, ChevronUp, ChevronDown, Trash2, Award, FolderKanban, GraduationCap, BookOpen, Briefcase, User, MessageSquare, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface PortfolioEditorProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export default function PortfolioEditor({
  register,
  control,
  errors,
  watch,
  setValue,
}: PortfolioEditorProps) {
  const [activeSections, setActiveSections] = useState<{ [key: string]: boolean }>({
    personalInfo: true,
    social: false,
    skills: false,
    projects: false,
    experiences: false,
    education: false,
    testimonials: false,
    contact: false,
  });

  const content = watch('content');

  const toggleSection = (section: string) => {
    setActiveSections({
      ...activeSections,
      [section]: !activeSections[section],
    });
  };

  const handleAddItem = (section: string) => {
    const newId = uuidv4();
    const currentItems = content[section] || [];
    
    let newItem = {};
    
    switch (section) {
      case 'skills':
        newItem = {
          id: newId,
          name: '',
          level: 3,
        };
        break;
      case 'projects':
        newItem = {
          id: newId,
          title: '',
          description: '',
          image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          tags: [],
          liveUrl: '',
          githubUrl: '',
        };
        break;
      case 'experiences':
        newItem = {
          id: newId,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        };
        break;
      case 'education':
        newItem = {
          id: newId,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
        };
        break;
      case 'testimonials':
        newItem = {
          id: newId,
          name: '',
          position: '',
          company: '',
          text: '',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        };
        break;
    }
    
    setValue(`content.${section}`, [...currentItems, newItem]);
  };

  const handleRemoveItem = (section: string, id: string) => {
    const currentItems = content[section];
    setValue(
      `content.${section}`,
      currentItems.filter((item: any) => item.id !== id)
    );
  };

  const onDragEnd = (result: any, section: string) => {
    if (!result.destination) return;
    
    const items = Array.from(content[section]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setValue(`content.${section}`, items);
  };

  const handleAddTag = (index: number, tag: string) => {
    if (!tag.trim()) return;
    
    const project = content.projects[index];
    const tags = project.tags || [];
    
    if (!tags.includes(tag)) {
      setValue(`content.projects.${index}.tags`, [...tags, tag]);
    }
  };

  const handleRemoveTag = (projectIndex: number, tagIndex: number) => {
    const project = content.projects[projectIndex];
    const tags = [...project.tags];
    tags.splice(tagIndex, 1);
    setValue(`content.projects.${projectIndex}.tags`, tags);
  };

  return (
    <div className="card max-h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Portfolio Editor</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Portfolio Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Portfolio Title
          </label>
          <input
            id="title"
            type="text"
            className={`input w-full ${errors.title ? 'border-error-foreground' : ''}`}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="text-error-foreground text-xs">{errors.title.message as string}</p>
          )}
        </div>
        
        {/* Personal Information */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('personalInfo')}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Personal Information</h3>
            </div>
            <div>
              {activeSections.personalInfo ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.personalInfo && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input w-full"
                    {...register('content.personalInfo.name')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Professional Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., Full Stack Developer"
                    className="input w-full"
                    {...register('content.personalInfo.title')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input w-full"
                    {...register('content.personalInfo.email')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="input w-full"
                    {...register('content.personalInfo.phone')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g., New York, NY"
                    className="input w-full"
                    {...register('content.personalInfo.location')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="photo" className="block text-sm font-medium">
                    Profile Photo URL
                  </label>
                  <input
                    id="photo"
                    type="url"
                    className="input w-full"
                    {...register('content.personalInfo.photo')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bio" className="block text-sm font-medium">
                  Bio / About Me
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="input w-full"
                  placeholder="Write a short professional biography"
                  {...register('content.personalInfo.bio')}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Social Links */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('social')}
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Social Links</h3>
            </div>
            <div>
              {activeSections.social ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.social && (
            <div className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Github className="h-4 w-4" />
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    className="input w-full"
                    {...register('content.social.github')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="input w-full"
                    {...register('content.social.linkedin')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Twitter className="h-4 w-4" />
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://twitter.com/username"
                    className="input w-full"
                    {...register('content.social.twitter')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Globe className="h-4 w-4" />
                    Personal Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    className="input w-full"
                    {...register('content.social.website')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Skills */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('skills')}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Skills</h3>
            </div>
            <div>
              {activeSections.skills ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.skills && (
            <div className="p-4 space-y-4">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, 'skills')}>
                <Droppable droppableId="skills-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {content.skills && content.skills.map((item: any, index: number) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center gap-3 border border-border rounded-md p-3"
                            >
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              </div>
                              
                              <div className="flex-1">
                                <input
                                  type="text"
                                  className="input w-full"
                                  placeholder="Skill name (e.g., React.js, UI Design)"
                                  {...register(`content.skills.${index}.name`)}
                                />
                              </div>
                              
                              <div className="flex gap-1 items-center">
                                <select
                                  className="input h-9 w-24"
                                  {...register(`content.skills.${index}.level`)}
                                >
                                  <option value="1">Beginner</option>
                                  <option value="2">Intermediate</option>
                                  <option value="3">Advanced</option>
                                  <option value="4">Expert</option>
                                  <option value="5">Master</option>
                                </select>
                                
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem('skills', item.id)}
                                  className="p-2 text-muted-foreground hover:text-error-foreground rounded-md"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <button
                type="button"
                onClick={() => handleAddItem('skills')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Skill
              </button>
            </div>
          )}
        </div>
        
        {/* Projects */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('projects')}
          >
            <div className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Projects</h3>
            </div>
            <div>
              {activeSections.projects ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.projects && (
            <div className="p-4 space-y-4">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, 'projects')}>
                <Droppable droppableId="projects-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {content.projects && content.projects.map((item: any, index: number) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border border-border rounded-md overflow-hidden"
                            >
                              <div className="flex items-center justify-between p-3 bg-muted/10">
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                  </div>
                                  <h4 className="font-medium">
                                    {item.title || `Project ${index + 1}`}
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem('projects', item.id)}
                                  className="text-muted-foreground hover:text-error-foreground p-1 rounded"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Project Title
                                  </label>
                                  <input
                                    type="text"
                                    className="input w-full"
                                    {...register(`content.projects.${index}.title`)}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    className="input w-full"
                                    placeholder="Describe your project and your role in it"
                                    {...register(`content.projects.${index}.description`)}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Project Image URL
                                  </label>
                                  <input
                                    type="url"
                                    className="input w-full"
                                    placeholder="https://..."
                                    {...register(`content.projects.${index}.image`)}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Tags / Technologies
                                  </label>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {item.tags && item.tags.map((tag: string, tagIndex: number) => (
                                      <div 
                                        key={tagIndex} 
                                        className="bg-muted px-2 py-1 rounded-full text-xs flex items-center gap-1"
                                      >
                                        {tag}
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveTag(index, tagIndex)}
                                          className="hover:text-error-foreground"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      id={`tag-input-${index}`}
                                      className="input flex-1"
                                      placeholder="e.g., React, TypeScript"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const input = document.getElementById(`tag-input-${index}`) as HTMLInputElement;
                                        if (input && input.value) {
                                          handleAddTag(index, input.value);
                                          input.value = '';
                                        }
                                      }}
                                      className="btn btn-sm btn-outline"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Live Demo URL
                                    </label>
                                    <input
                                      type="url"
                                      className="input w-full"
                                      placeholder="https://..."
                                      {...register(`content.projects.${index}.liveUrl`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      GitHub URL
                                    </label>
                                    <input
                                      type="url"
                                      className="input w-full"
                                      placeholder="https://github.com/..."
                                      {...register(`content.projects.${index}.githubUrl`)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <button
                type="button"
                onClick={() => handleAddItem('projects')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
          )}
        </div>
        
        {/* Work Experience */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('experiences')}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Work Experience</h3>
            </div>
            <div>
              {activeSections.experiences ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.experiences && (
            <div className="p-4 space-y-4">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, 'experiences')}>
                <Droppable droppableId="experiences-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {content.experiences && content.experiences.map((item: any, index: number) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border border-border rounded-md overflow-hidden"
                            >
                              <div className="flex items-center justify-between p-3 bg-muted/10">
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                  </div>
                                  <h4 className="font-medium">
                                    {item.company || `Experience ${index + 1}`}
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem('experiences', item.id)}
                                  className="text-muted-foreground hover:text-error-foreground p-1 rounded"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="p-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Company Name
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      {...register(`content.experiences.${index}.company`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Job Title
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      {...register(`content.experiences.${index}.position`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Start Date
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="e.g., Jan 2020"
                                      className="input w-full"
                                      {...register(`content.experiences.${index}.startDate`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      End Date
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="e.g., Mar 2023 or Present"
                                      className="input w-full"
                                      {...register(`content.experiences.${index}.endDate`)}
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    className="input w-full"
                                    placeholder="Describe your responsibilities and achievements"
                                    {...register(`content.experiences.${index}.description`)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <button
                type="button"
                onClick={() => handleAddItem('experiences')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Work Experience
              </button>
            </div>
          )}
        </div>
        
        {/* Education */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('education')}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Education</h3>
            </div>
            <div>
              {activeSections.education ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.education && (
            <div className="p-4 space-y-4">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, 'education')}>
                <Droppable droppableId="education-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {content.education && content.education.map((item: any, index: number) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border border-border rounded-md overflow-hidden"
                            >
                              <div className="flex items-center justify-between p-3 bg-muted/10">
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                  </div>
                                  <h4 className="font-medium">
                                    {item.institution || `Education ${index + 1}`}
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem('education', item.id)}
                                  className="text-muted-foreground hover:text-error-foreground p-1 rounded"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="p-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Institution
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      {...register(`content.education.${index}.institution`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Degree
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      placeholder="e.g., Bachelor of Science"
                                      {...register(`content.education.${index}.degree`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Field of Study
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      placeholder="e.g., Computer Science"
                                      {...register(`content.education.${index}.field`)}
                                    />
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium">
                                        Start Year
                                      </label>
                                      <input
                                        type="text"
                                        className="input w-full"
                                        placeholder="e.g., 2018"
                                        {...register(`content.education.${index}.startDate`)}
                                      />
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium">
                                        End Year
                                      </label>
                                      <input
                                        type="text"
                                        className="input w-full"
                                        placeholder="e.g., 2022 or Present"
                                        {...register(`content.education.${index}.endDate`)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <button
                type="button"
                onClick={() => handleAddItem('education')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </button>
            </div>
          )}
        </div>
        
        {/* Testimonials */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('testimonials')}
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Testimonials</h3>
            </div>
            <div>
              {activeSections.testimonials ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.testimonials && (
            <div className="p-4 space-y-4">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, 'testimonials')}>
                <Droppable droppableId="testimonials-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {content.testimonials && content.testimonials.map((item: any, index: number) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border border-border rounded-md overflow-hidden"
                            >
                              <div className="flex items-center justify-between p-3 bg-muted/10">
                                <div className="flex items-center gap-2">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                  </div>
                                  <h4 className="font-medium">
                                    {item.name || `Testimonial ${index + 1}`}
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem('testimonials', item.id)}
                                  className="text-muted-foreground hover:text-error-foreground p-1 rounded"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="p-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      {...register(`content.testimonials.${index}.name`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Position
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      placeholder="e.g., Project Manager"
                                      {...register(`content.testimonials.${index}.position`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Company
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      {...register(`content.testimonials.${index}.company`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Avatar URL
                                    </label>
                                    <input
                                      type="url"
                                      className="input w-full"
                                      placeholder="https://..."
                                      {...register(`content.testimonials.${index}.avatar`)}
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Testimonial Text
                                  </label>
                                  <textarea
                                    rows={3}
                                    className="input w-full"
                                    placeholder="What they said about your work"
                                    {...register(`content.testimonials.${index}.text`)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <button
                type="button"
                onClick={() => handleAddItem('testimonials')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Testimonial
              </button>
            </div>
          )}
        </div>
        
        {/* Contact Section */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('contact')}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Contact Section</h3>
            </div>
            <div>
              {activeSections.contact ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.contact && (
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-medium">
                  Contact Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  className="input w-full"
                  placeholder="Add a message for your contact section"
                  {...register('content.contact.message')}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This message will be displayed in the contact section of your portfolio.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}