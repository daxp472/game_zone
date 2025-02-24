import React from 'react';
import { motion } from 'framer-motion';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';

const challenges = [
  { title: 'Score 1000 Points', description: 'Score 1000 points in any game.', status: 'Pending' },
  { title: 'Win 3 Matches', description: 'Win 3 matches in multiplayer mode.', status: 'Pending' },
  { title: 'Collect 50 Coins', description: 'Collect 50 coins in a single run.', status: 'Pending' },
  { title: 'Complete a Tournament', description: 'Participate and complete a tournament.', status: 'Pending' },
];

const DailyChallenges = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <GameNavbar />
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold mb-8">Daily Challenges</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700 p-4 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-bold mb-2">{challenge.title}</h3>
                <p className="text-gray-400 mb-4">{challenge.description}</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300">
                  {challenge.status}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-5xl mt-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">More Challenges Coming Soon!</h2>
          <p className="text-lg text-gray-400 mb-4">Participate in our daily challenges and stand a chance to win amazing rewards. New challenges are added every day, so keep an eye out!</p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DailyChallenges;