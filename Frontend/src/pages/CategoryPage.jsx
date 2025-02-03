import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GameCard from '../components/GameCard';
import TopPlayers from '../components/TopPlayers';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function CategoryPage() {
  const { categoryId } = useParams();
  const [games, setGames] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`https://gamezone-trial.onrender.com/api/${categoryId}`);
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
  }, [categoryId]);

  const categoryNames = {
    racing: 'Racing Games',
    action: 'Action Games',
    puzzle: 'Puzzle Games',
    sports: 'Sports Games',
    strategy: 'Strategy Games',
    adventure: 'Adventure Games'
  };

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex gap-8">
          <div className="flex-1">
            <h1 className="text-3xl text-white font-bold mb-8">{categoryNames[categoryId] || 'Games'}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
          <div className="w-80">
            <TopPlayers players={topPlayers} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;