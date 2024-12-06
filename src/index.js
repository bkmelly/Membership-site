import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure you have an App.jsx or App.js file
import './index.css';
import './style/custom.css'


const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure "root" exists in public/index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);