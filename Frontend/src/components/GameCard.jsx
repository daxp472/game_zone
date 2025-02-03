import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GameCard({ game }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const rating = game.rating?.average || 0;
  const playerCount = game.players?.count ? `${game.players.count}+ Players` : 'No players yet';

  const handlePlayNow = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Since the play count increment endpoint might not be available,
      // we'll just navigate to the game details page
      navigate(`/game/${game.id}`);
    } catch (err) {
      setError('Unable to start game. Please try again.');
      console.error('Error starting game:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div 
        className="cursor-pointer relative"
        onClick={handlePlayNow}
      >
        {/* Thumbnail with fallback */}
        <div className="relative w-full h-48">
          <img 
            src={game.photos?.thumbnail || 'https://via.placeholder.com/400x300?text=Game'} 
            alt={game.title || 'Game thumbnail'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Game';
            }}
            loading="lazy"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl text-white font-semibold mb-2">{game.title || 'Untitled Game'}</h3>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-300 ml-1">{rating.toFixed(1)}</span>
            <span className="text-gray-400 ml-2">{playerCount}</span>
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
              disabled={isLoading}
              className={`bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition-colors
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Loading...' : 'Play Now'}
            </button>
          </div>
          {error && (
            <div className="mt-2 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameCard;