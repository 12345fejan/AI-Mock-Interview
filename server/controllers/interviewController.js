const Interview = require("../models/Interview");

const generateQuestions = require("../services/aiService");

const evaluateAnswer = require("../services/evaluateAnswer");
// ==========================
// Start Interview
// ==========================
exports.startInterview = async (req, res) => {
  try {
    const { role, difficulty, questions } = req.body;

    if (!role || !difficulty || !questions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

// Generate AI Questions
const aiQuestions = await generateQuestions(
  role,
  difficulty,
  questions
);



// Save Interview
const interview = await Interview.create({
  user: req.user._id,
  role,
  difficulty,
  questions: aiQuestions.map((q) => ({
  question: q.question,
  answer: "",
  feedback: "",
  score: 0,
})),
});



    res.status(201).json({
      success: true,
      interview,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Submit Answer
// ==========================
exports.submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const evaluation = await evaluateAnswer(
      interview.questions[questionIndex].question,
      answer
    );

    interview.questions[questionIndex].answer = answer;

    interview.questions[questionIndex].feedback =
      evaluation.feedback;

    interview.questions[questionIndex].score =
      evaluation.score;

    interview.totalScore += evaluation.score;

    await interview.save();

    res.json({
      success: true,
      feedback: evaluation.feedback,
      score: evaluation.score,
      improvement: evaluation.improvement,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Interview History
// ==========================
exports.getHistory = async (req, res) => {

  try {

    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      interviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================
// Get Result
// ==========================
exports.getResult = async (req, res) => {

  try {

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.json({
      success: true,
      interview,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};