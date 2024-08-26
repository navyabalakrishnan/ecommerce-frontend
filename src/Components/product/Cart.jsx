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
      if (data.message === "item is deleted") {
        setCart(cart.filter(item => item.product._id !== productId)); 
        setTotal(total - (cart.find(item => item.product._id === productId)?.product.price * cart.find(item => item.product._id === productId)?.quantity || 0));
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 mt-10 lg:p-12">
      <div className='pt-8 md:pt-12'>
        <h1 className='text-cyan-950 font-playfair text-3xl md:text-4xl'>Your Cart</h1>
      </div>
      <div className="fixed bottom-4 right-4 w-full md:w-1/3 bg-white shadow-teal-950 shadow-inner rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4 text-center font-abril text-blue-950">Cart Total</h2>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>Rs {total}</span>
        </div>
        <Link to="/checkout">
          <button className="w-full bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full mt-4">
            Proceed to Checkout
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto mt-20">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-500">
          <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Image</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Product</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Price</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Quantity</th>
              <th scope="col" className="px-4 py-2 md:px-6 md:py-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={`${item.product?._id}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <img src={item.product?.image} alt={item.product?.productName} className='w-24 h-24 object-cover rounded-lg' />
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.product?.productName}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4">₹{item.product?.price}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">Quantity: {item.quantity}</td>
                <td className="px-4 py-2 md:px-6 md:py-4">
                  <button
                    className="bg-gray-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                    type="button"
                    onClick={() => handleRemove(item.product?._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
