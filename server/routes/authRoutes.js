const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const upload=require("../config/multer");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post(

"/resume",

protect,

upload.single("resume"),

uploadResume

);

router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  updateProfile
);

module.exports = router;