import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceItemProps {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string[]; // Ensure description is always an array
  technologies?: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  location,
  startDate,
  endDate,
  description = [], // Default to an empty array
  technologies = []
}) => {
  // Ensure description is an array
  const safeDescription = Array.isArray(description) ? description : [description];

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
        <div className="mb-1 md:mb-0">
          <h3 className="text-lg font-semibold text-resume-primary">{title}</h3>
          <div className="text-resume-secondary">{company}</div>
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

      {safeDescription.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 mb-3 text-resume-primary">
          {safeDescription.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-gray-100 text-resume-secondary px-2 py-1 text-xs rounded">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceItem;
