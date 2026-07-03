import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 text-white">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">

        <h1 className="text-3xl font-bold">
          AI Mock Interview
        </h1>

        <div className="space-x-5">

          <Link
            to="/login"
            className="hover:text-gray-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold"
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          <h1 className="text-6xl font-bold leading-tight">

            Crack Your

            <span className="text-yellow-300">

              {" "}Dream Job

            </span>

          </h1>

          <p className="mt-8 text-xl text-gray-200">

            Practice Technical and HR Interviews
            using AI.

            Get instant feedback, score,
            analytics and improve every day.

          </p>

          <div className="mt-10">

            <Link
              to="/register"
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300"
            >
              Start Free
            </Link>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            className="rounded-3xl shadow-2xl"
            alt="Interview"
          />

        </motion.div>

      </div>

    </div>
  );
};

export default Landing;