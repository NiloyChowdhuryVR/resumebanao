"use client";
import React, { useRef } from "react";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

import ResumeHeader from "./ResumeHeader";
import ResumeSection from "./ResumeSection";
import ExperienceItem from "./ExperienceItem";
import EducationItem from "./EducationItem";
import SkillsSection from "./SkillsSection";
import PrintButton from "./PrintButton";


const MainResume = () => {
  const resumeRef = useRef<HTMLDivElement | null>(null);  // ✅ Null safety with useRef

  const personalInfo = {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    linkedin: "https://www.linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    location: "San Francisco, CA",
  };

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2021",
      endDate: "Present",
      description: [
        "Led development of a microservices architecture that improved system reliability by 35% and reduced deployment time by 40%",
        "Architected and implemented a real-time analytics dashboard using React and D3.js, processing over 10M data points daily",
      ],
      technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes"]
    }
  ];

  const education = [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      startDate: "Aug 2012",
      endDate: "May 2016",
      gpa: "3.8/4.0",
      description: [
        "Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development, Machine Learning",
        "Senior Project: Developed a mobile app for campus navigation using React Native"
      ]
    }
  ];

  const skills = [
    {
      category: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3", "SQL"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React", "Node.js", "Express", "Next.js", "Redux", "Jest", "Tailwind CSS"]
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "Docker", "Kubernetes", "AWS", "CI/CD", "Jira", "Figma"]
    }
  ];

  // ✅ New Projects Section
  const projects = [
    {
      name: "Veezio - Video Streaming Platform",
      description: "Developed a YouTube clone with Mux-powered streaming, secure authentication, and real-time interactions.",
      link: "https://veezio.example.com",
      technologies: ["Next.js", "React", "Mux", "PostgreSQL", "Tailwind CSS"]
    },
    {
      name: "DevSync - Collaborative Code Editor",
      description: "Real-time collaborative code editor with syntax highlighting and multi-user support.",
      link: "https://devsync.example.com",
      technologies: ["Next.js", "React", "Socket.io", "Prisma", "PostgreSQL"]
    }
  ];

  // ✅ PDF Download Function with Projects
  const downloadPDF = async () => {
    if (!resumeRef.current) {
      console.warn("Resume reference is null");
      return;
    }

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const scale = 2.5;
      const margin = 5;

      const content = resumeRef.current;

      // ✅ Convert the entire resume into an image
      const blob = await domtoimage.toPng(content, {
        quality: 1,
        width: content.clientWidth * scale,
        height: content.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${content.clientWidth}px`,
          height: `${content.clientHeight}px`
        }
      });

      const img = new Image();
      img.src = blob;

      img.onload = () => {
        const imgWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const imgHeight = (img.height * imgWidth) / img.width;

        pdf.addImage(img, "PNG", margin, margin, imgWidth, imgHeight);

        // Add clickable links
        const rect = resumeRef.current?.getBoundingClientRect();
        if (rect) {
          const links = resumeRef.current?.querySelectorAll("a");
          links?.forEach((link) => {
            const href = link.getAttribute("href");
            if (href) {
              const linkRect = link.getBoundingClientRect();
              const x = margin + ((linkRect.left - rect.left) / rect.width) * imgWidth;
              const y = margin + ((linkRect.top - rect.top) / rect.height) * imgHeight;
              const width = (linkRect.width / rect.width) * imgWidth;
              const height = (linkRect.height / rect.height) * imgHeight;

              pdf.link(x, y, width, height, { url: href });
            }
          });
        }

        pdf.save("Resume.pdf");
      };
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* ✅ PDF Content Section */}
        <div 
          ref={resumeRef} 
          className="bg-white shadow-lg rounded-lg p-10 text-sm leading-snug"
          style={{ fontSize: "12px", lineHeight: "1.2" }}
        >
          <ResumeHeader {...personalInfo} />

          <ResumeSection title="Experience">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </ResumeSection>

          <ResumeSection title="Education">
            {education.map((edu, index) => (
              <EducationItem key={index} {...edu} />
            ))}
          </ResumeSection>

          <ResumeSection title="Skills">
            <SkillsSection skills={skills} />
          </ResumeSection>

          {/* ✅ Projects Section */}
          <ResumeSection title="Projects">
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.name} 
                  </a>
                </h3>
                <p className="text-gray-700">{project.description}</p>
                <div className="text-gray-500">
                  <strong>Tech:</strong> {project.technologies.join(", ")}
                </div>
              </div>
            ))}
          </ResumeSection>
        </div>

        {/* ✅ Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <PrintButton />
          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainResume;
