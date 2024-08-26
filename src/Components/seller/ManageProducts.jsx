import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sellersidebar from './Sellersidebar';

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/manage-products`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const handleRemovebySeller = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = res.data;
      console.log(data);
      if (data.message === "Product is deleted") {
        setProducts(products.filter(product => product._id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className='flex flex-col  mt-10 lg:flex-row'>
      <Sellersidebar />
      <main className='flex-1 mt-28 p-4 lg:pl-64'>
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Product Name</th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Price</th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Category</th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 dark:text-white">{product.productName}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">${product.price}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">{product.category}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">
                    <button
                      onClick={() => handleRemovebySeller(product._id)}
                      className="bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif cursor-pointer"
                    >
                      Remove Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageProducts;
