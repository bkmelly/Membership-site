const express = require('express');
const jwt = require('jsonwebtoken');
const router = require('express').Router()
const {User} = require('../models/user')
const authenticateToken = require('../middleware/authMiddleware')


router.get('/', authenticateToken, async (req, res) => {
  console.log('Dashboard route hit with user:', req.user);
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in /dashboard route:', error.message);
    res.status(500).json({ message: 'Error fetching dashboard', error });
  }
});
module.exports = router;
