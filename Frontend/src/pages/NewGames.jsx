import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function NewGames() {
  const [games, setGames] = useState([]);

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

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow">
        <section className="mb-12 relative">
          <img 
            src="https://res.cloudinary.com/dk16ymotz/image/upload/v1736786394/Site%20Images/cmozfrocdqaiwroy71pt.png"
            alt="New Games Banner"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#13141f] to-transparent flex items-center px-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl text-white font-bold mb-4">New Games</h1>
              <p className="text-gray-300">Discover our latest additions to the GameZone collection</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewGames;