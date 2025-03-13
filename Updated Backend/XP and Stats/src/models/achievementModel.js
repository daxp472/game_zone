const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  achievements: [{
    game: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  total_wins: {
    type: Number,
    default: 0
  },
  total_losses: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Achievement', achievementSchema);