require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwtUtils');
const {
  INTERNAL_SERVER_ERROR,
  CREATED,
  UNAUTHORIZED,
  CONFLICT,
} = require('../config/status');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res
        .status(CONFLICT.code)
        .json({ error: 'Username already taken' });
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, userType });
    
    // Save the user to the database
    await user.save();

    res.status(CREATED.code).json({ message: CREATED.message });
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR.code)
      .json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/register
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database by username
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      
      // Generate access and refresh tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.json({ accessToken, refreshToken });
    } else {
      res
        .status(UNAUTHORIZED.code)
        .json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR.code)
      .json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

module.exports = { registerUser, loginUser };
