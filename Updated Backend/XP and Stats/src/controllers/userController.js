const XpLevel = require('../models/xpModel');
const Achievement = require('../models/achievementModel');
const MultiplayerStats = require('../models/multiplayerStatsModel');

exports.getAllStats = async (req, res) => {
  try {
    const email = req.params.email;
    
    const [xp, achievements, multiplayerStats] = await Promise.all([
      XpLevel.findOne({ email }),
      Achievement.findOne({ email }),
      MultiplayerStats.findOne({ email })
    ]);
    
    if (!xp && !achievements && !multiplayerStats) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      xp_stats: xp || { email, xp: 0, level: 1 },
      achievements: achievements || { email, achievements: [], total_wins: 0, total_losses: 0 },
      multiplayer_stats: multiplayerStats || { email, games_played: [], total_matches: 0, win_ratio: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};