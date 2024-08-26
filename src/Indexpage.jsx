import React from 'react'
import img from '../src/assets/indexbg.jpg'

function Indexpage() {
  return (
    <div className="relative h-screen">
      <img 
        src={img}
        alt="Luxurious Furniture" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-4 font-live'>
          Liv.e
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 font-playfair">
          Welcome to Our Furniture Store
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 font-abril">
          Explore our collection of luxurious furniture
        </p>
      </div>
    </div>
  )
}

export default Indexpage
