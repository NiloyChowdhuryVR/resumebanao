
import React from 'react';

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children }) => {
  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-resume-primary mb-4 pb-2 border-b border-gray-200">{title}</h2>
      <div className="pl-0">{children}</div>
    </section>
  );
};

export default ResumeSection;
