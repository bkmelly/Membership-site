import React from 'react';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <header className="p-6 bg-indigo-600 text-white text-center">
        <h1 className="text-3xl font-bold">Get Your Free Guide</h1>
        <p className="mt-2 text-lg">Sign up and learn the top WhatsApp marketing strategies!</p>
      </header>
      <main className="p-6 text-center">
        <Link to="/register">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700">
            Sign Up Now
          </button>
        </Link>
        <p className="mt-4 text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 underline">
            Log In
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LandingPage;
