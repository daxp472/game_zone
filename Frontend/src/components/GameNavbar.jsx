import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function GameNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);

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

  return (
    <nav className="bg-[#1a1b26] p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-purple-500 text-2xl font-bold whitespace-nowrap">GameZone</Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-gray-300 hover:text-purple-500">Home</Link>
            <Link to="/categories" className="text-gray-300 hover:text-purple-500">Categories</Link>
            <Link to="/new-games" className="text-gray-300 hover:text-purple-500">New Games</Link>
            <Link to="/popular" className="text-gray-300 hover:text-purple-500">Popular</Link>
            <Link to="/multiplayer" className="text-gray-300 hover:text-purple-500">Multiplayer</Link>
            <Link to="/tournaments" className="text-gray-300 hover:text-purple-500">Tournaments</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search games..."
            className="bg-[#2a2b36] text-gray-300 px-4 py-1 ml-5 rounded-md"
          />
          <div className="flex items-center space-x-3">
            <div className="relative" ref={dropdownRef}>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                alt="Profile" 
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={handleProfileClick}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2a2b36] rounded-md shadow-lg py-1">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600">Profile</Link>
                  <Link to="/profile/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600">Settings</Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="h-6 w-6 text-gray-300" />
              ) : (
                <FaBars className="h-6 w-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#1a1b26] p-4">
          <Link to="/home" className="block text-gray-300 hover:text-purple-500 mb-2">Home</Link>
          <Link to="/categories" className="block text-gray-300 hover:text-purple-500 mb-2">Categories</Link>
          <Link to="/new-games" className="block text-gray-300 hover:text-purple-500 mb-2">New Games</Link>
          <Link to="/popular" className="block text-gray-300 hover:text-purple-500 mb-2">Popular</Link>
          <Link to="/multiplayer" className="block text-gray-300 hover:text-purple-500 mb-2">Multiplayer</Link>
          <Link to="/tournaments" className="block text-gray-300 hover:text-purple-500 mb-2">Tournaments</Link>
        </div>
      )}
    </nav>
  );
}

export default GameNavbar;