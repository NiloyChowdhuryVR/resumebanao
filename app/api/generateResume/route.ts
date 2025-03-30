import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { personalInfo, experiences, education, skills, projects, githubUsername } = await req.json();

  console.log("Received GitHub Username:", githubUsername);

  // ✅ Fetch GitHub Repos if GitHub Username is provided
  let githubProjects = [];

  if (githubUsername) {
    try {
      const githubResponse = await axios.get(`https://api.github.com/users/${githubUsername}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        }
      });

      const repos = githubResponse.data;

      // ✅ Sort repos by stars (descending) and select the top 2
      const topRepos = repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 2)
        .map((repo: any) => ({
          name: repo.name,
          description: repo.description || "No description provided",
          link: repo.html_url,
          technologies: ["JavaScript", "React"]  // Placeholder for tech stack
        }));

      githubProjects = topRepos;
    } catch (error) {
      console.error("Failed to fetch GitHub repositories:", error);
    }
  }

  // ✅ Simplified Gemini Prompt Format
  const prompt = `
Generate a professional ATS-friendly strictly JSON resume with the following details:
- Name: ${personalInfo.name}
- Title: ${personalInfo.title}
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- LinkedIn: ${personalInfo.linkedin}
- GitHub: ${personalInfo.github}
- Location: ${personalInfo.location}
- Experience: ${JSON.stringify(experiences)}
- Education: ${JSON.stringify(education)}
- Skills: ${JSON.stringify(skills)}
- Projects: ${JSON.stringify(projects.concat(githubProjects))}  

Also Include:
- Bullet points for clarity, each bullet point must have some hard-coded numbers. Do not use any symbol at the start of them.
- Strictly return only JSON format, no language specifier or backticks.
- Select and include only the **2 best projects** based on their impact, complexity, and relevance.
- Never leave any details blank, like experience, education, and others. If it is blank, just enter some mock details.
- Use relevant keywords naturally throughout the resume.

Instructions:
- Ensure the resume is ATS-optimized, concise, and results-driven.
  `;

  try {
    const result = await chatSession.sendMessage(prompt);
    let AIResp = await result.response.text();

    console.log("Gemini Raw Response:", AIResp);

    if (!AIResp) {
      console.error("No response received from Gemini");
      return NextResponse.json({ error: "No response received from Gemini" });
    }

    // ✅ Clean the JSON by removing backticks and "```json" if present
    AIResp = AIResp
      .replace(/^```json/, "")    // Remove starting ```json
      .replace(/```$/, "")        // Remove trailing ```

    console.log("Cleaned Response:", AIResp);

    // ✅ Parse the cleaned response
    const geminiResume = JSON.parse(AIResp);

    // ✅ Map Gemini's structure to your expected structure
    const mappedResume = {
      personalInfo: {
        name: geminiResume.name || personalInfo.name || "",
        title: geminiResume.title || personalInfo.title || "",
        email: personalInfo.email || "",
        phone: personalInfo.phone || "",
        linkedin: personalInfo.linkedin || "",
        github: personalInfo.github || "",
        location: personalInfo.location || ""
      },
      experiences: geminiResume.experience || experiences || [],
      education: geminiResume.education || education || [],
      skills: geminiResume.skills || skills || [],
      projects: [
        ...(geminiResume.projects || []).slice(0, 2),  // ✅ Only 2 Best Projects
      ]
    };

    console.log("Mapped Resume:", mappedResume);

    return NextResponse.json(mappedResume);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to generate resume" });
  }
}
