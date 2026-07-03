const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    skills: {
    type: String,
    default: ""
      },

      github: {
          type: String,
          default: ""
      },

      linkedin: {
          type: String,
          default: ""
      },

    profileImage: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);