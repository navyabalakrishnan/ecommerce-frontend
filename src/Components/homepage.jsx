

import React from 'react';
import homepagebcg from "../assets/homepagebcg.jpg";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="relative h-screen">
      <img src={homepagebcg} alt="Background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-start mt-20 sm:justify-center justify-start px-6 py-4 md:px-12 lg:px-24">
        <div className="max-w-lg lg:max-w-xl space-y-4">
          <h1 className="text-sky-900 text-3xl font-bold font-abril md:text-4xl lg:text-5xl sm:text-sky-900 sm:font-semibold">
            Crafted with Care
          </h1>
          <h1 className="text-sky-900 text-3xl font-bold font-abril md:text-4xl lg:text-5xl sm:text-sky-900">
            Designed for Comfort
          </h1>
          <div className="flex justify-center mt-8">
            <Link to="/products">
              <button className="bg-sky-800 hover:bg-teal-950  text-white font-bold py-2 px-4 rounded-full font-serif text-base md:text-lg lg:text-xl">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
