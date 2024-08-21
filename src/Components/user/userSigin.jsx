


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import bcg from "../../assets/background.jpg"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

export default function Signin() {
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
        `${import.meta.env.VITE_API_URL}/api/v1/users/signin`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        console.log("Stored Token:", localStorage.getItem("authToken"));
        navigate("/home");
        console.log(res.data);
      } else if (res.data === "Password incorrect") {
        setErrormessage("Incorrect Password");
      } else if (res.data === "User does not exist") {
        setErrormessage("User does not exist. Please create an account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-screen">
      <img
        src={bcg}
        alt="Luxurious Furniture"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 p-6 rounded-md bg-white/80 backdrop-blur-sm shadow-lg"
        >
          <input
            {...register("email")}
            placeholder="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            placeholder="password"
            type="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
          {errormessage && (
            <p className="text-sm text-red-500">{errormessage}</p>
          )}
          <input
            type="submit"
            className="rounded-md bg-sky-950  py-1 text-white ease-in hover:scale-105 hover:transition-all hover:delay-150"
          />
          <p>
            User not created yet{" "}
            <Link to="/user-signup" className="text-blue-500 underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
