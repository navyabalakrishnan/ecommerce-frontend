import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
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
        "http://localhost:3000/api/v1/seller/signin",
        data,
        {
          withCredentials: true,
        }
      );
     
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("sellerId", res.data.sellerId);
   

        navigate("/add-product"); 
      } else if (res.data.message === "Password incorrect") {
        setErrormessage("Incorrect Password");
      } else if (res.data.message === "seller does not exist") {
        setErrormessage("Seller does not exist. Please create an account");
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
      setErrormessage("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div className="p-60">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-0 rounded-md border "
      >
        <input
          {...register("email")}
          placeholder="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.password && <p>{errors.password.message}</p>}
        {errormessage && (
          <p className="text-sm text-red-500">{errormessage}</p>
        )}
        <input
          type="submit"
          className="rounded-md bg-blue-500 py-1 text-white"
        />
        <p>
          Create Account{" "}
          <Link to="/seller-signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
