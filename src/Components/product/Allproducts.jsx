import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
function Allproducts() {
  const  [products,setProducts]=useState([]);
  useEffect(()=>
  {
    const getProducts=async () =>
    {
      try{
        const response=await axios.get(`http://localhost:3000/api/v1/product`)
     setProducts(response.data)
      }catch(error)
      {
        console.log("error fetching products",error)
      }
    }
    getProducts();
  },[])
  return (
    <div className='min-h-screen'>
      <div className='flex items-center align-middle justify-center'>
        <h1 className="text-sky-950 text-5xl mt-28  font-bold mb-4 font-live">Discover Style and Comfort...</h1>
      </div>
      <div className="flex flex-wrap mt-10 ml-10">
        {products.map((product) => (
          <div key={product._id} className="max-w-xs mb-4 ml-4">
            <div className="bg-white rounded-sm overflow-hidden shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/viewproduct/${product._id}`}><div className="h-64 overflow-hidden">
                <img
                  className="w-full h-full object-center transition-transform transform hover:scale-105"
                  src={product.image}
                  alt={product.productName}
                />
              </div></Link>  
              <div className="p-5">
                <h2 className="text-xl font-bold font-playfair mb-2 text-sky-900">{product.productName}</h2>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-sky-900 font-abril">₹{product.price}</span>
               <Link to={`/viewproduct/${product._id}`}>  <button  className="bg-sky-900 text-white px-4 py-2 rounded-full font-semibold transition-colors hover:bg-cyan-800">
                      View
                  </button></Link> 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allproducts
 
    