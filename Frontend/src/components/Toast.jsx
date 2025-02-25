import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '🎮';
      case 'error':
        return '❌';
      case 'achievement':
        return '🏆';
      default:
        return '📢';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'achievement':
        return 'bg-purple-500 border-purple-600';
      default:
        return 'bg-blue-500 border-blue-600';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.5 }}
          className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-2 rounded-lg border ${getColors()} text-white shadow-lg`}
        >
          <span className="text-xl">{getIcon()}</span>
          <p className="font-medium">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;