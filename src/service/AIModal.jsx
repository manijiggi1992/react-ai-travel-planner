import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOLE_GEMINI_API_KEY });

export const chatSession = (prompt) => {
  return ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
}
