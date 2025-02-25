import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MobileNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-[#1a1b26] p-4 z-50 md:hidden"
    >
      <div className="flex justify-around items-center">
        <Link
          to="/home"
          className={`flex flex-col items-center ${
            isActive('/home') ? 'text-purple-500' : 'text-gray-400'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/categories"
          className={`flex flex-col items-center ${
            isActive('/categories') ? 'text-purple-500' : 'text-gray-400'
          }`}
        >
          <span className="text-xl">🎮</span>
          <span className="text-xs mt-1">Categories</span>
        </Link>

        <div className="relative -mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-2xl">⚔️</span>
          </motion.button>
        </div>

        <Link
          to="/multiplayer"
          className={`flex flex-col items-center ${
            isActive('/multiplayer') ? 'text-purple-500' : 'text-gray-400'
          }`}
        >
          <span className="text-xl">👥</span>
          <span className="text-xs mt-1">Multiplayer</span>
        </Link>

        <Link
          to="/tournaments"
          className={`flex flex-col items-center ${
            isActive('/tournaments') ? 'text-purple-500' : 'text-gray-400'
          }`}
        >
          <span className="text-xl">🏆</span>
          <span className="text-xs mt-1">Tournaments</span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default MobileNavigation;