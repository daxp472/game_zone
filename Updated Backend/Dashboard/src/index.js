const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Game Schema
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  gameUrl: { type: String, required: true },
  gameId: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB GameZone database');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Route to Fetch Games
app.get('/games', async (req, res) => {
  try {
    const games = await Game.find({ active: true })
      .select('title description imageUrl gameUrl gameId')
      .limit(6)
      .lean();

    if (!games || games.length === 0) {
      return res.status(404).json({ message: 'No games found' });
    }

    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});