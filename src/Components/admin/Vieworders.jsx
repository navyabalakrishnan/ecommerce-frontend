import React, { useState, useEffect } from 'react';
import Adminsidebar from './AdminSidebar';
import axios from 'axios';

function Vieworders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/getAllOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('Fetched orders', res.data);
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <Adminsidebar />
      <div className="relative overflow-x-auto flex justify-center pl-40 pt-40">
        <table className="w-3/4 text-sm pl-40 text-gray-500 dark:text-gray-500">
          <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Total Amount</th>
              <th scope="col" className="px-6 py-3">Payment Status</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                {order.products.map(({ product, quantity }) => (
                  <tr
                   
                    className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                
                    <td className="px-6 py-4">{product ? product.productName : "Product Not Found"}</td>
                    <td className="px-6 py-4">{product ? quantity * product.price : "N/A"}</td>
                    <td className="px-6 py-4">{order.paymentStatus}</td>
                    <td className="px-6 py-4">{order.status}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vieworders;
