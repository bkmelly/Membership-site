import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import API from '../utility/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(''); // Define `message` state
  const navigate = useNavigate(); // Use navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('sending Login data:', formData);
    try {
      const response = await API.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid credentials!');
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log In</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="example@mail.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded shadow hover:bg-indigo-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
