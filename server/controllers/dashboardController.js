const Interview = require("../models/Interview");

exports.getDashboard = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id });

    const totalInterviews = interviews.length;

    let totalScore = 0;

    interviews.forEach((item) => {
      totalScore += item.totalScore || 0;
    });

    const averageScore =
      totalInterviews > 0
        ? (totalScore / totalInterviews).toFixed(1)
        : 0;

    const recentInterviews = await Interview.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      totalInterviews,
      averageScore,
      recentInterviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};