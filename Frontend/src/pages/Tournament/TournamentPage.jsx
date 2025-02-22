import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import TournamentList from '../../components/tournaments/TournamentList';
import GameSelection from '../../components/tournaments/GameSelection';
import MatchHistory from '../../components/tournaments/MatchHistory';

function TournamentPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'create', 'details'
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentPage === 'home') {
      navigate(-1); // Browser Back
    } else {
      setCurrentPage('home'); // Go to Home
    }
  };

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={handleBack} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            ← Back
          </button>
          <h1 className="text-3xl text-white font-bold">Tournaments</h1>
          <button onClick={() => navigate('/tournaments/create-room')} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            Create Tournament
          </button>
        </div>

        {/* Page Switching */}
        {currentPage === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <GameSelection onSelect={setSelectedGame} />
              <TournamentList onSelect={() => setCurrentPage('details')} />
            </div>

            <div className="space-y-8">
              <div className="bg-[#1a1b26] rounded-lg p-6">
                <h2 className="text-xl text-white font-bold mb-4">Your Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Tournaments', value: '12' },
                    { label: 'Wins', value: '5' },
                    { label: 'Win Rate', value: '41.7%' },
                    { label: 'Points', value: '2,500' },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#2a2b36] p-4 rounded-lg">
                      <p className="text-gray-400">{stat.label}</p>
                      <p className="text-2xl text-white font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <MatchHistory />
            </div>
          </div>
        )}

        {currentPage === 'create' && (
          <div className="bg-[#1a1b26] rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Create New Tournament</h2>
            <p>Form and inputs will go here...</p>
          </div>
        )}

        {currentPage === 'details' && (
          <div className="bg-[#1a1b26] rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Tournament Details</h2>
            <p>Match details will go here...</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default TournamentPage;
