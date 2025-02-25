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
      {/* Sidebar - Hidden in welcome section on homepage */}
      <div className={`hidden lg:block ${
        !hiddenSidebarRoutes.includes(location.pathname) ? '' : 'lg:hidden'
      } ${location.pathname === '/home' ? 'homepage-sidebar' : ''}`}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Only visible when toggled on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="lg:hidden">
            <Sidebar />
          </div>
        )}
      </AnimatePresence>

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`bg-[#1a1b26] p-4 fixed top-0 w-full z-40 shadow-lg h-16 ${
          !hiddenSidebarRoutes.includes(location.pathname) ? 'ml-0 lg:ml-16' : ''
        }`}
      >
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-300 hover:text-purple-500 lg:hidden"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
              
              <Link to="/home" className="text-purple-500 text-xl font-bold whitespace-nowrap">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  GameZone
                </motion.span>
              </Link>

              {/* Desktop Navigation - Only visible on PC */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link to="/home" className="text-gray-300 hover:text-purple-500 transition-colors text-sm">Home</Link>
                <Link to="/categories" className="text-gray-300 hover:text-purple-500 transition-colors text-sm">Categories</Link>
                <Link to="/new-games" className="text-gray-300 hover:text-purple-500 transition-colors text-sm">New Games</Link>
                <Link to="/popular" className="text-gray-300 hover:text-purple-500 transition-colors text-sm">Popular</Link>
                <Link to="/multiplayer" className="text-gray-300 hover:text-purple-500 transition-colors text-sm">Multiplayer</Link>
                <Link to="/tournaments" className="text-gray-300 hover:text-purple-500 transition-colors text-sm">Tournaments</Link>
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
                  className="lg:hidden text-gray-300 hover:text-purple-500"
                  aria-label="Search"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  placeholder="Search games..."
                  className={`bg-[#2a2b36] text-gray-300 px-4 py-1 rounded-md w-full transition-all duration-300 ${
                    searchOpen ? 'opacity-100' : 'opacity-0 hidden lg:block'
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
        </div>
      </motion.nav>
    </div>
  );
}

export default GameNavbar;