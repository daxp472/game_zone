import { useState } from 'react';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';
import TournamentList from '../components/tournaments/TournamentList';
import GameSelection from '../components/tournaments/GameSelection';
import MatchHistory from '../components/tournaments/MatchHistory';

function TournamentPage() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-white font-bold">Tournaments</h1>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            Create Tournament
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <GameSelection onSelect={setSelectedGame} />
            <TournamentList />
          </div>

          <div className="space-y-8">
            <div className="bg-[#1a1b26] rounded-lg p-6">
              <h2 className="text-xl text-white font-bold mb-4">Your Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2a2b36] p-4 rounded-lg">
                  <p className="text-gray-400">Tournaments</p>
                  <p className="text-2xl text-white font-bold">12</p>
                </div>
                <div className="bg-[#2a2b36] p-4 rounded-lg">
                  <p className="text-gray-400">Wins</p>
                  <p className="text-2xl text-white font-bold">5</p>
                </div>
                <div className="bg-[#2a2b36] p-4 rounded-lg">
                  <p className="text-gray-400">Win Rate</p>
                  <p className="text-2xl text-white font-bold">41.7%</p>
                </div>
                <div className="bg-[#2a2b36] p-4 rounded-lg">
                  <p className="text-gray-400">Points</p>
                  <p className="text-2xl text-white font-bold">2,500</p>
                </div>
              </div>
            </div>

            <MatchHistory />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TournamentPage;