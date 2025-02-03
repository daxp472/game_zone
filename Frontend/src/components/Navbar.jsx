import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#1a1b26] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-purple-500 text-2xl font-bold">GameZone</Link>
          <Link to="/" className="text-gray-300 hover:text-purple-500">Home</Link>
          <Link to="/categories" className="text-gray-300 hover:text-purple-500">Categories</Link>
          <Link to="/new-games" className="text-gray-300 hover:text-purple-500">New Games</Link>
          <Link to="/popular" className="text-gray-300 hover:text-purple-500">Popular</Link>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search games..."
            className="bg-[#2a2b36] text-gray-300 px-4 py-1 rounded-md"
          />
          <button className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;