require('dotenv').config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();

connectDB();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buyer', authenticateToken, buyerRoutes);
app.use('/api/seller', authenticateToken, sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err
    ? console.error(`Error starting server: ${err.message}`.red.underline)
    : console.log(`Server running on http://localhost:${PORT}`.green.underline)
);
