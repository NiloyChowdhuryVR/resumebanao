"use client";
import React, { useState } from "react";
import axios from "axios";

const ResumeForm = ({ onResumeGenerated }: { onResumeGenerated: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      location: "",
    },
    experiences: [
      { title: "", company: "", location: "", startDate: "", endDate: "", description: "" }
    ],
    education: [
      { institution: "", degree: "", location: "", startDate: "", endDate: "", gpa: "" }
    ],
    skills: [
      { category: "", skills: [] }
    ],
    projects: [
      { name: "", description: "", link: "", technologies: [] }
    ],
    githubUsername: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    index?: number,
    field?: string
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };

    if (section === "githubUsername") {
      updatedData.githubUsername = value;
    } else if (index !== undefined && field) {
      if (section === "skills" && field === "skills") {
        (updatedData.skills[index].skills as any) = value.split(",").map((s) => s.trim());
      } else {
        (updatedData as any)[section][index][field] = value;
      }
    } else {
      (updatedData as any)[section][name] = value;
    }

    setFormData(updatedData);
  };

  const addField = (section: string) => {
    const updatedData = { ...formData };

    if (section === "experiences") {
      updatedData.experiences.push({ title: "", company: "", location: "", startDate: "", endDate: "", description: "" });
    } else if (section === "education") {
      updatedData.education.push({ institution: "", degree: "", location: "", startDate: "", endDate: "", gpa: "" });
    } else if (section === "skills") {
      updatedData.skills.push({ category: "", skills: [] });
    } else if (section === "projects") {
      updatedData.projects.push({ name: "", description: "", link: "", technologies: [] });
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/generateResume", formData);
      onResumeGenerated(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to generate resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Enter Your Resume Details</h2>

      <div className="grid gap-8">
        
        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="font-bold col-span-2 text-xl">Personal Info</h3>
          {Object.keys(formData.personalInfo).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={(formData.personalInfo as any)[key]}
              onChange={(e) => handleChange(e, "personalInfo")}
              className="border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition w-full"
            />
          ))}
        </div>

        {/* GitHub Username */}
        <div className="grid gap-4">
          <h3 className="font-bold text-xl">GitHub Username</h3>
          <input
            name="githubUsername"
            placeholder="GitHub Username"
            value={formData.githubUsername}
            onChange={(e) => handleChange(e, "githubUsername")}
            className="border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition w-full"
          />
        </div>

        {/* Experience */}
        <div>
          <h3 className="font-bold text-xl">Experience</h3>
          {formData.experiences.map((exp, index) => (
            <div key={index} className="mb-6 border p-4 rounded-md shadow-sm bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <input name="title" placeholder="Title" value={exp.title} onChange={(e) => handleChange(e, "experiences", index, "title")} className="border p-3 rounded-md" />
                <input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, "experiences", index, "company")} className="border p-3 rounded-md" />
                <input name="location" placeholder="Location" value={exp.location} onChange={(e) => handleChange(e, "experiences", index, "location")} className="border p-3 rounded-md" />
                <input name="startDate" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleChange(e, "experiences", index, "startDate")} className="border p-3 rounded-md" />
                <input name="endDate" placeholder="End Date" value={exp.endDate} onChange={(e) => handleChange(e, "experiences", index, "endDate")} className="border p-3 rounded-md" />
              </div>
              <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleChange(e, "experiences", index, "description")} className="border p-3 rounded-md w-full mt-4" />
            </div>
          ))}
          <button type="button" onClick={() => addField("experiences")} className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition">
            + Add Experience
          </button>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-bold text-xl">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-6 border p-4 rounded-md shadow-sm bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <input name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, "education", index, "institution")} className="border p-3 rounded-md" />
                <input name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, "education", index, "degree")} className="border p-3 rounded-md" />
                <input name="location" placeholder="Location" value={edu.location} onChange={(e) => handleChange(e, "education", index, "location")} className="border p-3 rounded-md" />
                <input name="startDate" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleChange(e, "education", index, "startDate")} className="border p-3 rounded-md" />
                <input name="endDate" placeholder="End Date" value={edu.endDate} onChange={(e) => handleChange(e, "education", index, "endDate")} className="border p-3 rounded-md" />
                <input name="gpa" placeholder="GPA" value={edu.gpa} onChange={(e) => handleChange(e, "education", index, "gpa")} className="border p-3 rounded-md" />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addField("education")} className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition">
            + Add Education
          </button>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-bold text-xl">Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index} className="mb-6 border p-4 rounded-md shadow-sm bg-gray-50">
              <input name="category" placeholder="Category" value={skill.category} onChange={(e) => handleChange(e, "skills", index, "category")} className="border p-3 rounded-md w-full" />
              <input name="skills" placeholder="Skills (comma-separated)" value={skill.skills.join(", ")} onChange={(e) => handleChange(e, "skills", index, "skills")} className="border p-3 rounded-md w-full mt-4" />
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition w-full">
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
