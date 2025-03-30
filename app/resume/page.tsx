"use client";
import React, { useState } from "react";
import ResumeForm from "@/components/ResumeForm";
import MainResume from "@/components/resumeOne/MainResume";  // ✅ Import properly

const Page = () => {
  const [resumeData, setResumeData] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ResumeForm onResumeGenerated={setResumeData} />

      {resumeData && (
        <MainResume
          personalInfo={resumeData.personalInfo}
          experiences={resumeData.experiences}
          education={resumeData.education}
          skills={resumeData.skills}
          projects={resumeData.projects}
        />
      )}
    </div>
  );
};

export default Page;
