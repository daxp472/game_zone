import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function TournamentList() {
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      title: "Pro Gaming League",
      game: "Mini Militia",
      startDate: "2024-03-20",
      prizePool: "$5000",
      participants: "32/64",
      status: "Registering"
    },
    {
      id: 2,
      title: "Flappy Bird Championship",
      game: "Flappy Bird",
      startDate: "2024-03-25",
      prizePool: "$2000",
      participants: "16/32",
      status: "Upcoming"
    },
    // Add more tournament data as needed
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {tournaments.map((tournament) => (
        <motion.div
          key={tournament.id}
          variants={itemVariants}
          className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{tournament.title}</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <span className="w-24 text-gray-400">Game:</span>
                {tournament.game}
              </p>
              <p className="flex items-center">
                <span className="w-24 text-gray-400">Start Date:</span>
                {tournament.startDate}
              </p>
              <p className="flex items-center">
                <span className="w-24 text-gray-400">Prize Pool:</span>
                {tournament.prizePool}
              </p>
              <p className="flex items-center">
                <span className="w-24 text-gray-400">Players:</span>
                {tournament.participants}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm ${
                tournament.status === 'Registering' ? 'bg-green-600' : 'bg-yellow-600'
              }`}>
                {tournament.status}
              </span>
              <Link
                to={`/tournament/${tournament.id}`}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TournamentList;