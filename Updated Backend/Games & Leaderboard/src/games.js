import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

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

// Route to Fetch Games
router.get('/', async (req, res) => {
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

export { router as gameRoutes };