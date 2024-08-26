import React from 'react';
import { Link } from 'react-router-dom';
import img from "../../assets/orderplaced.jpg";

function FinalProductpage() {
  return (
    <>
      <div className='pt-32 flex justify-center'>
        <img 
          src={img} 
          alt="Order Placed" 
          className='w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80' 
        />
      </div>
      <div className='flex justify-center items-center font-abril text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6'>
        Order Placed Successfully!
      </div>
      <div className='flex justify-center pt-10'>
        <Link to="/products">
          <button className="bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base md:text-lg">
            Back to Shopping
          </button>
        </Link>
      </div>
    </>
  );
}

export default FinalProductpage;
