import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

const API_BASE_URL = 'https://gamezone-trial.onrender.com/api';

function GameDetails() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [similarGames, setSimilarGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch game details
        const gameResponse = await axios.get(`${API_BASE_URL}/racing/${gameId}`);
        setGame(gameResponse.data);

        // Fetch leaderboard data
        const leaderboardResponse = await axios.get(`${API_BASE_URL}/leaderboard/game/${gameId}`);
        setLeaderboard(leaderboardResponse.data.slice(0, 5)); // Only take top 5 players

        // Fetch similar games
        const similarGamesResponse = await axios.get(`${API_BASE_URL}/racing?preview=true`);
        const filteredGames = similarGamesResponse.data
          .filter(g => g.id !== gameId)
          .slice(0, 4);
        setSimilarGames(filteredGames);

      } catch (error) {
        console.error('Error fetching game data:', error);
        setError('Failed to load game details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  const handleDownload = async () => {
    try {
      await axios.post(`${API_BASE_URL}/racing/${gameId}/download`);
      // Handle successful download
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#13141f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#13141f] flex items-center justify-center">
        <div className="bg-[#1a1b26] p-8 rounded-lg text-white text-center">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!game) return null;

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={game.photos?.banner || game.photos?.thumbnail}
                alt={game.name}
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Game+Banner';
                }}
              />
            </div>

            {/* Game Info */}
            <div className="bg-[#1a1b26] rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl text-white font-bold mb-2">{game.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {game.category}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <span className="mr-1">★</span>
                      <span className="text-white">{game.rating?.average?.toFixed(1) || '0.0'}</span>
                      <span className="text-gray-400 text-sm ml-1">({game.rating?.count || 0} ratings)</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleDownload}
                  className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
                >
                  Download
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl text-white font-semibold mb-2">Description</h2>
                  <p className="text-gray-300">{game.description}</p>
                </div>

                {game.howToPlay && game.howToPlay.length > 0 && (
                  <div>
                    <h2 className="text-xl text-white font-semibold mb-2">How to Play</h2>
                    <div className="bg-[#2a2b36] p-4 rounded-lg text-gray-300">
                      <ul className="list-disc list-inside space-y-2">
                        {game.howToPlay.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {game.gameplayTips && game.gameplayTips.length > 0 && (
                  <div>
                    <h2 className="text-xl text-white font-semibold mb-2">Gameplay Tips</h2>
                    <div className="bg-[#2a2b36] p-4 rounded-lg text-gray-300">
                      <ul className="list-disc list-inside space-y-2">
                        {game.gameplayTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-xl text-white font-semibold mb-2">Game Details</h2>
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    {game.developer && (
                      <p><span className="font-semibold">Developer:</span> {game.developer}</p>
                    )}
                    {game.technology && (
                      <p><span className="font-semibold">Technology:</span> {game.technology}</p>
                    )}
                    {game.releaseDate && (
                      <p><span className="font-semibold">Release Date:</span> {new Date(game.releaseDate).toLocaleDateString()}</p>
                    )}
                    {game.lastUpdated && (
                      <p><span className="font-semibold">Last Updated:</span> {new Date(game.lastUpdated).toLocaleDateString()}</p>
                    )}
                    {game.size && (
                      <p><span className="font-semibold">Size:</span> {game.size}</p>
                    )}
                    {game.difficulty && (
                      <p><span className="font-semibold">Difficulty:</span> {game.difficulty}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard and Game Info */}
          <div className="lg:col-span-1">
            {/* Leaderboard */}
            <div className="bg-[#1a1b26] rounded-lg p-6 mb-6">
              <h2 className="text-xl text-white font-semibold mb-4">Top Players</h2>
              <div className="space-y-4">
                {leaderboard.map((player, index) => (
                  <div key={player.id} className="flex items-center space-x-3">
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-300' :
                      index === 2 ? 'text-orange-400' :
                      'text-gray-400'
                    }`}>
                      #{index + 1}
                    </span>
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.username}`}
                      alt={player.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-white">{player.username}</p>
                      <p className="text-gray-400 text-sm">{player.score.toLocaleString()} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Features */}
            {game.socialFeatures && (
              <div className="bg-[#1a1b26] rounded-lg p-6 mb-6">
                <h2 className="text-xl text-white font-semibold mb-4">Features</h2>
                <div className="space-y-2">
                  {game.socialFeatures.multiplayer && (
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">🎮</span> Multiplayer
                    </div>
                  )}
                  {game.socialFeatures.leaderboards && (
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">🏆</span> Leaderboards
                    </div>
                  )}
                  {game.socialFeatures.chat && (
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">💬</span> Chat
                    </div>
                  )}
                  {game.socialFeatures.friendSystem && (
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">👥</span> Friend System
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Games */}
        {similarGames.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl text-white font-bold mb-6">Similar Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarGames.map((game) => (
                <div 
                  key={game.id} 
                  className="bg-[#1a1b26] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/game/${game.id}`)}
                >
                  <img
                    src={game.photos?.thumbnail}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Game';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{game.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-300">{game.rating?.average?.toFixed(1) || '0.0'}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/game/${game.id}`);
                        }}
                        className="text-purple-500 hover:text-purple-400"
                      >
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GameDetails;