"use client";
import { useState } from "react";

interface ChatInputProps {
  onGenerate: (roadmap: string) => void;
  onLoading: (state: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onGenerate, onLoading }) => {
  const [jobExpectation, setJobExpectation] = useState<string>("");
  const [currentSkills, setCurrentSkills] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobExpectation, currentSkills })
      });

      const data = await res.json();
      const roadmap = data.roadmap || "No roadmap received.";
      onGenerate(roadmap);

    } catch (error) {
      console.error("Failed to fetch roadmap:", error);
      onGenerate("Error generating roadmap.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter Job Expectation"
        value={jobExpectation}
        onChange={(e) => setJobExpectation(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Enter Current Skills (comma separated)"
        value={currentSkills}
        onChange={(e) => setCurrentSkills(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Roadmap
      </button>
    </form>
  );
};

export default ChatInput;
