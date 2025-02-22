import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LiveMatches() {
  const [matches, setMatches] = useState([
    {
      id: 1,
      game: "Mini Militia",
      players: ["Player1", "Player2"],
      status: "Ongoing",
      time: "5:32",
    },
    {
      id: 2,
      game: "Flappy Bird",
      players: ["FlappyKing", "SkyMaster"],
      status: "Waiting",
      time: "0:00",
    },
  ]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Live Matches</h3>

      <div className="space-y-4">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2a2b36] p-4 rounded-lg flex justify-between"
          >
            <div>
              <h4 className="text-white font-medium">{match.game}</h4>
              <p className="text-gray-400 text-sm">
                {match.players.join(" vs ")}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-medium ${match.status === "Ongoing" ? "text-green-500" : "text-yellow-500"}`}>
                {match.status}
              </p>
              <p className="text-gray-400 text-sm">{match.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LiveMatches;
