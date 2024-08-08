import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const schema = yup
  .object({
 
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();

export default function SellerSignup() {
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
        },
      );
      console.log(res.data);
     
    } catch (error) {
      console.log(error);
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
      <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
      <p>
   Create Account{" "}
        <Link to="/seller-signup" className="text-blue-500 underline">
          Signup
        </Link>
      </p>
    </form></div>
  );
}
