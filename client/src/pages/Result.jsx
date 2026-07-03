import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [interview, setInterview] = useState(null);

  useEffect(() => {
    if (state?.interviewId) {
      loadResult();
    }
  }, []);

  const loadResult = async () => {
    try {
      const res = await API.get(
        `/interview/result/${state.interviewId}`
      );

      setInterview(res.data.interview);
    } catch (error) {
      console.log(error);
    }
  };

  if (!state?.interviewId) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold text-red-600">
          Result Not Found
        </h1>
      </div>
    );
  }

  if (!interview) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-6xl mx-auto p-8">

          <h1 className="text-4xl font-bold mb-8">
            Interview Result
          </h1>

          {/* Summary Cards */}

          <div className="grid md:grid-cols-4 gap-5 mb-10">

            <div className="bg-blue-600 text-white rounded-xl p-6">

              <h3 className="text-lg">
                Role
              </h3>

              <h2 className="text-2xl font-bold mt-2">
                {interview.role}
              </h2>

            </div>

            <div className="bg-green-600 text-white rounded-xl p-6">

              <h3 className="text-lg">
                Difficulty
              </h3>

              <h2 className="text-2xl font-bold mt-2">
                {interview.difficulty}
              </h2>

            </div>

            <div className="bg-purple-600 text-white rounded-xl p-6">

              <h3 className="text-lg">
                Questions
              </h3>

              <h2 className="text-2xl font-bold mt-2">
                {interview.questions.length}
              </h2>

            </div>

            <div className="bg-orange-500 text-white rounded-xl p-6">

              <h3 className="text-lg">
                Total Score
              </h3>

              <h2 className="text-2xl font-bold mt-2">
                {interview.totalScore}
              </h2>

            </div>

          </div>

          {/* Questions */}

          <div className="space-y-6">

            {interview.questions.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <h2 className="text-xl font-bold">

                  Q{index + 1}. {item.question}

                </h2>

                <div className="mt-5">

                  <h3 className="font-semibold text-blue-600">
                    Your Answer
                  </h3>

                  <p className="mt-2 text-gray-700">
                    {item.answer || "Not Answered"}
                  </p>

                </div>

                <div className="mt-5">

                  <h3 className="font-semibold text-green-600">
                    AI Feedback
                  </h3>

                  <p className="mt-2">
                    {item.feedback || "No Feedback"}
                  </p>

                </div>

                <div className="mt-5">

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">

                    Score : {item.score || 0}/10

                  </span>

                </div>

              </div>

            ))}

          </div>

          <div className="mt-10">

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Back To Dashboard
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Result;