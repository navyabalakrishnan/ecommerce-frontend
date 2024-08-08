import React from 'react'

function Indexpage() {
  return (
    <div>
        <div className="relative h-screen">
      <img 
        src="https://img.freepik.com/free-photo/empty-modern-room-with-furniture_23-2149178884.jpg?t=st=1723093587~exp=1723097187~hmac=474838620874b5d8c7dada1242cd3f0897aef3ba1f49452faf91c43de5b386aa&w=996"
        alt="Luxurious Furniture" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold mb-4">Welcome to Our Furniture Store</h1>
        <p className="text-lg text-white mb-6">Explore our collection of luxurious furniture</p>
       
        
      </div>
    </div>
    </div>
  )
}

export default Indexpage