const MultiplayerStats = require('../models/multiplayerStatsModel');
const { validationResult } = require('express-validator');

exports.updateStats = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, game, won } = req.body;
    
    let stats = await MultiplayerStats.findOne({ email });
    
    if (!stats) {
      stats = new MultiplayerStats({ email });
    }
    
    let gameStats = stats.games_played.find(g => g.game === game);
    
    if (!gameStats) {
      gameStats = { game, matches: 0, wins: 0, losses: 0 };
      stats.games_played.push(gameStats);
    }
    
    gameStats.matches++;
    if (won) {
      gameStats.wins++;
    } else {
      gameStats.losses++;
    }
    
    stats.total_matches++;
    stats.win_ratio = (stats.games_played.reduce((total, game) => total + game.wins, 0) / stats.total_matches) * 100;
    
    await stats.save();
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await MultiplayerStats.findOne({ email: req.params.email });
    
    if (!stats) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};