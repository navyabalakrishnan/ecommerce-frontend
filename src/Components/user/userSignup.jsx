import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

import bcg from "../../assets/background.jpg"

import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/signup`,
        data,
        {
          withCredentials: true,
        },
      );
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        console.log("Stored Token:", localStorage.getItem("authToken"));
        navigate("/home");
        console.log(res.data);
      } else if (res.data === "Password incorrect") {
        setErrormessage("Incorrect Password");
      } else if (res.data === "User  does not exist") {
        setErrormessage("User does not exist. Please create an account");
      }
      console.log(res.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  return ( <div className="relative h-screen">
      <img
        src={bcg}
        alt="Luxurious Furniture"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-4">
     
      <div className="absolute inset-0 flex justify-center items-center">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 rounded-md border p-5 bg-white/80 shadow-md"
        >
          <input
            {...register("name")}
            placeholder="Enter your name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          
          <input
            {...register("email")}
            placeholder="Email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          
          <input type="submit" className="rounded-md bg-blue-500 py-2 text-white cursor-pointer" />
          <p className="mt-4 text-center">
            User already exists?{" "}
            <Link to="/user-signin" className="text-blue-500 underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}
