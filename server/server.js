require("dotenv").config();

const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const rateLimit = require("express-rate-limit");

const interviewRoutes = require("./routes/interviewRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Render ke liye ye line add karo
app.set("trust proxy", 1);

connectDB();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

const limiter = rateLimit({

windowMs:15*60*1000,

max:100

});

app.use(limiter);

app.use("/api/auth", authRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/uploads",express.static("uploads"));

app.get("/",(req,res)=>{

res.send("AI Mock Interview Backend Running");

});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(`Server Running On Port ${PORT}`);

});