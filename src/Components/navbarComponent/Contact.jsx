import React from 'react';
import gmail from '../../assets/gmail.png';

function Contact() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <div className='font-playfair font-bold text-5xl mb-4'>CONTACT US</div>
      <div>
        <img src={gmail} alt="Gmail" height={100} width={100} />
      </div>
      <div className='font-playfair text-4xl'>liveFurniture@gmail.com</div>
    </div>
  );
}

export default Contact;
