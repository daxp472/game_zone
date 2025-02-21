import { useState } from 'react';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function Tournaments() {
  const [tournaments] = useState([
    {
      id: 1,
      title: "Racing Championship",
      date: "March 15, 2024",
      prize: "$1000",
      participants: "128/256",
      game: "Speed Racer X",
      status: "Registering"
    },
    {
      id: 2,
      title: "Battle Royale Masters",
      date: "March 20, 2024",
      prize: "$2000",
      participants: "64/100",
      game: "Arena Warriors",
      status: "Registering"
    },
    {
      id: 3,
      title: "Puzzle Challenge",
      date: "March 25, 2024",
      prize: "$500",
      participants: "32/64",
      game: "Mind Maze",
      status: "Coming Soon"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl text-white font-bold mb-8">Tournaments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="bg-[#1a1b26] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl text-white font-semibold mb-2">{tournament.title}</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Date: {tournament.date}</p>
                  <p>Prize Pool: {tournament.prize}</p>
                  <p>Participants: {tournament.participants}</p>
                  <p>Game: {tournament.game}</p>
                  <div className="mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      tournament.status === 'Registering' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {tournament.status}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tournaments;