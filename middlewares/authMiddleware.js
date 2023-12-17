require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../utils/jwtUtils');
const { UNAUTHORIZED, FORBIDDEN } = require('../config/status');

const authenticateToken = async (req, res, next) => {
  // Extract token from the request header
  const token = req.header('Authorization').split(' ')[1];

  // Check if the token exists
  if (!token)
    return res.status(UNAUTHORIZED.code).json({ error: UNAUTHORIZED.message });

  try {
    // Verify the token
    const decoded = await verifyToken(token);

    // Check if the token is valid
    if (!decoded)
      return res
        .status(UNAUTHORIZED.code)
        .json({ error: UNAUTHORIZED.message });

    // Find the user based on the decoded username
    const user = await User.findOne({ username: decoded.username });

    // Set the user in the request object
    req.user = user;

    // Extract user type
    const userType = user.userType;

    // Check if the user has the right accesss based on the route
    if (
      (userType === 'buyer' && req.originalUrl.includes('/api/buyer')) ||
      (userType === 'seller' && req.originalUrl.includes('/api/seller')) ||
      (user.userType === 'both' &&
        (req.originalUrl.includes('/api/buyer') ||
          req.originalUrl.includes('/api/seller')))
    ) {
      next();
    } else {
      return res.status(FORBIDDEN.code).json({ error: FORBIDDEN.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(FORBIDDEN.code).json({ error: FORBIDDEN.message });
  }
};

module.exports = authenticateToken;
