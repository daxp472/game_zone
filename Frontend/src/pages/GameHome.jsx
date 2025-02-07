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
        <section className="relative h-[500px]">
          <img
            src="https://res.cloudinary.com/dk16ymotz/image/upload/v1736786396/Site%20Images/ta2y8g4oz5qf09rbtwl5.png"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
        </section>

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