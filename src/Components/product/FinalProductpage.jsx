import React from 'react'
import { Link } from 'react-router-dom'
function FinalProductpage() {
  return (
   <>
        <div className='flex justify-center items-center  font-abril text-5xl mt-40' >Your Order placed successfully</div>
      <Link to="/products"> <div className='flex justify-center pt-10'> <button className="bg-sky-800   hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full  font-serif ">
          Back to Shopping
            </button></div></Link> </>
  )
}

export default FinalProductpage