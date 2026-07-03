const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  startInterview,
  submitAnswer,
  getHistory,
  getResult,
} = require("../controllers/interviewController");

router.post("/start", protect, startInterview);

router.post("/submit", protect, submitAnswer);

router.get("/history", protect, getHistory);

router.get("/result/:id", protect, getResult);

module.exports = router;