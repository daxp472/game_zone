import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { z } from 'zod';

const router = express.Router();

// Score Schema
const scoreSchema = new mongoose.Schema({
  gameId: { type: String, required: true, index: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

scoreSchema.index({ gameId: 1, score: -1, timestamp: -1 });
scoreSchema.index({ gameId: 1, username: 1 }, { unique: true });

const Score = mongoose.model('Score', scoreSchema);

// Rate Limiter
const submitScoreLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.headers['x-forwarded-for'] || 'unknown',
  message: 'Too many score submissions, please try again later.'
});

// Validation Schemas
const submitScoreSchema = z.object({
  username: z.string().min(1).max(50).trim(),
  score: z.number().int().positive(),
});

const gameIdSchema = z.string().min(1).max(100);

const paginationSchema = z.object({
  page: z.string().transform(val => {
    const page = parseInt(val);
    return page > 0 ? page : 1;
  }).optional(),
  limit: z.string().transform(val => {
    const limit = parseInt(val);
    return limit > 0 && limit <= 100 ? limit : 10;
  }).optional(),
});

// Routes
router.post('/:gameId', submitScoreLimiter, async (req, res) => {
  try {
    const gameId = gameIdSchema.parse(req.params.gameId);
    const { username, score } = submitScoreSchema.parse(req.body);

    await Score.findOneAndUpdate(
      { gameId, username },
      { $set: { score, timestamp: new Date() } },
      { upsert: true, new: true, runValidators: true }
    );

    const count = await Score.countDocuments({ gameId });
    if (count > 1000) {
      const lowestTopScore = await Score.find({ gameId })
        .sort({ score: -1 })
        .skip(999)
        .limit(1)
        .lean();

      if (lowestTopScore.length > 0) {
        await Score.deleteMany({ gameId, score: { $lt: lowestTopScore[0].score } });
      }
    }

    res.status(201).json({ message: 'Score submitted successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Username already exists for this game' });
    } else {
      console.error('Error submitting score:', error);
      res.status(400).json({ error: error.message });
    }
  }
});

router.get('/:gameId', async (req, res) => {
  try {
    const gameId = gameIdSchema.parse(req.params.gameId);
    const { page = 1, limit = 10 } = paginationSchema.parse(req.query);
    const skip = (page - 1) * limit;

    const [scores, total] = await Promise.all([
      Score.find({ gameId })
        .sort({ score: -1, timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean(),
      Score.countDocuments({ gameId })
    ]);

    const totalPages = Math.ceil(total / limit);

    if (page > totalPages && total > 0) {
      return res.json({
        scores: [],
        pagination: { total, page, pages: totalPages, hasMore: false }
      });
    }

    res.json({
      scores,
      pagination: { total, page, pages: totalPages, hasMore: page < totalPages }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:gameId', async (req, res) => {
  try {
    const adminToken = req.headers['admin-token'];
    if (adminToken !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const gameId = gameIdSchema.parse(req.params.gameId);
    await Score.deleteMany({ gameId });

    res.json({ message: 'Leaderboard reset successfully' });
  } catch (error) {
    console.error('Error resetting leaderboard:', error);
    res.status(400).json({ error: error.message });
  }
});

export { router as leaderboardRoutes };