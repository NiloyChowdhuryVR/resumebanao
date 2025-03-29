import { chatSession } from "@/lib/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { jobDescription, currentSkills } = await req.json();

    if (!jobDescription || !currentSkills) {
      return NextResponse.json(
        { error: "Both job description and current skills are required" },
        { status: 400 }
      );
    }

    // Crafting the prompt
    const prompt = `
      My aim is to master the skills required for this job: ${jobDescription}.
      My current skillset includes: ${currentSkills}.
      Please list the additional skills I need to master this job.
    `;

    const result = await chatSession.sendMessage(prompt);

    // Extracting the response safely
    const AIResp = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";

    return NextResponse.json({ result: AIResp });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
