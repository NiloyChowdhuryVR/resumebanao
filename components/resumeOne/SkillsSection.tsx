
import React from 'react';

interface SkillCategory {
  category: string;
  skills: string[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {skills.map((category, index) => (
        <div key={index}>
          <h3 className="text-md font-semibold mb-2 text-resume-primary">{category.category}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <span 
                key={skillIndex} 
                className="bg-gray-100 text-resume-secondary px-3 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
