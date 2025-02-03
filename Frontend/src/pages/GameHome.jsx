import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GameCard from '../components/GameCard';
import TopPlayers from '../components/TopPlayers';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function Home() {
  const [games, setGames] = useState([]);
  const [topPlayers] = useState([
    { id: 1, username: 'Alex Gaming', level: 50, position: '1st Place', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: 2, username: 'Sarah Pro', level: 45, position: '2nd Place', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: 3, username: 'Mike Winner', level: 42, position: '3rd Place', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    { id: 4, username: 'Lisa Game', level: 40, position: '4th Place', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
  ]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://gamezone-trial.onrender.com/api/racing');
        const gamesWithIds = response.data.map((game, index) => ({
          ...game,
          id: game.id || `game-${index}`
        }));
        setGames(gamesWithIds);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const categories = [
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'action', name: 'Action', icon: '🎮' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'strategy', name: 'Strategy', icon: '♟️' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
  ];

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
          <div className="absolute inset-0 bg-gradient-to-r from-[#13141f] to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold text-white mb-6">Play Unlimited Games Online</h1>
                <p className="text-xl text-gray-300 mb-8">Join millions of players worldwide and experience the best online games. No downloads required!</p>
                <div className="flex gap-4">
                  <button className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 font-semibold">
                    Play Now
                  </button>
                  <button className="border-2 border-purple-600 text-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 hover:text-white font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-9">
              <section className="mb-12">
                <h2 className="text-2xl text-white font-bold mb-6">Featured Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {games.slice(0, 6).map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </section>

              <section className="mb-12">
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

            <div className="col-span-3">
              <TopPlayers players={topPlayers} />
              
              <div className="bg-[#1a1b26] rounded-lg p-6 mt-6">
                <h2 className="text-xl text-white font-bold mb-4">Stay Updated</h2>
                <p className="text-gray-300 text-sm mb-4">Subscribe to our newsletter for new game releases and tournaments!</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md mb-3"
                />
                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;