import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is required"),
  })
  .required();

export default function Signup() {
   const navigate = useNavigate();
   const [errorMessage, setErrormessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
 
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/v1/seller/signup`,
        data,
        {
          withCredentials: true,
        },
      );
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);

        navigate("/seller-signin");
      } 
    
      else {
      
        setErrormessage(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrormessage(error.response.data.message);
      console.log(error);
    }
    }
  };
  return (
    <div className="pt-28 flex justify-center "> 
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 rounded-md border p-6"
    >
      <input
        {...register("name")}
        placeholder="name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.name && <p>{errors.name.message}</p>}
      <input
        {...register("email")}
        placeholder="email"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && <p>{errors.email.message}</p>}
       {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <input
        {...register("password")}
        type="password"
        placeholder="password"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
      <p>
        seller already exist{" "}
        <Link to="/seller-signin" className="text-blue-500 underline">
              Sign In
            </Link>
      </p>
    </form>
    </div>
  );
}
