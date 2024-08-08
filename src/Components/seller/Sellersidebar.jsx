import React from 'react'
import { Link } from 'react-router-dom'
function Sellersidebar() {
  return (
    <div>
        <div>
        <div className="bg-gray-800 text-white w-64 h-full fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="text-2xl font-bold p-4 border-b border-gray-700">
       Seller Dashboard
      </div>
      <nav className="flex flex-col p-4 space-y-2">
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
    </div>
  )
}

export default Sellersidebar