import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaMicrophone, FaStop } from "react-icons/fa";
import API from "../services/api";

const Interview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const interview = state?.interview;

  // Safety Check
  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">
          No Interview Found
        </h1>
      </div>
    );
  }

  const questions = interview.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎤 Speech Recognition States
const [listening, setListening] = useState(false);
const [recognition, setRecognition] = useState(null);

  const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognitionInstance = new SpeechRecognition();

  recognitionInstance.lang = "en-US";
recognitionInstance.continuous = false;
recognitionInstance.interimResults = false;

  recognitionInstance.onstart = () => {
    setListening(true);
  };

recognitionInstance.onresult = (event) => {

  const transcript =
    event.results[0][0].transcript;

  setAnswer((prev) => {

    if (prev.trim() === "") {
      return transcript;
    }

    return prev + " " + transcript;

  });

};

  recognitionInstance.onerror = (event) => {
    console.log(event.error);
  };

 recognitionInstance.onend = () => {

  setListening(false);

  setRecognition(null);

};

  recognitionInstance.start();

  setRecognition(recognitionInstance);
};

const stopListening = () => {

  if (recognition) {

    recognition.stop();

    setListening(false);

  }

};

  // Save Answer & Go Next
  const nextQuestion = async () => {
    try {
      await API.post("/interview/submit", {
        interviewId: interview._id,
        questionIndex: currentQuestion,
        answer,
      });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setAnswer("");
      } else {
        navigate("/result", {
          state: {
            interviewId: interview._id,
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save answer.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-5xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow-lg p-8">

          {/* Header */}
          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-bold">
                {interview.role}
              </h2>

              <p className="text-gray-500 mt-1">
                Difficulty : {interview.difficulty}
              </p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
              Question {currentQuestion + 1} / {questions.length}
            </span>

          </div>

          {/* Question */}
          <div className="mt-10">

            <h1 className="text-3xl font-bold leading-relaxed">
              {questions[currentQuestion].question}
            </h1>

          </div>

          {/* Answer Box */}
          <textarea
            rows="8"
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border mt-8 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-4 mt-5">

  {!listening ? (

    <button
    type="button"
      onClick={startListening}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
    >
      <FaMicrophone />

      Start Speaking
    </button>

  ) : (

    <button
     type="button"
      onClick={stopListening}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
    >
      <FaStop />

      Stop Recording
    </button>

  )}

</div>

          {/* Buttons */}
          <div className="flex justify-end mt-8">


            <button
              onClick={async () => {
                setLoading(true);

                await nextQuestion();

                setLoading(false);
              }}
              disabled={loading}
              className={`px-8 py-3 rounded-lg text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >


              {
              loading
                ? "Saving..."
                : currentQuestion === questions.length - 1
                ? "Finish Interview"
                : "Next Question"
            }
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Interview;