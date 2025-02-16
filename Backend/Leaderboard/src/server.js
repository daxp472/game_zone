import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB with proper URI format
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/leaderboard';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Score Schema with unique compound index for gameId + username
const scoreSchema = new mongoose.Schema({
  gameId: { type: String, required: true, index: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Create compound indexes for efficient queries
scoreSchema.index({ gameId: 1, score: -1, timestamp: -1 }); // For sorting by score and timestamp
scoreSchema.index({ gameId: 1, username: 1 }, { unique: true }); // For unique user scores per game

const Score = mongoose.model('Score', scoreSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Configure rate limiter with proper IP handling
app.set('trust proxy', 1);

const submitScoreLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.headers['x-forwarded-for'] || 'unknown',
  message: 'Too many score submissions, please try again later.'
});

// Validation schemas with improved constraints
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
app.post('/api/leaderboard/:gameId', submitScoreLimiter, async (req, res) => {
  try {
    const gameId = gameIdSchema.parse(req.params.gameId);
    const { username, score } = submitScoreSchema.parse(req.body);

    // Update score if exists, insert if new (upsert)
    await Score.findOneAndUpdate(
      { gameId, username },
      { 
        $set: { 
          score: score,
          timestamp: new Date()
        }
      },
      { 
        upsert: true,
        new: true,
        runValidators: true 
      }
    );

    // Cleanup old scores if total exceeds limit (keep top 1000)
    const count = await Score.countDocuments({ gameId });
    if (count > 1000) {
      const lowestTopScore = await Score.find({ gameId })
        .sort({ score: -1 })
        .skip(999)
        .limit(1)
        .lean();

      if (lowestTopScore.length > 0) {
        await Score.deleteMany({
          gameId,
          score: { $lt: lowestTopScore[0].score }
        });
      }
    }

    res.status(201).json({ message: 'Score submitted successfully' });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ error: 'Username already exists for this game' });
    } else {
      console.error('Error submitting score:', error);
      res.status(400).json({ error: error.message });
    }
  }
});

app.get('/api/leaderboard/:gameId', async (req, res) => {
  try {
    const gameId = gameIdSchema.parse(req.params.gameId);
    const { page = 1, limit = 10 } = paginationSchema.parse(req.query);
    const skip = (page - 1) * limit;

    const [scores, total] = await Promise.all([
      Score.find({ gameId })
        .sort({ score: -1, timestamp: -1 }) // Sort by score desc, then by timestamp desc
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean(),
      Score.countDocuments({ gameId })
    ]);

    const totalPages = Math.ceil(total / limit);

    // Return empty array if page exceeds total pages
    if (page > totalPages && total > 0) {
      return res.json({
        scores: [],
        pagination: {
          total,
          page,
          pages: totalPages,
          hasMore: false
        }
      });
    }

    res.json({
      scores,
      pagination: {
        total,
        page,
        pages: totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/leaderboard/:gameId', async (req, res) => {
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});