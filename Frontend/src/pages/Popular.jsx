import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function Popular() {
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
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl text-white font-bold mb-8">Popular Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Popular;