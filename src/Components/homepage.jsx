

import React from 'react';
import homepagebcg from "../assets/homepagebcg.jpg";

import { Link } from "react-router-dom";
function Homepage() {
  return (
    <div>
     
      <div className="relative h-screen">
        <img src={homepagebcg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 space-y-4">
          <h1 className="text-sky-800 text-4xl font-bold font-abril md:text-5xl lg:text-6xl">
            Crafted with Care
          </h1>
          <h1 className="text-sky-800 text-4xl font-bold font-abril md:text-5xl lg:text-6xl mx-10 ">
            Designed for Comfort
          </h1>
          <div className="flex justify-center">
        <Link to="/products">   <button className="bg-sky-800 hover:bg-teal-950 text-white font-bold py-3 px-6 rounded-full font-serif mt-20">
              Shop Now 
            </button></Link> 
          </div> </div>
      </div>
    </div>
  );
}

export default Homepage;
