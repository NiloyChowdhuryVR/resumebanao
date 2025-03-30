import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface EducationItemProps {
  institution: string;
  degree: string;
  location?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string[];
}

const EducationItem: React.FC<EducationItemProps> = ({
  institution,
  degree,
  location,
  startDate,
  endDate,
  gpa,
  description
}) => {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
        <div className="mb-1 md:mb-0">
          <h3 className="text-lg font-semibold text-resume-primary">{degree}</h3>
          <div className="text-resume-secondary">{institution}</div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-resume-secondary">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="inline-block" />
            <span>{startDate} - {endDate || 'Present'}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} className="inline-block" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
      
      {gpa && <div className="text-sm text-resume-secondary mb-1">GPA: {gpa}</div>}
      
      {description && description.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 text-resume-primary">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EducationItem;