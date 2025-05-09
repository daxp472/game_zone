import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1a1b26] fixed w-full z-50 top-0 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="text-purple-400 text-3xl font-extrabold tracking-tight">
            GameZone
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActivePath('/') ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-200'} hover:text-purple-400 transition-all duration-300 font-medium`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`${isActivePath('/about') ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-200'} hover:text-purple-400 transition-all duration-300 font-medium`}
            >
              About Us
            </Link>
            <Link 
              to="/how-to-play" 
              className={`${isActivePath('/how-to-play') ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-200'} hover:text-purple-400 transition-all duration-300 font-medium`}
            >
              How to Play
            </Link>
            <Link 
              to="/contact" 
              className={`${isActivePath('/contact') ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-200'} hover:text-purple-400 transition-all duration-300 font-medium`}
            >
              Contact Us
            </Link>
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:scale-105 transition-transform duration-200 font-medium"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-200 hover:text-purple-400 focus:outline-none"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in bg-[#2a2b36]">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg ${isActivePath('/') ? 'text-purple-400 bg-[#3a3b46]' : 'text-gray-200'} hover:text-purple-400 hover:bg-[#3a3b46] transition-all duration-200 font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block px-4 py-3 rounded-lg ${isActivePath('/about') ? 'text-purple-400 bg-[#3a3b46]' : 'text-gray-200'} hover:text-purple-400 hover:bg-[#3a3b46] transition-all duration-200 font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/how-to-play"
                className={`block px-4 py-3 rounded-lg ${isActivePath('/how-to-play') ? 'text-purple-400 bg-[#3a3b46]' : 'text-gray-200'} hover:text-purple-400 hover:bg-[#3a3b46] transition-all duration-200 font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                How to Play
              </Link>
              <Link
                to="/contact"
                className={`block px-4 py-3 rounded-lg ${isActivePath('/contact') ? 'text-purple-400 bg-[#3a3b46]' : 'text-gray-200'} hover:text-purple-400 hover:bg-[#3a3b46] transition-all duration-200 font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 transition-transform duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}

export default LandingNavbar;