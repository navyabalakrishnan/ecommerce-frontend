import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function ProductDetail() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
const [product,setProduct]=useState([]);
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
},[productId]);


  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='mt-40 ml-20 flex items-start'>
      <div className='object-contain h-96 w-86'>
        <img 
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className='ml-40'>
        <div className='font-playfair font-bold text-5xl text-sky-800'>
          <h2>{product.name}</h2>
        </div>
        <div className='mt-4 p-6 bg-white shadow-inner hover:shadow-md shadow-teal-900 rounded-lg max-w-xl'>
          <div className='font-playfair text-sky-700'>
       
            <p>
product.description            </p>
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
            <button  className='text-white font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-32 py-2 font-bold'>Add to cart</button>

          </div>  

        </div><br /><div className='pl-36'>
     <Link to="/ckeckout">  <button  className='text-white font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-32 py-2 font-bold '>Buy Now</button>
</Link> </div>
      </div>
    </div>
  );
}

export default ProductDetail;
