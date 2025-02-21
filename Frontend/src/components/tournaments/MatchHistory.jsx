import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function MatchHistory() {
  const [matches, setMatches] = useState([
    {
      id: 1,
      tournament: "Pro Gaming League",
      game: "Mini Militia",
      date: "2024-03-15",
      result: "Won",
      score: "10-5",
      opponent: "Player123"
    },
    {
      id: 2,
      tournament: "Flappy Bird Championship",
      game: "Flappy Bird",
      date: "2024-03-14",
      result: "Lost",
      score: "85-92",
      opponent: "FlappyMaster"
    }
  ]);

  const getResultColor = (result) => {
    switch (result.toLowerCase()) {
      case 'won':
        return 'text-green-500';
      case 'lost':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Match History</h3>
      
      <div className="space-y-4">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2a2b36] p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{match.tournament}</h4>
                <p className="text-sm text-gray-400">{match.game}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${getResultColor(match.result)}`}>
                  {match.result}
                </p>
                <p className="text-sm text-gray-400">{match.score}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <p className="text-gray-400">vs {match.opponent}</p>
              <p className="text-gray-400">{match.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MatchHistory;