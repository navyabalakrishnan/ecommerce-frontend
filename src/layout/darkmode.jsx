
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const handleToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="dark-mode"
        className="hidden"
        checked={darkMode}
        onChange={handleToggle}
      />
      <label
        htmlFor="dark-mode"
        className="flex items-center cursor-pointer"
      >
        <div
          className={`relative w-16 h-8 rounded-full ${
            darkMode ? 'bg-gray-800' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
              darkMode ? 'translate-x-8' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default DarkModeToggle;
