import React from 'react'
import Sellersidebar from './Sellersidebar'

function ManageOrders() {
  return (
    <div><Sellersidebar/>
        <div class="relative overflow-x-auto flex justify-center pl-32 pt-40 ">
    <table class="w-3/4 text-sm pl-40 text-gray-500 dark:text-gray-500">
        <thead class="text-lg font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                 ProducName
                </th>
                
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" class="px-6 py-3">
       Total Amount
                </th>
                <th scope="col" class="px-6 py-3">
                 Address
                </th>
                <th scope="col" class="px-6 py-3">
                Status
                </th>
                        </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
JJJJJJ                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                
                </td>
                <td class="px-6 py-4">
                  
                </td>
            </tr>
           
        </tbody>
    </table>
</div>
    </div>
  )
}

export default ManageOrders