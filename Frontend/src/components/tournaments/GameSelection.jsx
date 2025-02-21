import { useState } from 'react';
import { motion } from 'framer-motion';

function GameSelection({ onSelect }) {
  const [selectedGame, setSelectedGame] = useState(null);
  
  const games = [
    {
      id: 'mini-militia',
      name: 'Mini Militia',
      icon: '🎮',
      description: 'Fast-paced 2D battle royale game'
    },
    {
      id: 'flappy-bird',
      name: 'Flappy Bird',
      icon: '🐦',
      description: 'Classic side-scrolling game'
    },
    {
      id: 'custom-game',
      name: 'Custom Game',
      icon: '🎲',
      description: 'Create your own custom game'
    }
  ];

  const handleSelect = (game) => {
    setSelectedGame(game.id);
    onSelect?.(game);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Select Game</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer p-4 rounded-lg ${
              selectedGame === game.id
                ? 'bg-purple-600'
                : 'bg-[#2a2b36] hover:bg-[#3a3b46]'
            } transition-colors`}
            onClick={() => handleSelect(game)}
          >
            <div className="text-center">
              <span className="text-4xl mb-2 block">{game.icon}</span>
              <h4 className="text-white font-medium mb-1">{game.name}</h4>
              <p className="text-sm text-gray-400">{game.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default GameSelection;