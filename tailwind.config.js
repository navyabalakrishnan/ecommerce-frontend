/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'serif'],
        abril: ['Abril Fatface', 'serif'],
      playfair:['Playfair Display', 'serif'],
      amatic:['Amatic SC', 'sans-serif'],
      poppins:[ "Poppins", 'sans-serif']
      },
    
    },
  },
  plugins: [],
};
