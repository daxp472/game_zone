import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaSearch, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Side-bar/Sidebar';
import { toast } from 'react-toastify';

function GameNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}" (coming soon!)`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      });
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast.info(darkMode ? 'Light mode enabled!' : 'Dark mode enabled!', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'dark',
    });
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex font-orbitron">
      {/* Sidebar */}
      <div
        className={`hidden lg:block ${
          !hiddenSidebarRoutes.includes(location.pathname) ? '' : 'lg:hidden'
        } ${location.pathname === '/home' ? 'homepage-sidebar' : ''}`}
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 h-full z-50"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`bg-[#1a1b26]/95 p-4 fixed top-0 w-full z-40 shadow-xl h-16 backdrop-blur-xl border-b border-purple-500/30 ${
          !hiddenSidebarRoutes.includes(location.pathname) ? 'ml-0 lg:ml-16' : ''
        }`}
      >
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-300 hover:text-purple-400 lg:hidden"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {sidebarOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </motion.button>

              <Link to="/home" className="text-xl font-extrabold">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                >
                  GameZone
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {['Home', 'Categories', 'New Games', 'Popular', 'Multiplayer', 'Tournaments'].map((item, i) => (
                  <Link
                    key={i}
                    to={item === 'Home' ? '/home' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
                  >
                    <motion.span whileHover={{ y: -2, transition: { duration: 0.2 } }}>{item}</motion.span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className="relative"
                initial={false}
                animate={searchOpen ? { width: '200px' } : { width: '40px' }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="lg:hidden text-gray-300 hover:text-purple-400"
                  aria-label="Search"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaSearch className="h-5 w-5" />
                </motion.button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  className={`bg-[#2a2b36]/80 text-gray-300 px-4 py-1 rounded-lg w-full transition-all duration-300 border border-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                    searchOpen ? 'opacity-100' : 'opacity-0 hidden lg:block'
                  }`}
                />
              </motion.form>

              {/* Notification Bell */}
              <motion.button
                className="text-gray-300 hover:text-purple-400"
                onClick={() => toast.info('Notifications coming soon!', { position: 'top-right', theme: 'dark' })}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBell className="h-5 w-5" />
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="text-gray-300 hover:text-purple-400"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
              </motion.button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.img
                  src={user?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border border-purple-500/50"
                  onClick={handleProfileClick}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                />
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute right-0 mt-2 w-48 bg-[#2a2b36]/95 rounded-lg shadow-xl py-1 z-50 backdrop-blur-xl border border-purple-500/30"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/80 hover:text-white"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/profile/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/80 hover:text-white"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          toast.success('Logged out successfully!', { position: 'top-right', theme: 'dark' });
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/80 hover:text-white"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

export default GameNavbar;

<style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

  .font-orbitron {
    font-family: 'Orbitron', sans-serif;
  }
`}</style>