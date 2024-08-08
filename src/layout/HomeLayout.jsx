import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/navbarlogo.png'; 
import { Link } from 'react-router-dom';
function HomeLayout() {
 const navLinks = [
        {
          path: "/seller-signup",
          value: "Seller",
        },
        {
          path: "/user-signup",
          value: "User",
        },
      ];
       return (
   
      
    
    <div>
      <nav className="shadow-sky-800 shadow-md bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-12" alt="Logo" />
          </a>
          
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          
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
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
           
           
       <ul className="flex flex-col p-4 md:p-0 mt-4 border border-sky-800 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-3xl">
             {navLinks.map((link, index) => (
          <Link key={index} to={link.path}> <li>
                <a
                  href="#"
                  className="block font-serif py-2 px-3 text-sky-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >{link.value}
                 
                </a>
              </li>
             
              </Link>))}
             
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default HomeLayout;
