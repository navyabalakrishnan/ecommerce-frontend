import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SA from "../../assets/SA2.png";

const schema = yup.object({
  full_name: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  zipcode: yup.string().required('Zipcode is required'),
}).required();

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOnlinePaymentDisabled, setIsOnlinePaymentDisabled] = useState(true);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/cart`, { withCredentials: true });
        setCart(res.data.items || []);
        setTotal(res.data.total || 0);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    getCart();
  }, []);

  useEffect(() => {
    setIsOnlinePaymentDisabled(!isValid);
  }, [isValid]);

  const onSubmit = async (data) => {
    try {
      const shippingAddress = {
        address: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      };
  
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/order`, {
        full_name: data.full_name,
        email: data.email,
        shippingAddress,
      }, { withCredentials: true });
  
      console.log('Order Response:', response.data); 
      if (!response.data.orderId) {
        throw new Error('Order ID is not available');
      }
  
      return response.data.orderId; 
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };
  
  
  const paymentHandler = async (formData) => {
    try {
      const orderId = await onSubmit(formData);
  
      console.log('Order ID for Payment:', orderId);
  
      const paymentResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payment/order`, { amount: total }, { withCredentials: true });
      const order = paymentResponse.data.data;
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Liv.e",
        description: "Test Transaction",
        image: "https://i.ibb.co/5Y3m33n/test.png",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderId, 
            
          };
  
          try {
            console.log('Payment Verification Body:', body); 
            const validateResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payment/verify`, body, { withCredentials: true });
            if (validateResponse.data.message === "Payment Successfully") {
              navigate("/orderplaced");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
        },
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: "9999999999",
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
      });
  
      rzp1.open();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
  

  return (
    <div className="container mx-auto px-4">
      <div className='flex justify-center pt-24'>
        <img src={SA} alt="Shipping Address" className="w-32 h-32 sm:w-48 sm:h-48" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-6 md:p-8 dark:bg-gray-700 dark:text-white">
        <h2 className="text-xl font-thin mb-4 text-center text-blue-950">Your Order</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center mb-4">
            <img className='rounded-lg w-24 h-24 sm:w-32 sm:h-32' src={item.product?.image || 'default-image.jpg'} alt={item.product.name} />
            <div className='pl-0 sm:pl-10 text-center sm:text-left'>
              <h3 className='text-lg font-semibold'>{item.product.productName || 'Default Product Name'}</h3>
              <h3>Quantity: {item.quantity}</h3>
              <h3>Price: ₹{item.product.price}</h3>
            </div>
          </div>
        ))}
        <div className="text-center mt-4 font-semibold text-lg dark:text-white">
          <h3>Order Total: ₹{total}</h3>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-cyan-950 font-playfair text-4xl text-center mb-4">Shipping Address</h1>
        <p className="text-center mb-4">Please fill out all the fields.</p>
        <form
          onSubmit={handleSubmit(paymentHandler)}
          className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              {...register("full_name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              {...register("address")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input
              type="text"
              {...register("city")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
            <input
              type="text"
              {...register("state")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            <input
              type="text"
              {...register("country")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Zipcode</label>
            <input
              type="text"
              {...register("zipcode")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isOnlinePaymentDisabled}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
