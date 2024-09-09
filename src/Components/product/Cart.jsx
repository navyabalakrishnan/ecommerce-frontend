import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/cart`, { withCredentials: true });
        setCart(res.data.items || []);
        setTotal(res.data.total || 0);
        setCartId(res.data._id); 
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    const getOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/getorderbyid`, { withCredentials: true });
        setOrders(res.data || []); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    getCart();
    getOrders();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/cart/${productId}`, {
        withCredentials: true,
        data: { cartId },
      });
      const data = res.data;
      if (data.message === "Item is deleted") {
        setCart(cart.filter(item => item.product._id !== productId)); 
        setTotal(total - (cart.find(item => item.product._id === productId)?.product.price * cart.find(item => item.product._id === productId)?.quantity || 0));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 mt-10 lg:p-12">
      <div className='pt-8 md:pt-12'>
        <h1 className='text-cyan-950 font-playfair text-3xl md:text-4xl text-center dark:text-white'>Your Cart</h1>
      </div>
      

      <div className="flex justify-between items-start mt-10 md:flex flex-col">
    
        <div className="w-full md:w-1/3 bg-white shadow-teal-950 shadow-inner rounded-lg p-4 dark:bg-gray-700 dark:text-white">
          <h2 className="text-lg font-bold mb-4 text-center font-abril text-blue-950 dark:text-white">Cart Total</h2>
          <div className="flex justify-between font-bold text-lg dark:text-black">
            <span>Total:</span>
            <span>Rs {total}</span>
          </div>
          {total < 0 ? (
          <Link to="/checkout">
            <button className="w-full bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full mt-4">
              Proceed to Checkout
            </button>
          </Link>
          ):(
      
         <button className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-full mt-4 cursor-not-allowed" disabled>
           Proceed to Checkout
         </button>
    
        )}
        </div>
 <button 
            className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full mt-10 flex flex-wrap"
            onClick={() => setShowOrders(!showOrders)} 
          >
            {showOrders ? 'Hide Orders' : 'Show Orders'}
          </button>

   
        {showOrders && (
          <div className="w-full md:w-1/3 bg-white shadow-teal-950 shadow-inner rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-center font-abril text-blue-950">Your Orders</h2>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="mb-4">
                  <h3 className="font-bold">Order #{order._id}</h3>
                  {order.products.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 mr-4" />
                      <h4 className="font-bold">{item.product.name}</h4>
                      <span className="font-bold">Rs {item.product.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-lg dark:text-black mt-4">
                    <span>Order Total:</span>
                    <span>Rs {order.totalAmount}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="overflow-x-auto mt-20">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-500">
          <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Image</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Product</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Price</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Quantity</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Remove</th>
            </tr>
          </thead>
          <tbody className=' dark:text-white'>
            {cart.map((item, index) => (
              <tr key={`${item.product?._id}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <img src={item.product?.image} alt={item.product?.productName} className='w-24 h-24 object-cover rounded-lg' />
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap  dark:text-white ">
                  {item.product?.productName}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 ">₹{item.product?.price}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">Quantity: {item.quantity}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <button
                    className="bg-gray-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                    type="button"
                    onClick={() => handleRemove(item.product?._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
