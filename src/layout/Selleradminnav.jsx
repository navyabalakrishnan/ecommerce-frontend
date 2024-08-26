import React from 'react'
import logo from '../assets/navbarlogo.png';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Selleradminnav() {
  const navigate=useNavigate()
  const handleSellerLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`, {}, { withCredentials: true });
      localStorage.removeItem('authToken');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div>
        <div>
        <nav className="shadow-sky-800 shadow-md bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-12" alt="Logo" />
          </a>
          {/* <h3>LIV.E</h3> */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button 
           onClick={handleSellerLogout} 
            className="bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif">
              Logout
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          
        </div>
      </nav>
      <Outlet />
        </div>
    </div>
  )
}

export default Selleradminnav