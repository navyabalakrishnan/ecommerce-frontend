import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SA from "../../assets/SA2.png";
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
  const [addressmsg, setAddressmsg] = useState("")
  const navigate = useNavigate();

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

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

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
        paymentMethod: data.paymentMethod,
     
      },
        { withCredentials: true });
      console.log('Order created:', response.data);
      navigate("/shop")
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };


  return (
    <>
      <div className='flex justify-center pt-24'>
        <img src={SA} alt="Shipping Address" height={250} width={250} />
      </div>
      <div className="absolute mr-20 mt-72 top-0 right-0 w-2/5 bg-white shadow-teal-950 shadow-inner rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex justify-center font-abril text-blue-950">Your Order</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex font-bold text-lg">
            <span><img src={item.product.image} height={100} width={100} alt={item.product.name} /></span>
            <div className='pl-10'>
              <h3>{item.product.productName}</h3>
              <h3>Quantity: {item.quantity}</h3>
              <h3>Price: ${item.product.price}</h3>
            </div>
          </div>
        ))}
        <div className="font-abril flex justify-center text-lg">
          <h3>Order Total: ${total}</h3>
        </div>
        <div className='flex justify-around mt-4'>
          <button
            onClick={() => setValue('paymentMethod', 'cash_on_delivery')}
            className="bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif cursor-pointer">
            Cash on Delivery
          </button>
          <button
            onClick={() => setValue('paymentMethod', 'onlinePayment')}
            className="bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif cursor-pointer">
            Online Payment
          </button>
        </div>
        <button
          type="submit"
          className="bg-sky-800 w-full hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif cursor-pointer mt-4"
          onClick={handleSubmit(onSubmit)}
        >
          Place Order
        </button>
      </div>
      <div className="pl-20 mt-12">
        <h1 className="text-cyan-950 font-playfair text-4xl">Shipping Address</h1>
        <p>Please fill out all the fields.</p>
      </div>
      <div className="min-h-screen pl-20 flex justify-start">
        <div className="max-w-screen-sm">
          <div className="bg-white rounded shadow-lg shadow-cyan-700 p-4 px-4 md:p-8 mb-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 gap-y-2 grid-cols-1 font-serif">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        id="full_name"
                        {...register('full_name')}
                        className="h-10 border mt-1 rounded px-4 w-3/6 bg-gray-50"
                      />
                      {errors.full_name && <p className="text-red-600">{errors.full_name.message}</p>}
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        id="email"
                        {...register('email')}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="email@domain.com"
                      />
                      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        id="address"
                        {...register('address')}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.address && <p className="text-red-600">{errors.address.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        {...register('city')}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.city && <p className="text-red-600">{errors.city.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / Region</label>
                      <input
                        type="text"
                        id="country"
                        {...register('country')}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.country && <p className="text-red-600">{errors.country.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="state">State / Province</label>
                      <input
                        type="text"
                        id="state"
                        {...register('state')}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.state && <p className="text-red-600">{errors.state.message}</p>}
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="text"
                        id="zipcode"
                        {...register('zipcode')}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.zipcode && <p className="text-red-600">{errors.zipcode.message}</p>}
                    </div>
                    <div className="md:col-span-5 text-right">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                      </button>
                      {addressmsg && <div className='mt-4 text-green-900 font-semibold'>{addressmsg}</div>}

                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
