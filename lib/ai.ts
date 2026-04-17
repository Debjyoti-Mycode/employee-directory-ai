import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getSalarySuggestion(position: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an HR assistant.

Give a realistic salary range in INR for this job role in India:
${position}

Keep it short (2-3 lines).
`;

  let retries = 3;

  while (retries > 0) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      if (error?.status === 503 || error?.message?.includes("503")) {
        retries--;
        console.log("Retrying AI...");

        await new Promise((res) => setTimeout(res, 1500)); // wait 1.5s
      } else {
        throw error;
      }
    }
  }

  return " AI service is busy right now. Please try again in a few seconds.";
}