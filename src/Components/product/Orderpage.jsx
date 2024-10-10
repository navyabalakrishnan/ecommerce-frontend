import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orderpage() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/getorderbyid`, { withCredentials: true });
        setOrders(res.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full md:w-1/3 bg-white shadow-teal-950 shadow-inner rounded-lg p-4 pt-20 sm:pt-10">
        <h2 className="text-lg font-bold mb-4 text-center font-abril text-blue-950 mt-20 md:pt-10">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
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
    </div>
  );
}

export default Orderpage;
