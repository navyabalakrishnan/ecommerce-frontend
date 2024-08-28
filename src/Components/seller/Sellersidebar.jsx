import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sellersidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
     
      <button
        className="lg:hidden p-4 text-white bg-gray-800 fixed mt-10 left-0 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

     
      <div className={`lg:w-64 lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-full mt-20  lg:bg-gray-800 lg:text-white lg:flex-shrink-0 
        ${isSidebarOpen ? 'block' : 'hidden lg:block'} fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transition-transform transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="text-2xl font-bold p-4 border-b border-gray-700">
          Seller Dashboard
        </div>
        <nav className="flex flex-col p-4 mt-10 space-y-2">
          <Link to="/manage-orders" className="hover:bg-gray-700 p-2 rounded">
            Manage Orders
          </Link>
          <Link to="/add-product" className="hover:bg-gray-700 p-2 rounded">
            Add Product
          </Link>
          <Link to="/manage-products" className="hover:bg-gray-700 p-2 rounded">
            My Products
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sellersidebar;
