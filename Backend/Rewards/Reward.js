const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Rewards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Reward Schema
const rewardSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
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

const Rewards = mongoose.model('Rewards', rewardSchema);

// Helper function to check if two dates are consecutive
function isConsecutiveDay(lastDate, currentDate) {
  const last = new Date(lastDate);
  console.log(last)
  const current = new Date(currentDate);
  console.log(current)

  last.setUTCHours(5, 30, 0, 0);
  current.setUTCHours(5, 30, 0, 0);
  const diff = current - last;

  const oneDay = 24 * 60 * 60 * 1000;
  return Math.abs(diff) === oneDay;
}

// Login endpoint
app.post('/reward/login', async (req, res) => {
  const { username } = req.body;
  const currentDate = new Date();

  try {
    let reward = await Rewards.findOne({ username });

    if (reward) {
      const lastLogin = new Date(reward.lastLoginDate);
      lastLogin.setUTCHours(5, 30, 0, 0);
      currentDate.setUTCHours(5, 30, 0, 0);

      if (lastLogin.toDateString() === currentDate.toDateString()) {
        return res.json({ message: 'Already logged in today.', ...reward.toObject() });
      }
    }

    if (!reward) {
      reward = new Rewards({
        username,
        lastLoginDate: currentDate,
        dailyStreak: 1,
        totalStreak: 1,
        isDailyRewardEligible: true,
      });
      await reward.save();
      return res.json({
        message: 'Welcome! Daily streak started.',
        ...reward.toObject(),
      });
    }

    if (isConsecutiveDay(reward.lastLoginDate, currentDate)) {
      reward.dailyStreak += 1;
      reward.totalStreak += 1;
    } else {
      reward.dailyStreak = 1;
      reward.totalStreak = 1;
      reward.dailyRewardsClaimed = [];
    }

    if (reward.dailyStreak > 7) {
      reward.dailyStreak = 1;
      reward.dailyRewardsClaimed = [];
    }

    if (reward.totalStreak > 30) {
      reward.totalStreak = 1;
      reward.rewardsClaimed = [];
    }

    reward.isDailyRewardEligible = !reward.dailyRewardsClaimed.includes(reward.dailyStreak);

    if ([10, 20, 30].includes(reward.totalStreak) && !reward.rewardsClaimed.includes(reward.totalStreak)) {
      reward.isStreakRewardEligible = true;
    } else {
      reward.isStreakRewardEligible = false;
    }

    reward.lastLoginDate = currentDate;
    await reward.save();

    res.json({ message: 'Login successful!', ...reward.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const dailyRewards = [
  { day: 1, coin: 30, cash: 0 },
  { day: 2, coin: 40, cash: 0 },
  { day: 3, coin: 0, cash: 10 },
  { day: 4, coin: 50, cash: 0 },
  { day: 5, coin: 60, cash: 0 },
  { day: 6, coin: 0, cash: 20 },
  { day: 7, coin: 0, cash: 30 },
];

// Claim Reward Endpoint
app.patch('/reward/claim-reward', async (req, res) => {
  const { username, rewardType } = req.body;

  try {
    const reward = await Rewards.findOne({ username });
    if (!reward) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (rewardType === 'daily' && reward.isDailyRewardEligible) {
      const currentDay = reward.dailyStreak;
      const dailyReward = dailyRewards.find(r => r.day === currentDay);

      if (!dailyReward || reward.dailyRewardsClaimed.includes(currentDay)) {
        return res.status(400).json({ message: 'Daily reward already claimed or not eligible.' });
      }

      reward.coin += dailyReward.coin;
      reward.cash += dailyReward.cash;
      reward.dailyRewardsClaimed.push(currentDay);
      reward.isDailyRewardEligible = false;
    } else if (rewardType === 'streak' && reward.isStreakRewardEligible) {
      const streakReward = { 10: 1, 20: 2, 30: 5 }[reward.totalStreak];

      if (!streakReward || reward.rewardsClaimed.includes(reward.totalStreak)) {
        return res.status(400).json({ message: 'Streak reward already claimed or not eligible.' });
      }

      reward.roomCards += streakReward;
      reward.rewardsClaimed.push(reward.totalStreak);
      reward.isStreakRewardEligible = false;
    } else {
      return res.status(400).json({ message: 'Reward already claimed or not eligible.' });
    }

    await reward.save();
    res.json({ message: `${rewardType === 'daily' ? 'Daily' : 'Streak'} reward claimed!`, ...reward.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get User Reward Info
app.get('/reward/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const reward = await Rewards.findOne({ username });
    if (!reward) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(reward.toObject());
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});