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

exports.getGlobalLeaderboard = async (req, res) => {
    try {
        const [xpData, achievementData, multiplayerData] = await Promise.all([
            XpLevel.find(),
            Achievement.find(),
            MultiplayerStats.find()
        ]);

        const leaderboard = xpData.map((xp, index) => {
            const achievements = achievementData.find(a => a.email === xp.email) || { achievements: [], total_wins: 0, total_losses: 0 };
            const multiplayer = multiplayerData.find(m => m.email === xp.email) || { games_played: [], total_matches: 0, win_ratio: 0 };
            return {
                email: xp.email,
                username: xp.username || `Player${index + 1}`,
                xp: xp.xp,
                level: xp.level,
                achievements: achievements.achievements.length,
                totalWins: multiplayer.games_played.reduce((sum, game) => sum + game.wins, 0),
                totalMatches: multiplayer.total_matches,
                winRatio: multiplayer.win_ratio,
                rankPoints: calculateRankPoints(xp.xp, multiplayer.win_ratio, multiplayer.total_matches)
            };
        }).sort((a, b) => b.rankPoints - a.rankPoints);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Simple rank points calculation
const calculateRankPoints = (xp, winRatio, totalMatches) => {
    return Math.round(xp * 0.5 + winRatio * 10 + totalMatches * 2);
};