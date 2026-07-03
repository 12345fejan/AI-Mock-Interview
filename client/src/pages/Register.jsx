import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await API.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3"
              {...register("name", {
                required: "Name is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.name?.message}
            </p>

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3"
              {...register("email", {
                required: "Email is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.email?.message}
            </p>

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg p-3"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>

          </div>

          {/* Confirm Password */}

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border rounded-lg p-3"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") ||
                  "Passwords do not match",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword?.message}
            </p>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;