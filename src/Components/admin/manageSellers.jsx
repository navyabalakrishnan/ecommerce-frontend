
import React, { useEffect, useState } from 'react';
import Adminsidebar from './AdminSidebar';
import axios from 'axios';

const ManageSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getSellers = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/seller/get-sellers`);
      const sellerData = await res.data;
      setSellers(sellerData);
    };
    getSellers();
  }, []);

  return (
    <div>
      <Adminsidebar />
      <div className="relative overflow-x-auto flex justify-center pl-32 pt">
        
        <table className="w-3/4 text-sm pl-40 text-gray-500 dark:text-gray-500">
          <thead className="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Seller</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {sellers && sellers.map((seller, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 justify-center">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {seller.name}
                </th>
                <td className="px-6 py-4">{seller.email}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={async () => {
                        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/seller/${seller._id}`);
                        const data = await res.data;
                        console.log(data);
                        if (data.message === "Seller deleted successfully") {
                          window.location.reload();
                        }
                      }}
                      className="bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSellers;
