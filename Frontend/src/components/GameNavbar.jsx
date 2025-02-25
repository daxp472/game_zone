import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Side-bar/Sidebar';

function GameNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    setTimeout(() => {
      if (clickCount >= 1) {
        navigate('/profile');
      } else {
        setDropdownOpen((prevOpen) => !prevOpen);
      }
      setClickCount(0);
    }, 200);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hiddenSidebarRoutes = ['/profile', '/profile/subscription', '/profile/settings', '/profile/notifications', '/profile/referral', '/profile/global-performance'];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed z-50 h-screen bg-[#1a1b26] shadow-2xl"
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`bg-[#1a1b26] p-4 fixed top-0 w-full z-40 shadow-lg ${!hiddenSidebarRoutes.includes(location.pathname) ? 'ml-0 md:ml-16' : ''}`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-300 hover:text-purple-500 md:hidden"
              >
                <FaBars className="h-6 w-6" />
              </button>
              
              <Link to="/home" className="text-purple-500 text-2xl font-bold whitespace-nowrap">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  GameZone
                </motion.span>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                <Link to="/home" className="text-gray-300 hover:text-purple-500 transition-colors">Home</Link>
                <Link to="/categories" className="text-gray-300 hover:text-purple-500 transition-colors">Categories</Link>
                <Link to="/new-games" className="text-gray-300 hover:text-purple-500 transition-colors">New Games</Link>
                <Link to="/popular" className="text-gray-300 hover:text-purple-500 transition-colors">Popular</Link>
                <Link to="/multiplayer" className="text-gray-300 hover:text-purple-500 transition-colors">Multiplayer</Link>
                <Link to="/tournaments" className="text-gray-300 hover:text-purple-500 transition-colors">Tournaments</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div 
                className="relative"
                initial={false}
                animate={searchOpen ? { width: "200px" } : { width: "40px" }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="md:hidden text-gray-300 hover:text-purple-500"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  placeholder="Search games..."
                  className={`bg-[#2a2b36] text-gray-300 px-4 py-1 rounded-md w-full transition-all duration-300 ${
                    searchOpen ? 'opacity-100' : 'opacity-0 hidden md:block'
                  }`}
                />
              </motion.div>

              <div className="relative" ref={dropdownRef}>
                <motion.img 
                  src={user?.profilePicture || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"}
                  alt="Profile" 
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={handleProfileClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute right-0 mt-2 w-48 bg-[#2a2b36] rounded-md shadow-lg py-1 z-50"
                    >
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600">Profile</Link>
                      <Link to="/profile/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600">Settings</Link>
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-2">
                  <Link to="/home" className="text-gray-300 hover:text-purple-500 py-2">Home</Link>
                  <Link to="/categories" className="text-gray-300 hover:text-purple-500 py-2">Categories</Link>
                  <Link to="/new-games" className="text-gray-300 hover:text-purple-500 py-2">New Games</Link>
                  <Link to="/popular" className="text-gray-300 hover:text-purple-500 py-2">Popular</Link>
                  <Link to="/multiplayer" className="text-gray-300 hover:text-purple-500 py-2">Multiplayer</Link>
                  <Link to="/tournaments" className="text-gray-300 hover:text-purple-500 py-2">Tournaments</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}

export default GameNavbar;