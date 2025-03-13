const Score = require('../models/Score');
const Game = require('../models/Game');

exports.updateGameScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    const gameId = req.params.id;

    // Get game type for score handling
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Find existing score
    const existingScore = await Score.findOne({ username, gameId });

    // Handle score based on game type
    let shouldUpdate = false;
    if (!existingScore) {
      shouldUpdate = true;
    } else {
      switch (game.title.toLowerCase()) {
        case '2048':
          shouldUpdate = score > existingScore.score;
          break;
        case 'hangman':
        case 'xo':
          // For win-based games, accumulate the wins
          shouldUpdate = true;
          score = existingScore.score + 1; // Increment win count
          break;
      }
    }

    if (shouldUpdate) {
      if (existingScore) {
        existingScore.score = score;
        await existingScore.save();
      } else {
        await Score.create({ 
          username, 
          gameId, 
          score,
          gameType: game.title.toLowerCase()
        });
      }
      
      await updateLeaderboardRanks(gameId);
    }

    res.json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update score' });
  }
};

exports.submitFinalScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    const gameId = req.params.id;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const existingScore = await Score.findOne({ username, gameId });
    let finalScore = score;

    if (existingScore) {
      switch (game.title.toLowerCase()) {
        case '2048':
          if (score > existingScore.score) {
            existingScore.score = score;
            await existingScore.save();
          }
          break;
        case 'hangman':
        case 'xo':
          finalScore = existingScore.score; // Keep the accumulated wins
          break;
      }
    } else {
      await Score.create({ 
        username, 
        gameId, 
        score: finalScore,
        gameType: game.title.toLowerCase()
      });
    }

    await updateLeaderboardRanks(gameId);
    res.json({ message: 'Final score submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit final score' });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const leaderboard = await Score.find({ gameId: req.params.gameId })
      .sort({ score: -1 })
      .limit(10)
      .select('username score rank');

    // Add game-specific context to the response
    const response = {
      game: game.title,
      scoreType: game.title.toLowerCase() === '2048' ? 'points' : 'wins',
      leaderboard
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

async function updateLeaderboardRanks(gameId) {
  const scores = await Score.find({ gameId }).sort({ score: -1 });
  
  for (let i = 0; i < scores.length; i++) {
    scores[i].rank = i + 1;
    await scores[i].save();
  }
}