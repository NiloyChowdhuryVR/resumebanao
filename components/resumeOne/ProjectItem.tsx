import React from "react";

interface ProjectProps {
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
}

const ProjectItem: React.FC<ProjectProps> = ({ name, description, link, technologies = [] }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {link}
        </a>
      )}
      <div className="flex flex-wrap mt-2">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2 text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectItem;
