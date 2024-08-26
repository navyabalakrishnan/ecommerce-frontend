import React from 'react';
import gmail from '../../assets/gmail.png';

function Contact() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4'>
      <div className='text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4'>
        CONTACT US
      </div>
      <div className='mb-4'>
        <img 
          src={gmail} 
          alt="Gmail" 
          className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'
        />
      </div>
      <div className='text-xl sm:text-2xl md:text-3xl font-playfair'>
        liveFurniture@gmail.com
      </div>
    </div>
  );
}

export default Contact;
