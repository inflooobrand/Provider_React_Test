import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    

  const handleLogout = () => {
    // Clear token from local storage and redirect to login page
    localStorage.removeItem('token');
    window.location.href = '/'; 

};

    return (
      <div className="flex h-screen">
        <div className="bg-gray-800 text-white w-64 py-8 px-4">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                <ul>
                    <li className="mb-4">
                        <Link to="/products" className="block">Products</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/orders" className="block">Orders</Link>
                    </li>
                    
                </ul>
                            {/* Logout Button */}
            <div className="bg-gray-800 text-white py-4 px-8 absolute bottom-0 ">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
                    Logout
                </button>
            </div>

            </div>
      </div>
    );
};

export default Sidebar;
