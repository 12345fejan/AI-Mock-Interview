const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const evaluateAnswer = async (question, answer) => {
  try {
    const prompt = `
You are a technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON.

{
  "score":8,
  "feedback":"Good answer...",
  "improvement":"Mention reconciliation and examples."
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return JSON.parse(
      text.replace(/```json|```/g, "").trim()
    );

  } catch (error) {
    console.log(error);

    return {
      score: 0,
      feedback: "Evaluation Failed",
      improvement: "",
    };
  }
};

module.exports = evaluateAnswer;