import React from 'react';
import about from '../../assets/about.png';
import truck from '../../assets/truck.png'
import carttt from '../../assets/carttt.png'
function About() {
  return (
    <div className="pt-48 flex justify-between items-start w-full h-full">
      <div className="flex-auto ml-10">
        <h1 className="font-bold text-7xl text-pink-900 font-amatic">Why choose us?</h1><br />
        <img 
          className="rounded-lg" 
          src={truck} 
          alt="About Us Image"
          height={50}
          width={50}
        />   <h2 className="font-playfair">FAST AND FREE SHIPPING</h2>
        <br />
        <img 
          className="rounded-lg" 
          src={carttt} 
          alt="About Us Image"
          height={50}
          width={50}
        />   <h2 className="font-playfair">EASY TO SHOP</h2>
      </div>
      <div className="max-w-xl pl-20">
        <img 
          className="rounded-lg" 
          src={about} 
          alt="About Us Image"
        />
      </div>    
    </div>
  );
}

export default About;
