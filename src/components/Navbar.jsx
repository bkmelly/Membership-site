import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Free Guide Hub
        </Link>
        <div className="space-x-4">
          <Link
            to="/register"
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-700"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-700"
          >
            Log In
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
