const mongoose = require('mongoose');

const multiplayerStatsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  games_played: [{
    game: {
      type: String,
      required: true
    },
    matches: {
      type: Number,
      default: 0
    },
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    }
  }],
  total_matches: {
    type: Number,
    default: 0
  },
  win_ratio: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('MultiplayerStats', multiplayerStatsSchema);