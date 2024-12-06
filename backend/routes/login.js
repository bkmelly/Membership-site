const router = require('express').Router()
const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", { email, password });
  console.log('Incoming login request payload:', req.body);


  if (!email || !password) {
    console.log("Missing fields");
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log("Querying for user with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("JWT generated:", token);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});
  module.exports = router;