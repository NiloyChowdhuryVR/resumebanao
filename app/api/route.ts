import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, skills, education } = await req.json();

  const prompt = `
  Generate a professional resume for:
  - Name: ${name}
  - Skills: ${skills.join(', ')}
  - Education: ${education}

  Include:
  - A short summary
  - Skills section
  - Education section
  - Use bullet points for clarity.
  `;

  try {
    const result = await chatSession.sendMessage(prompt);
    const AIResp = result.response.text();
    
    return NextResponse.json({ result: AIResp });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to generate resume" });
  }
}

