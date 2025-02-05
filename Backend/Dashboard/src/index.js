const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'gamezone',
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000
})
.then(async () => {
  console.log('Connected to MongoDB GameZone database');
  
  // Verify collections exist
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Available collections:', collections.map(c => c.name));
  
  // Only start the server after successful database connection
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/dashboard', gameRoutes);
app.use('/user', userRoutes);
app.use('/game', leaderboardRoutes);