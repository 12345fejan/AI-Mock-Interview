import { useState } from "react";
import { useNavigate } from "react-router-dom";


import API from "../services/api";
import { toast } from "react-toastify";

const InterviewSetup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "Frontend Developer",
        difficulty: "Easy",
        questions: 5
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

 const startInterview = async () => {
  try {
    const res = await API.post("/interview/start", {
  role: formData.role,
  difficulty: formData.difficulty,
  questions: Number(formData.questions),
});

toast.success("Interview Started");

navigate("/interview", {
  state: {
    interview: res.data.interview,
  },
});
  } catch (err) {
  console.log(err);

  toast.error(
    err.response?.data?.message || "Unable to Start Interview"
  );
}
};

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Setup Your Interview
                </h1>

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <div className="mb-6">

                        <label className="font-semibold block mb-2">
                            Job Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        >

                            <option>Frontend Developer</option>
                            <option>Backend Developer</option>
                            <option>Full Stack Developer</option>
                            <option>Java Developer</option>
                            <option>Python Developer</option>

                        </select>

                    </div>

                    <div className="mb-6">

                        <label className="font-semibold block mb-2">
                            Difficulty
                        </label>

                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        >

                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>

                        </select>

                    </div>

                    <div className="mb-8">

                        <label className="font-semibold block mb-2">
                            Number of Questions
                        </label>

                        <select
                            name="questions"
                            value={formData.questions}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        >

                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>

                        </select>

                    </div>

                    <button
                        onClick={startInterview}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Start Interview
                    </button>

                </div>

            </div>

        </div>

    );
};

export default InterviewSetup;