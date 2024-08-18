import { Link } from 'react-router-dom';
export default function AdminDashboard() {
  return (
    <div>
      
      <nav className="flex flex-col mt-32 p-4 space-y-2"><div className='w-full flex justify-center bg-slate-800 text-white h-11'><h1>ADMIN DASHBOARD</h1></div>
        <Link to="/manage-sellers" className="hover:bg-gray-700 p-2 rounded">
          View Sellers
        </Link>
        <Link to="/view-products" className="hover:bg-gray-700 p-2 rounded">
          View Products
        </Link>
        <Link to="/view-orders" className="hover:bg-gray-700 p-2 rounded">
          View Orders
        </Link>
        <Link to="/add-category" className="hover:bg-gray-700 p-2 rounded">
          Add Category
        </Link>
      </nav>
    </div>
  );
}
