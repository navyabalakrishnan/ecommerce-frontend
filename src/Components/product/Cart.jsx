import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/cart`, { withCredentials: true });
        setCart(res.data.items || []);
        setTotal(res.data.total || 0);
        setCartId(res.data._id); 
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    getCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/cart/${productId}`, {
        withCredentials: true,
        data: { cartId },
      });
      const data = res.data;
      console.log(data);
      if (data.message === "item is deleted") {
        setCart(cart.filter(item => item.product._id !== productId)); 
        setTotal(total - (cart.find(item => item.product._id === productId)?.product.price * cart.find(item => item.product._id === productId)?.quantity || 0));
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div>
      <div className='pt-32 pl-20'>
        <h1 className='text-cyan-950 font-playfair text-4xl'>Your Cart</h1>
      </div>
      <div className="absolute mt-40 top-0 right-0 w-1/5 bg-white shadow-teal-950 shadow-inner rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex justify-center font-abril text-blue-950">Cart Total</h2>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>Rs{total}</span>
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto mt-20">
          <div className='absolute mt-50 top-0 right-0'>
            <Link to="/checkout">
              <button className="m-8 bg-sky-800 w-auto hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif">
                Proceed to Checkout
              </button>
            </Link>
          </div>
          <table className="w-3/4 mt-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
            <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={`${item.product?._id}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <img src={item.product?.image} height={100} width={100} alt={item.product?.productName} className='rounded-lg' />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.product?.productName}
                  </td>
                  <td className="px-6 py-4">₹{item.product?.price}</td>
                  <td className="px-6 py-4">Quantity: {item.quantity}</td>
                  <td className="px-6 py-4">
                    <button
                      className="select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                      type="button"
                      onClick={() => handleRemove(item.product?._id)}
                    >
                      Remove Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cart;