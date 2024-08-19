



import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


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

  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all', 
  });


  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/cart', { withCredentials: true });
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

      const response = await axios.post('http://localhost:3000/api/v1/order', {
        full_name: data.full_name,
        email: data.email,
        shippingAddress,
        paymentMethod: 'onlinePayment',
      }, { withCredentials: true });

      console.log('Order created:', response.data);
      return response.data._id; 
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

   const paymentHandler = async (formData) => {
    try {
      const orderId = await onSubmit(formData);

      const paymentResponse = await axios.post("http://localhost:3000/api/v1/payment/order", { amount: total }, { withCredentials: true });
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
            const validateResponse = await axios.post("http://localhost:3000/api/v1/payment/verify", body, { withCredentials: true });
            console.log('Payment verification response:', validateResponse.data);

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
    <div className="flex flex-col items-center justify-center h-screen mt-48 bg-gray-100">
      <form
        onSubmit={handleSubmit(paymentHandler)}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register("full_name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            {...register("city")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <input
            type="text"
            {...register("state")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            {...register("country")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Zipcode
          </label>
          <input
            type="text"
            {...register("zipcode")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode.message}</p>}
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className={`bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif cursor-pointer ${isOnlinePaymentDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isOnlinePaymentDisabled}
          >
            Pay Online
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;

