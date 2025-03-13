const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  rank: {
    type: Number,
    default: 0
  },
  gameType: {
    type: String,
    enum: ['2048', 'hangman', 'xo'],
    required: true
  }
}, { timestamps: true });

// Compound index for efficient leaderboard queries
scoreSchema.index({ gameId: 1, score: -1 });

module.exports = mongoose.model('Score', scoreSchema);