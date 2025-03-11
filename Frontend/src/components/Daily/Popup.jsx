import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Popup({ onClose }) {
  // Dummy streak data (tum isko backend se fetch kar sakte ho)
  const [streakCount, setStreakCount] = useState(5); // Example streak count

  return (
    <div className="w-full max-w-sm p-6 bg-[#1a1b26] rounded-lg shadow-lg text-white">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Daily Streak
      </h2>

      {/* Streak Info */}
      <div className="flex flex-col items-center mb-6">
        <motion.div
          className="text-5xl font-bold text-purple-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          🔥 {streakCount}
        </motion.div>
        <p className="text-gray-300 mt-2">Days in a row!</p>
      </div>

      {/* Streak Message */}
      <p className="text-center text-gray-400 mb-6">
        Keep playing daily to maintain your streak and unlock rewards!
      </p>

      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Close
      </motion.button>
    </div>
  );
}

export default Popup;