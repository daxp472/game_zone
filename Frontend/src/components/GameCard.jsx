import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

function GameCard({ gameId, category }) {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`https://gamezone-trial.onrender.com/api/${category}/${gameId}`);
        if (!response.ok) throw new Error('Failed to fetch game data');
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [gameId, category]);

  const handlePlayNow = () => {
    if (game) navigate(`/game/${gameId}`);
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!game) return <div className="text-gray-400">Game not found</div>;

  console.log(gameId, category);

  return (
    <div className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="cursor-pointer relative" onClick={handlePlayNow}>
        <div className="relative w-full h-48">
          <img 
            src={game.photos?.thumbnail || 'https://via.placeholder.com/400x300?text=Game'} 
            alt={game.name || 'Game thumbnail'}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=Game')}
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl text-white font-semibold mb-2 truncate">{game.name || 'Unknown Game'}</h3>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-300 ml-1">{game.rating?.average?.toFixed(1) || '0.0'}</span>
            <span className="text-gray-400 ml-2">{game.playCount ? `${game.playCount} players` : 'No players yet'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="bg-purple-600 text-white text-sm px-2 py-1 rounded">
              {game.category || 'General'}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handlePlayNow();
              }}
              className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition-colors"
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;