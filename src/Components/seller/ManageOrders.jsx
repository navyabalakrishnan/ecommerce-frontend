import React, { useState, useEffect } from 'react';
import Sellersidebar from './Sellersidebar';
import axios from 'axios';

function ManageOrders() {
  const [orders, setOrders] = useState([]);


useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:3000/api/v1/order/getorders',{
                  headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetchedorder", res.data);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);


  return (
    <div>
      <Sellersidebar />
      <div className="relative overflow-x-auto flex justify-center pl-40  pt-40">
        <table className="w-3/4 text-sm pl-40 text-gray-500 dark:text-gray-500">
          <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Total Amount</th>
              <th scope="col" className="px-6 py-3">Payment Status</th>

              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
  {orders.map((order) => (
    <React.Fragment key={order._id}>
      {order.products.map(({ product, quantity }) => (
        <tr key={product._id} className= "text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
          <td className="  px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {product.productName}
          </td>
          <td className="px-6 py-4 ">{quantity}</td>
          <td className="px-6 py-4">{quantity * product.price}</td>
          <td className="px-6 py-4">{order.paymentStatus}</td>
          <td className="px-6 py-4 ">{order.shippingAddress.address} <br />{order.shippingAddress.city}
          <br />{order.shippingAddress.state}
          <br />{order.shippingAddress.country}</td>
          <td className="px-6 py-4 flex">{order.status}</td>
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

export default ManageOrders;
