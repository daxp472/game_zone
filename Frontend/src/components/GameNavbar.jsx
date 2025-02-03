import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function GameNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#1a1b26] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-purple-500 text-2xl font-bold">GameZone</Link>
          <Link to="/home" className="text-gray-300 hover:text-purple-500">Home</Link>
          <Link to="/categories" className="text-gray-300 hover:text-purple-500">Categories</Link>
          <Link to="/new-games" className="text-gray-300 hover:text-purple-500">New Games</Link>
          <Link to="/popular" className="text-gray-300 hover:text-purple-500">Popular</Link>
          <Link to="/multiplayer" className="text-gray-300 hover:text-purple-500">Multiplayer</Link>
          <Link to="/tournaments" className="text-gray-300 hover:text-purple-500">Tournaments</Link>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search games..."
            className="bg-[#2a2b36] text-gray-300 px-4 py-1 rounded-md"
          />
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                alt="Profile" 
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-[#2a2b36] rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600">Settings</Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default GameNavbar;