import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

function Viewproducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 pl-4 lg:pl-64 pt-4 lg:pt-8">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Product Image</th>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Product</th>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Seller</th>
                <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-4 py-2 sm:px-6 sm:py-4">
                    <img
                      className="object-center transition-transform transform hover:scale-105"
                      src={product.image}
                      alt={product.productName}
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.productName}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">{product.seller}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Viewproducts;
