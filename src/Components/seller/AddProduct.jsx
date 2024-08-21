import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Sellersidebar from './Sellersidebar';

const schema = yup.object({
  productName: yup.string().required('Product Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').positive().integer(),
  sellerEmail: yup.string().email('Invalid email').required('Seller Email is required'),
  category: yup.string().required('Category is required'),
  image: yup.mixed().required('Image is required'),
});

const AddProduct = () => {
  const [sellers, setSellers] = useState([]);
  const [categories, setCategory] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const getSellers = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/seller/get-sellers`);
        setSellers(res.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/category/get-category`);
        setCategory(res.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getSellers();
    fetchCategories();
  }, []);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('description', data.description);
    formData.append('price', data.price);

    formData.append('sellerEmail', loggedInSellerEmail);
    formData.append('category', data.category);
    formData.append('image', data.image[0]);

    try {
    
      const res = await axios.post(
        `http://localhost:3000/api/v1/product/add-products`,
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
    } catch (error) {
      console.log(error);
      setMessage('Failed to add product. Please try again.');
    }
  };
  return (
    <>
      <Sellersidebar />
      <div className="max-w-md mx-auto bg-white p-8 mt-20 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              {...register('productName')}
              className="mt-1 p-2 border w-full"
            />
            <p className="text-red-500">{errors.productName?.message}</p>
          </div>

        
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="mt-1 p-2 border w-full"
            ></textarea>
            <p className="text-red-500">{errors.description?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              {...register('price')}
              className="mt-1 p-2 border w-full"
            />
            <p className="text-red-500">{errors.price?.message}</p>
          </div>
         
          <div className="mb-4">
            <label className="block text-gray-700">Seller Email</label>
            <select {...register('sellerEmail')} className="mt-1 p-2 border w-full">
              {sellers.map((seller, index) => (
                <option key={index} value={seller.email}>
                  {seller.email}
                </option>
              ))}
            </select>
            <p className="text-red-500">{errors.sellerEmail?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select {...register('category')} className="mt-1 p-2 border w-full">
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-red-500">{errors.category?.message}</p>
          </div>
   <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              {...register('image')}
              className="mt-1 p-2 border w-full"
            />
            <p className="text-red-500">{errors.image?.message}</p>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Product
          </button>
          {message && <span className="block mt-4 text-green-600">{message}</span>}
        </form>
      </div>
    </>
  );
};

export default AddProduct;
