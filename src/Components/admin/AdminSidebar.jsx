import { Link } from 'react-router-dom';
export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav className="flex flex-col p-4 space-y-2">
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
