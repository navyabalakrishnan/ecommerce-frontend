import React from 'react';
import about from '../../assets/about.png';

function About() {
  return (
    <div className="  pt-48  flex justify-between items-end w-full h-full bg-gray-300">
   <div className="flex-1">
        <h1 className="font-bold text-7xl text-pink-900 font-amatic">Why choose us?</h1>
       
      </div>
      <div className="max-w-xl pl-20"> 
        <img 
         className="rounded-lg  " 
          src={about} 
          alt="About Us Image"
        />
      </div>
    </div>
  );
}

export default About;
