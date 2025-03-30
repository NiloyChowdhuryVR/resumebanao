import React from 'react';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';

interface ResumeHeaderProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  location?: string;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  name,
  title,
  email,
  phone,
  linkedin,
  github,
  location
}) => {
  return (
    <header className="mb-8 animate-fade-in">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-resume-primary mb-2">{name}</h1>
        <h2 className="text-xl md:text-2xl text-resume-secondary mb-4">{title}</h2>
      </div>

      {/* ✅ Single-line contact info */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-resume-secondary">
        <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-resume-accent transition-colors" aria-label="Email">
          <Mail size={16} />
          <span>{email}</span>
        </a>
        <a href={`tel:${phone}`} className="flex items-center gap-1 hover:text-resume-accent transition-colors" aria-label="Phone">
          <Phone size={16} />
          <span>{phone}</span>
        </a>
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-resume-accent transition-colors" aria-label="LinkedIn">
            <Linkedin size={16} />
            <span>{linkedin}</span>
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-resume-accent transition-colors" aria-label="GitHub">
            <Github size={16} />
            <span>{github}</span>
          </a>
        )}
        {location && (
          <div className="flex items-center gap-1" aria-label="Location">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResumeHeader;
