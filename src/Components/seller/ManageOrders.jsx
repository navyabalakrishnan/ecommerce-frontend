import React, { useState, useEffect } from 'react';
import Sellersidebar from './Sellersidebar';
import axios from 'axios';

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/getorders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log("Fetched order", res.data);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className='flex flex-col  mt-20 lg:flex-row'>
      <Sellersidebar />
      <main className="flex-1 p-4 lg:pl-64 lg:pt-4 lg:pr-4">
        <div className="relative overflow-x-auto">
          <table className="min-w-full text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">Product Name</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">Quantity</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">Total Amount</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">Payment Status</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">Address</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  {order.products.map(({ product, quantity }) => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-4 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product.productName}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4">{quantity}</td>
                      <td className="px-4 py-2 md:px-6 md:py-4">{quantity * product.price}</td>
                      <td className="px-4 py-2 md:px-6 md:py-4">{order.paymentStatus}</td>
                      <td className="px-4 py-2 md:px-6 md:py-4">
                        {order.shippingAddress.address} <br />
                        {order.shippingAddress.city} <br />
                        {order.shippingAddress.state} <br />
                        {order.shippingAddress.country}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4">{order.status}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageOrders;
