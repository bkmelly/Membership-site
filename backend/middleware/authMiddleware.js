const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('Authorization header missing');
    return res.status(401).json({ message: 'Token missing' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err.message);
      return res.status(403).json({ message: 'Token invalid' });
    }
    req.user = user;
    console.log('Token verified, user:', user);
    next();
  });
};
module.exports = authenticateToken;
