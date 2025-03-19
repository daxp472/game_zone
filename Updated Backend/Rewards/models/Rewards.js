const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, default: null }, // Add this to handle existing index
  lastLoginDate: { type: Date, default: null },
  isDailyRewardEligible: { type: Boolean, default: false },
  isStreakRewardEligible: { type: Boolean, default: false },
  dailyStreak: { type: Number, default: 0 },
  totalStreak: { type: Number, default: 0 },
  rewardsClaimed: { type: [Number], default: [] },
  dailyRewardsClaimed: { type: [Number], default: [] },
  coin: { type: Number, default: 0 },
  cash: { type: Number, default: 0 },
  roomCards: { type: Number, default: 0 },
});

// Create compound index to ensure uniqueness
rewardSchema.index({ email: 1 }, { unique: true });

// Drop the problematic index if it exists (run this in your server startup)
const dropProblematicIndex = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const rewardsCollection = collections.find(c => c.name === 'rewards');
    
    if (rewardsCollection) {
      const indexes = await mongoose.connection.db.collection('rewards').indexes();
      const usernameIndex = indexes.find(idx => idx.name === 'username_1');
      
      if (usernameIndex) {
        await mongoose.connection.db.collection('rewards').dropIndex('username_1');
        console.log('Dropped problematic username index');
      }
    }
  } catch (err) {
    console.error('Error handling indexes:', err);
  }
};

const Rewards = mongoose.model('Rewards', rewardSchema);

module.exports = { Rewards, dropProblematicIndex };