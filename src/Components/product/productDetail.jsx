import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function ProductDetail() {
  const { id } = useParams();
 

  const [quantity, setQuantity] = useState(1);
const [product,setProduct]=useState([]);
 const [message,setMessage]=useState("")
useEffect(() => {
  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  getProduct();
},[id]);


  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  
  const addToCart = async () => {
   
    try {
      const token = Cookies.get('token');
  
      if (!token) {
        console.error("Authentication token not found");
        return;
      }
  
      const requestBody = {
        product,
        quantity,
      };
  
      const res = await axios.post(`http://localhost:3000/api/v1/cart/addtocart`, requestBody, {
        withCredentials: true,
      });
  
      if (res.status === 200 || res.status === 201) {
        console.log("Product added to cart successfully");
        setMessage("Product added to cart successfully")
      } else {
        console.log("Failed to add product to cart", res.data);
      }
    } catch (err) {
      console.error("Error adding product to cart:", err.response ? err.response.data : err.message);
    }
  };
  

  return (
    <div className='mt-40 ml-20 flex items-start'>
      <div className='flex-shrink-0 h-96 w-96 overflow-hidden'>
        <img 
          src={product.image}
          alt={product.name}
             className="object-cover h-full w-full rounded-r-2xl"
        />
      </div>
      <div className='ml-40'>
        <div className='font-playfair font-bold text-5xl text-sky-800 flex justify-center'>
          <h2>{product.productName}</h2>
          
        </div>
        <div className="flex justify-center my-4">
  <h2 className="font-playfair font-bold text-5xl text-purple-900">
    <span className="text-6xl text-teal-700">Rs.</span>
    <span className="bg-gradient-to-r from-sky-800 via-sky-900 to-sky-950 text-transparent bg-clip-text">
      {product.price}
    </span>
  </h2>
</div>
        <div className='mt-4 p-6 bg-white shadow-inner hover:shadow-md shadow-teal-900 rounded-lg max-w-xl'>
          <div className='font-playfair text-sky-700'>
       
            <p>
{product.description}          </p>
                </div>
        </div>
        <div className='mt-6'>
          <div className='flex items-center space-x-4'>
            <button 
              className='bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif'
              onClick={handleDecrease}
            >
              -
            </button>
            <span className='text-xl'>{quantity}</span>
            <button 
              className='bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif'
              onClick={handleIncrease}
            >
              +
            </button>
   {/* <button  onClick={() => {
    console.log("button clicked")}} className='text-white font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-32 py-2 font-bold '>
              
            Add to cart</button> */}
    <button  onClick={addToCart} className='text-white font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-32 py-2 font-bold '>
            Add to cart
          </button>
          </div>  
          {message && <div className='mt-4 text-green-900 font-semibold'>{message}</div>}
      

        </div><br /><div className='pl-36'>
     <Link to="/checkout">  <button  onClick={addToCart} className='text-white font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-32 py-2 font-bold '>Buy Now</button>
</Link> 

</div>
      </div>
    </div>
  );
}

export default ProductDetail;

