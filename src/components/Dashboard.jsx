import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import API from '../utility/api';



const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // To store user data
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {

        console.error('Token not found in localStorage');
      navigate('/login'); // Redirect if no token
      return;
    }
      try {
        console.log('Token being sent:', token); // Debugging log
        const response = await API.get('/dashboard', {
          headers: { Authorization: `Bearer ${token}`}, // Ensure "Bearer" prefix // Send token in headers
        });
        console.log('API Response:', response.data); // Log the full response
        setUserData(response.data.user); // Store user data
      } catch (error) {
        console.error('Dashboard fetch error:', error); // Log the full error
        console.error('Error details:', error.response?.data); // Log response data
        console.error('Error message:', error.response?.data?.message || 'No message'); // Ensure a fallback for message
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login'); // Redirect to login
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return null; // Prevent component rendering if no user data
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="bg-indigo-600 text-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <p className="mt-1">Access your free guide below.</p>
      </header>
      <main className="mt-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Your Free Guide</h2>
          <p className="mb-4">Click below to download your guide and start improving your marketing.</p>
          <a
            href="/path-to-guide.pdf"
            download
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
          >
            Download Guide
          </a>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
