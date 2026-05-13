import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const chatWithAI = async (
  req,
  res
) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an AI assistant for KaamCall AI.

This platform helps:
- workers
- contractors
- labour hiring
- wages
- attendance
- jobs

Give simple helpful answers.

User Question:
${message}
`;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    res.json({
      reply: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};