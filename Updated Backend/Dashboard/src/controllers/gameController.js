const Game = require('../models/Game');
const Score = require('../models/Score');

exports.getGames = async (req, res) => {
  try {
    console.log('Fetching games...');
    
    // First verify the collection exists and has documents
    const count = await Game.countDocuments();
    console.log('Total games in database:', count);
    
    const games = await Game.find({ active: true })
      .select('title description imageUrl gameUrl gameId')
      .lean()
      .limit(6);
    
    console.log('Found games:', JSON.stringify(games, null, 2));
    
    if (!games || games.length === 0) {
      console.log('No games found in database');
      return res.status(404).json({ message: 'No games found' });
    }
    
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};

exports.getGameDetails = async (req, res) => {
  try {
    console.log('Fetching game details for ID:', req.params.id);
    
    const game = await Game.findById(req.params.id).lean();
    
    if (!game) {
      console.log('Game not found with ID:', req.params.id);
      return res.status(404).json({ error: 'Game not found' });
    }

    // Fetch top 10 scores for this game
    const leaderboard = await Score.find({ gameId: game._id })
      .sort({ score: -1 })
      .limit(10)
      .select('username score rank')
      .lean();

    console.log('Game details:', JSON.stringify({ game, leaderboard }, null, 2));
    
    res.json({
      game,
      leaderboard
    });
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
};