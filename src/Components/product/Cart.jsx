
import React, { useEffect, useState } from 'react'

function Cart() {
  const [carts,setCart]=useState([]);
    useEffect(()=>
    {
      const getCart=async ()=>
      {
        const res=await axios.get(`http://localhost:3000/api/v1/cart/${userId}`)
     const cartData=await res.data;
        setCart(cartData)
    
      };
      getCart()
    },[])
  
  return (
    <div>
        <div className='pt-32 pl-20'><h1 className='text-cyan-950 font-playfair text-4xl'>Your Cart</h1>
         </div>
        <div className="absolute  mt-40 top-0 right-0 w-1/5 bg-white   shadow-teal-950 shadow-inner rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex justify-center font-abril text-blue-950">Cart Total</h2>
         
         
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>$2999</span>
          </div>
          <button className="bg-sky-800 w-full hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full  font-serif cursor-pointer">
            Proceed to Checkout
            </button>
        </div>
        <div>
          
               

<div class="relative overflow-x-auto m-8">
    <table class="w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
        <thead class="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
         
        
            <tr>
                <th scope="col" class="px-6 py-3">
                   Image
                </th>
                <th scope="col" class="px-6 py-3">
               Product
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantity
                </th>
                {/* <th scope="col" class="px-6 py-3">
                   Total
                </th> */}
                <th scope="col" class="px-6 py-3">
                  Remove
                </th>           </tr>
        </thead>
        <tbody>
           {carts && carts.map((cart,index)=>  (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{cart.image}
                </th>
                <td class="px-6 py-4">
                 {cart.product}
                </td>
                <td class="px-6 py-4">
                    {cart.total}
                </td>
                <td class="px-6 py-4">
                   {cart.quantity}
                </td>
                
                <td class="px-6 py-4">
                   <button
  className=" select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
  type="button"
>Remove Item</button>
                </td>
            </tr>
           ))}    
        </tbody>

    </table>
</div>
      </div>

        </div>
      
  )
}

export default Cart