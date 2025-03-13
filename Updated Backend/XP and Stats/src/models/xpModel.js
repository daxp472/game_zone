const mongoose = require('mongoose');

const xpLevelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
});

// XP Thresholds for Levels (Up to Level 50)
const xpThresholds = [
  0, 100, 400, 1000, 3000, 6000, 10000, 15000, 21000, 28000,
  36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000,
  171000, 190000, 210000, 231000, 253000, 276000, 300000, 325000, 351000, 378000,
  406000, 435000, 465000, 496000, 528000, 561000, 595000, 630000, 666000, 703000,
  741000, 780000, 820000, 861000, 903000, 946000, 990000, 1035000, 1081000, 1128000
];

// Method to Calculate Level Based on XP
xpLevelSchema.methods.calculateLevel = function() {
  let level = 1;
  for (let i = 1; i < xpThresholds.length; i++) {
    if (this.xp >= xpThresholds[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return level;
};

module.exports = mongoose.model('XpLevel', xpLevelSchema);