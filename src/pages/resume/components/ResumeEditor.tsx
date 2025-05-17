import { useState } from 'react';
import { UseFormRegister, Control, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, GripVertical, ChevronUp, ChevronDown, Trash2, Award, FolderKanban, GraduationCap, BookOpen, Briefcase, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ResumeEditorProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export default function ResumeEditor({
  register,
  control,
  errors,
  watch,
  setValue,
}: ResumeEditorProps) {
  const [activeSections, setActiveSections] = useState<{ [key: string]: boolean }>({
    personalInfo: true,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
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
      case 'experience':
        newItem = {
          id: newId,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
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
          current: false,
          description: '',
        };
        break;
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
          name: '',
          description: '',
          url: '',
        };
        break;
      case 'certifications':
        newItem = {
          id: newId,
          name: '',
          issuer: '',
          date: '',
          url: '',
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

  return (
    <div className="card max-h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Resume Editor</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Resume Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Resume Title
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
                  <label htmlFor="address" className="block text-sm font-medium">
                    Location
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="input w-full"
                    {...register('content.personalInfo.address')}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-medium">
                    Website / LinkedIn
                  </label>
                  <input
                    id="website"
                    type="url"
                    className="input w-full"
                    {...register('content.personalInfo.website')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="summary" className="block text-sm font-medium">
                  Professional Summary
                </label>
                <textarea
                  id="summary"
                  rows={4}
                  className="input w-full"
                  {...register('content.personalInfo.summary')}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Work Experience */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('experience')}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Work Experience</h3>
            </div>
            <div>
              {activeSections.experience ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.experience && (
            <div className="p-4 space-y-4">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, 'experience')}>
                <Droppable droppableId="experience-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {content.experience && content.experience.map((item: any, index: number) => (
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
                                  onClick={() => handleRemoveItem('experience', item.id)}
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
                                      {...register(`content.experience.${index}.company`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Job Title
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      {...register(`content.experience.${index}.position`)}
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
                                      {...register(`content.experience.${index}.startDate`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <label className="block text-sm font-medium">
                                        End Date
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          id={`current-experience-${index}`}
                                          className="h-4 w-4 rounded border-input"
                                          onChange={(e) => {
                                            setValue(`content.experience.${index}.current`, e.target.checked);
                                            if (e.target.checked) {
                                              setValue(`content.experience.${index}.endDate`, 'Present');
                                            } else {
                                              setValue(`content.experience.${index}.endDate`, '');
                                            }
                                          }}
                                          checked={item.current}
                                        />
                                        <label htmlFor={`current-experience-${index}`} className="text-xs">
                                          Current
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="e.g., Mar 2023 or Present"
                                      className="input w-full"
                                      disabled={item.current}
                                      {...register(`content.experience.${index}.endDate`)}
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
                                    {...register(`content.experience.${index}.description`)}
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
                onClick={() => handleAddItem('experience')}
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
                                      <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium">
                                          End Year
                                        </label>
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="checkbox"
                                            id={`current-education-${index}`}
                                            className="h-4 w-4 rounded border-input"
                                            onChange={(e) => {
                                              setValue(`content.education.${index}.current`, e.target.checked);
                                              if (e.target.checked) {
                                                setValue(`content.education.${index}.endDate`, 'Present');
                                              } else {
                                                setValue(`content.education.${index}.endDate`, '');
                                              }
                                            }}
                                            checked={item.current}
                                          />
                                          <label htmlFor={`current-education-${index}`} className="text-xs">
                                            Current
                                          </label>
                                        </div>
                                      </div>
                                      <input
                                        type="text"
                                        className="input w-full"
                                        placeholder="e.g., 2022"
                                        disabled={item.current}
                                        {...register(`content.education.${index}.endDate`)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Description
                                  </label>
                                  <textarea
                                    rows={2}
                                    className="input w-full"
                                    placeholder="Major achievements, GPA, relevant coursework, etc."
                                    {...register(`content.education.${index}.description`)}
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
                onClick={() => handleAddItem('education')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </button>
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
                                  placeholder="Skill name"
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
                                    {item.name || `Project ${index + 1}`}
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
                                    Project Name
                                  </label>
                                  <input
                                    type="text"
                                    className="input w-full"
                                    {...register(`content.projects.${index}.name`)}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Description
                                  </label>
                                  <textarea
                                    rows={2}
                                    className="input w-full"
                                    placeholder="Describe your project and your role in it"
                                    {...register(`content.projects.${index}.description`)}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    Project URL / Github Link
                                  </label>
                                  <input
                                    type="url"
                                    className="input w-full"
                                    placeholder="https://..."
                                    {...register(`content.projects.${index}.url`)}
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
                onClick={() => handleAddItem('projects')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
          )}
        </div>
        
        {/* Certifications */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
            onClick={() => toggleSection('certifications')}
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-medium">Certifications</h3>
            </div>
            <div>
              {activeSections.certifications ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {activeSections.certifications && (
            <div className="p-4 space-y-4">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, 'certifications')}>
                <Droppable droppableId="certifications-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {content.certifications && content.certifications.map((item: any, index: number) => (
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
                                    {item.name || `Certification ${index + 1}`}
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem('certifications', item.id)}
                                  className="text-muted-foreground hover:text-error-foreground p-1 rounded"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="p-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Certification Name
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      {...register(`content.certifications.${index}.name`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Issuing Organization
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      placeholder="e.g., Microsoft, AWS, Google"
                                      {...register(`content.certifications.${index}.issuer`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Date Issued
                                    </label>
                                    <input
                                      type="text"
                                      className="input w-full"
                                      placeholder="e.g., May 2021"
                                      {...register(`content.certifications.${index}.date`)}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                      Certificate URL
                                    </label>
                                    <input
                                      type="url"
                                      className="input w-full"
                                      placeholder="https://..."
                                      {...register(`content.certifications.${index}.url`)}
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
                onClick={() => handleAddItem('certifications')}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Certification
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}