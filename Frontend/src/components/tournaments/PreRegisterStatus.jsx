import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function PreRegisterStatus({ tournamentId }) {
  const [status, setStatus] = useState('waiting');
  const [playersCount, setPlayersCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    // Simulate status updates
    const interval = setInterval(() => {
      setPlayersCount(prev => Math.min(prev + 1, 32));
      setTimeLeft(prev => Math.max(0, prev - 1));
      
      if (playersCount >= 32) {
        setStatus('ready');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playersCount]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1b26] p-6 rounded-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-4">Pre-Register Status</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-400 mb-2">Players Ready</p>
          <div className="bg-[#2a2b36] rounded-lg overflow-hidden">
            <div
              className="bg-purple-600 h-2 transition-all duration-300"
              style={{ width: `${(playersCount / 32) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-300 mt-1">{playersCount}/32 players</p>
        </div>
        
        <div>
          <p className="text-gray-400 mb-2">Time Remaining</p>
          <p className="text-2xl font-bold text-white">{formatTime(timeLeft)}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          <p className="text-gray-300">
            {status === 'ready' ? 'Ready to Start' : 'Waiting for Players'}
          </p>
        </div>
      </div>
      
      {status === 'ready' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-purple-700 transition-colors"
        >
          Enter Tournament
        </motion.button>
      )}
    </motion.div>
  );
}

export default PreRegisterStatus;