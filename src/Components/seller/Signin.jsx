import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  })
  .required();

export default function SellerSignin() {
  const navigate = useNavigate();
  const [errormessage, setErrormessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/seller/signin`,
        data,
        { withCredentials: true }
      );

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("sellerId", res.data.sellerId);

        if (res.data.role === "admin") {
          navigate("/manage-sellers");
        } else if (res.data.role === "seller") {
          navigate("/add-product");
        }
      } else {
        setErrormessage(res.data.message || "Sign-in failed");
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
      setErrormessage("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        {errormessage && (
          <p className="text-sm text-red-500 mb-4">{errormessage}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/seller-signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
