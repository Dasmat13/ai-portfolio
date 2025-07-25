import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateSummary(text: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Summarize the following blog in 3-5 lines." },
      { role: "user", content: text }
    ]
  });

  return res.choices[0].message.content || "";
}
