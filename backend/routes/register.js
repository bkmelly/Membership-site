const router = require('express').Router()
const {User}= require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Registration request received:", req.body);

  if (!name || !email || !password) {
      console.log("Missing fields:", { name, email, password });
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          console.log("Email already in use:", email);
          return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash password and save user
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully");

      const user = new User({ name, email, password: hashedPassword });
      const savedUser = await user.save();
      console.log("User saved to database:", savedUser);

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log("JWT generated:", token);

      res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
      console.error('Error in /register:', error);
      res.status(500).json({ message: 'Error registering user', error });
  }
});

  module.exports = router
  