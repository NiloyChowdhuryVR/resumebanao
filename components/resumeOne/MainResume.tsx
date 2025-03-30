"use client";
import React, { useRef } from "react";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import ResumeHeader from "./ResumeHeader";
import ResumeSection from "./ResumeSection";
import ExperienceItem from "./ExperienceItem";
import EducationItem from "./EducationItem";
import SkillsSection from "./SkillsSection";
import ProjectItem from "./ProjectItem";

interface ResumeProps {
  personalInfo?: any;
  experiences?: any[];
  education?: any[];
  skills?: any[];
  projects?: { name: string; link?: string; description: string }[];
  githubUsername?: string;           // ✅ GitHub username field
  githubProjects?: any[];            // ✅ GitHub projects
}

const MainResume: React.FC<ResumeProps> = ({
  personalInfo = {},
  experiences = [],
  education = [],
  skills = [],
  projects = [],
  githubUsername = "",
  githubProjects = []
}) => {
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) {
      console.warn("Resume reference is null");
      return;
    }

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const scale = 2.5;
      const margin = 10;
      const pageHeight = 297; // A4 page height in mm
      const pageWidth = 210;  // A4 page width in mm

      const content = resumeRef.current;

      const canvas = await domtoimage.toPng(content, {
        quality: 1,
        width: content.clientWidth * scale,
        height: content.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${content.clientWidth}px`,
          height: `${content.clientHeight}px`,
        },
      });

      const img = new Image();
      img.src = canvas;

      img.onload = () => {
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (img.height * imgWidth) / img.width;

        let yPosition = margin;
        let currentPage = 1;

        while (yPosition < imgHeight) {
          const remainingHeight = Math.min(
            pageHeight - margin * 2,
            imgHeight - yPosition
          );

          if (remainingHeight > 30) {
            if (currentPage > 1) {
              pdf.addPage();
            }

            pdf.addImage(
              img,
              "PNG",
              margin,
              margin,
              imgWidth,
              remainingHeight,
              undefined,
              "FAST"
            );

            yPosition += remainingHeight;
            currentPage++;
          } else {
            break;  // Stop adding pages if content is too small
          }
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
        <div
          ref={resumeRef}
          className="bg-white shadow-lg rounded-lg p-10 text-sm leading-snug"
          style={{ fontSize: "12px", lineHeight: "1.2" }}
        >
          {/* ✅ Resume Header */}
          <ResumeHeader {...personalInfo} />

          {/* ✅ Experience Section */}
          <ResumeSection title="Experience">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </ResumeSection>

          {/* ✅ Education Section */}
          <ResumeSection title="Education">
            {education.map((edu, index) => (
              <EducationItem key={index} {...edu} />
            ))}
          </ResumeSection>

          {/* ✅ Skills Section */}
          <ResumeSection title="Skills">
            <SkillsSection skills={skills} />
          </ResumeSection>

          {/* ✅ Projects Section */}
          <ResumeSection title="Projects">
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))}
          </ResumeSection>

          {/* ✅ GitHub Projects Section */}
          {githubProjects.length > 0 && (
            <ResumeSection title="GitHub Projects">
              {githubProjects.map((repo, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-bold">
                    <a
                      href={repo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <p className="text-gray-700">{repo.description}</p>
                </div>
              ))}
            </ResumeSection>
          )}
        </div>

        {/* ✅ Download PDF Button */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={downloadPDF}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainResume;
