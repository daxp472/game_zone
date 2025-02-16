import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function Home() {
  const [games1, setGames1] = useState([
    { id: 1, name: 'Game 1', category: 'Racing' },
    { id: 2, name: 'Game 2', category: 'Action' },
    { id: 3, name: 'Game 3', category: 'Puzzle' },
    { id: 4, name: 'Game 4', category: 'Sports' },
    { id: 5, name: 'Game 5', category: 'Strategy' },
    { id: 6, name: 'Game 6', category: 'Adventure' },
  ]);

  const categories = [
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'action', name: 'Action', icon: '🎮' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'strategy', name: 'Strategy', icon: '♟️' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
  ];

  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dashboard-oeum.onrender.com/dashboard/games');
        const gamesWithIds = response.data.map((game, index) => ({
          ...game,
          id: game.id || `game-${index}`
        }));
        setGames(gamesWithIds);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow">

        <div className="relative flex flex-col justify-center min-h-screen bg-gray-900 text-white">
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/dk16ymotz/image/upload/v1736786396/Site%20Images/ta2y8g4oz5qf09rbtwl5.png"
              alt="Gaming background"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-left px-2 pt-4">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Play Unlimited Games Online
            </h1>
            <p className="text-xl mb-8">
              Join millions of players worldwide and experience the best online games.
              No downloads required!
            </p>
            <div className="flex justify-start space-x-4">
              <button
                className={`px-8 py-3 bg-purple-600 rounded-lg font-semibold transition duration-300 ease-in-out ${isHovered ? 'bg-purple-700' : ''
                  }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Play Now
              </button>
              <button className="px-8 py-3 bg-gray-700 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-gray-600">
                Learn More
              </button>
            </div>
          </div>


          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
            <button
              className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center"
              aria-label="Scroll down"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <svg className="w-6 h-6 text-violet-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl text-white font-bold mb-8">Dashboard Games</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <div key={game.id} className="bg-[#1a1b26] p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover mb-4 rounded-md" />
                  <h2 className="text-2xl text-white font-bold mb-4">{game.title}</h2>
                  <Link to={`/game/${game.id}`}>
                    <button className="bg-purple-600 p-2 rounded-lg text-white hover:bg-purple-800 transition-colors duration-200">
                      Play
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl text-white font-bold mb-6">Explore Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games1.map((game) => (
              <div key={game.id} className="bg-[#1a1b26] p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 text-white">
                {game.name} - {game.category}
              </div>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-2xl text-white font-bold mb-6">Game Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="bg-[#1a1b26] p-6 rounded-lg flex flex-col items-center hover:bg-purple-600 transition-colors"
                >
                  <span className="text-3xl mb-3">{category.icon}</span>
                  <h3 className="text-white font-medium">{category.name}</h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;