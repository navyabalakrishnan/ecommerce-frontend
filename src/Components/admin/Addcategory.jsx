import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required("Category name is required"),
    description: yup.string().optional(),
  })
  .required();

export default function AddCategory() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/category/create`, data);

      if (res.status === 201) {
        alert("Category created successfully");
      } else {
        alert("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("An error occurred while creating the category");
    }
  };

  return (
    <div className="p-4  mt-20">
      <h1 className="text-xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <input
          {...register("name")}
          placeholder="Category Name"
          className="border p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="border p-2"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Category
        </button>
      </form>
    </div>
  );
}
