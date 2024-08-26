import React from 'react';
import about from '../../assets/about.png';
import truck from '../../assets/truck.png';
import carttt from '../../assets/carttt.png';

function About() {
  return (
    <div className="pt-12 lg:pt-24 flex flex-col lg:flex-row items-start w-full h-full px-4 lg:px-16">
      <div className="flex-1 lg:mr-10">
        <h1 className="text-4xl lg:text-7xl font-bold text-pink-900 font-amatic mb-4 lg:mb-6">
          Why choose us?
        </h1>
        <div className="flex items-center mb-4">
          <img 
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg mr-4"
            src={truck} 
            alt="Fast and Free Shipping"
          />
          <h2 className="text-lg lg:text-xl font-playfair">
            FAST AND FREE SHIPPING
          </h2>
        </div>
        <div className="flex items-center">
          <img 
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg mr-4"
            src={carttt} 
            alt="Easy to Shop"
          />
          <h2 className="text-lg lg:text-xl font-playfair">
            EASY TO SHOP
          </h2>
        </div>
      </div>
      <div className="flex-1 mt-8 lg:mt-0">
        <img 
          className="w-full h-auto rounded-lg"
          src={about} 
          alt="About Us"
        />
      </div>
    </div>
  );
}

export default About;
