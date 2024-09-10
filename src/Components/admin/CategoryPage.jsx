import React, { useEffect, useState } from 'react';
import Adminsidebar from './AdminSidebar';
import axios from 'axios';

const Managecategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Adminsidebar />
      <div className="relative overflow-x-auto flex justify-center pl-32 pt">
        <table className="w-3/4 text-sm pl-40 text-gray-500 dark:text-gray-500">
          <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Category Name</th>
              <th scope="col" className="px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? categories.map((category, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 justify-center">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {category.name}
                </th>
                <td className="px-6 py-4 text-center">
                  {new Date(category.createdAt).toLocaleDateString()} 
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managecategory;
