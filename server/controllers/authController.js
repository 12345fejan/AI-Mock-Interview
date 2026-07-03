const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Profile
// ==============================

exports.getProfile = async (req,res)=>{

    try{

        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json({

            success:true,

            user

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};


// ==============================
// Update Profile
// ==============================

exports.updateProfile = async (req,res)=>{

    try{

        const user = await User.findById(req.user._id);

        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }

        user.name = req.body.name || user.name;

        user.skills = req.body.skills || user.skills;

        user.github = req.body.github || user.github;

        user.linkedin = req.body.linkedin || user.linkedin;

        await user.save();

        res.status(200).json({

            success:true,

            message:"Profile Updated Successfully",

            user

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



exports.uploadResume=async(req,res)=>{

try{

const user=await User.findById(req.user._id);

user.resume=req.file.filename;

await user.save();

res.json({

success:true,

resume:user.resume

})

}

catch(error){

res.status(500).json({

success:false,

message:error.message

})

}

}



