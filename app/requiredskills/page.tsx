"use client";
import { useState } from "react";

export default function GeminiForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    setLoading(true);
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription, currentSkills })
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gemini Skill Recommender</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter Current Skills"
          value={currentSkills}
          onChange={(e) => setCurrentSkills(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={sendPrompt}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Get Required Skills"}
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">Recommended Skills:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
