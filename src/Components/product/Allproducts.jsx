import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Allproducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product`);
        setProducts(response.data);
      } catch (error) {
        console.log("error fetching products", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className='min-h-screen px-4 sm:px-6 lg:px-8 '>
      <div className='flex items-center justify-center mt-10'>
        <h1 className="text-sky-950 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 mt-20 font-live  dark:text-white">
          Discover Style and Comfort...
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-sm overflow-hidden shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/viewproduct/${product._id}`}>
              <div className="h-48 sm:h-64 overflow-hidden">
                <img
                  className="w-full h-full object-center transition-transform transform hover:scale-105"
                  src={product.image}
                  alt={product.productName}
                />
              </div>
            </Link>
            <div className="p-4 sm:p-5 dark:bg-gray-700 dark:text-white">
              <h2 className="text-lg sm:text-xl font-bold font-playfair mb-2 text-sky-900 dark:text-white">
                {product.productName}
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-semibold text-sky-900 font-abril dark:text-white">
                  ₹{product.price}
                </span>
                <Link to={`/viewproduct/${product._id}`}>
                  <button className="bg-sky-900 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold transition-colors hover:bg-cyan-800 text-sm sm:text-base">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allproducts;
