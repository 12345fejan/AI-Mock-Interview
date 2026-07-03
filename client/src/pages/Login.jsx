import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", data);

      login(res.data.user, res.data.token);

       toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
    const message =
    err.response?.data?.message || "Invalid Email or Password";

        setError(message);
        toast.error(message);
  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">

            <label>Email</label>

            <input
              className="w-full border p-3 rounded-lg mt-2"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
            />

            <p className="text-red-500">
              {errors.email?.message}
            </p>

          </div>

          <div className="mb-6">

            <label>Password</label>

            <input
              className="w-full border p-3 rounded-lg mt-2"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <p className="text-red-500">
              {errors.password?.message}
            </p>

          </div>

        <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;