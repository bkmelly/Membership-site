  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require('dotenv');
  
   // Import routes
  const register = require('./routes/register')
  const login = require('./routes/login')
  const dashboard = require('./routes/dashboard')

  // Load environment variables
  dotenv.config()

  // const mongoUri = process.env.MONGO_URI;
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  next();
});
  // Middleware
  app.use(cors({
    origin: 'http://localhost:3000', 
  }));
  app.use(express.json());

  // MongoDB connection
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
  })
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(err => console.error("Failed to connect to MongoDB Atlas:", err.message));
  
 
  // Routes
  console.log("Registering routes at /api/users");
  app.use('/api/register', register)
  app.use('/api/login', login)
  app.use('/api/dashboard', dashboard)
  

  // Start the server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
