const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateQuestions = async (role, difficulty, totalQuestions) => {
  try {
    const prompt = `
Generate exactly ${totalQuestions} interview questions.

Role: ${role}
Difficulty: ${difficulty}

Return ONLY valid JSON.

Example:

[
  {
    "question":"What is React?"
  },
  {
    "question":"Explain Virtual DOM."
  }
]
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return JSON.parse(text.replace(/```json|```/g, "").trim());

  } catch (error) {
    console.log(error);
    throw new Error("AI Question Generation Failed");
  }
};

module.exports = generateQuestions;