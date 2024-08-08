import React from 'react'
import { Link, Outlet } from 'react-router-dom'
function Adminsidebar() {
  return (
    <div>
        <div>
        <div className="bg-gray-800 text-white w-64 h-full fixed top-0 left-0 flex flex-col items-center justify-center">
      <div className="text-2xl font-bold p-4 border-b border-gray-700">
      Admin Dashboard
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/manage-sellers" className="hover:bg-gray-700 p-2 rounded">
          View Sellers
        </Link>
        <Link to="view-product" className="hover:bg-gray-700 p-2 rounded">
        View Product
        </Link>
        <Link to="/view-orders" className="hover:bg-gray-700 p-2 rounded">
      View Orders
        </Link>
        <Link to="/add-category" className="hover:bg-gray-700 p-2 rounded">
      Add Category
        </Link>
      </nav>
      </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default Adminsidebar