// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API!;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

// const generationConfig = {
//   temperature: 0.9,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 4096,
//   responseMimeType: "text/plain",
// };

// export const chatSession = model.startChat({
//   generationConfig,
//   history: [],
// });


import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API;

if (!apiKey) {
  throw new Error("Gemini API key is missing!");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const chatSession = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }).startChat({
  history: [],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 3000,
  },
});
