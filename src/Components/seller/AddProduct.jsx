import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import Sellersidebar from './Sellersidebar';

const schema = yup.object({
  productName: yup.string().required('Product Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').positive().integer(),
  category: yup.string().required('Category is required'),
  image: yup.mixed().required('Image is required'),
});

const AddProduct = () => {
  const [sellerEmail, setSellerEmail] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const fetchSellerEmail = async () => {
      try {
        const sellerId = localStorage.getItem('sellerId');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/seller/get-selleremail`, {
          params: { sellerId }, 
          withCredentials: true,
        });
        setSellerEmail(res.data.email);
      } catch (error) {
        console.error("Error fetching seller's email:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchSellerEmail();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('sellerEmail', sellerEmail); 
    formData.append('category', data.category);
    formData.append('image', data.image[0]);

    try {
      const res = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/v1/product/add-products`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      ); 
      console.log(res.data);
      setMessage('Product added successfully!');
      navigate("/manage-products")
    } catch (error) {
      console.log(error);
      setMessage('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="flex flex-col mt-10 lg:flex-row">
      <Sellersidebar />
      <div className="flex-1 max-w-md  mx-auto bg-white p-6 sm:p-8 mt-8 sm:mt-20 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              {...register('productName')}
              className="mt-1 p-2 border rounded w-full"
            />
            {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="mt-1 p-2 border rounded w-full"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              {...register('price')}
              className="mt-1 p-2 border rounded w-full"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Seller Email</label>
            <input
              type="text"
              value={sellerEmail} 
              readOnly
              className="mt-1 p-2 border rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select {...register('category')} className="mt-1 p-2 border rounded w-full">
              <option value="">Select a category</option>
              {categories && categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              {...register('image')}
              className="mt-1 p-2 border rounded w-full"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

     <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add Product
          </button>
          {message && <span className="block mt-4 text-green-600 text-center">{message}</span>}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
