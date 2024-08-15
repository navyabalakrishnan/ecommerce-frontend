import React from 'react'
import img from '../src/assets/indexbg.jpg'
function Indexpage() {
  return (
    <div>
        <div className="relative h-screen">
      <img 
        src={img}
        alt="Luxurious Furniture" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold mb-4 font-playfair">Welcome to Our Furniture Store</h1>
        <p className="text-lg text-white mb-6 font-abril">Explore our collection of luxurious furniture</p>
       
        
      </div>
    </div>
    </div>
  )
}

export default Indexpage