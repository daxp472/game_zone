import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#1a1b26] fixed w-full z-50 top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="text-purple-500 text-2xl font-bold">
            GameZone
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`${isActivePath('/') ? 'text-purple-500' : 'text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`${isActivePath('/about') ? 'text-purple-500' : 'text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              About Us
            </Link>
            <Link 
              to="/how-to-play" 
              className={`${isActivePath('/how-to-play') ? 'text-purple-500' : 'text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              How to Play
            </Link>
            <Link 
              to="/contact" 
              className={`${isActivePath('/contact') ? 'text-purple-500' : 'text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Contact Us
            </Link>
            <Link 
              to="/login" 
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/') ? 'text-purple-500 bg-[#2a2b36]' : 'text-gray-300'
                } hover:text-purple-500 hover:bg-[#2a2b36] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/about') ? 'text-purple-500 bg-[#2a2b36]' : 'text-gray-300'
                } hover:text-purple-500 hover:bg-[#2a2b36] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/how-to-play"
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/how-to-play') ? 'text-purple-500 bg-[#2a2b36]' : 'text-gray-300'
                } hover:text-purple-500 hover:bg-[#2a2b36] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                How to Play
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md ${
                  isActivePath('/contact') ? 'text-purple-500 bg-[#2a2b36]' : 'text-gray-300'
                } hover:text-purple-500 hover:bg-[#2a2b36] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default LandingNavbar;