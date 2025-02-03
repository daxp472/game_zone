import { useState } from 'react';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function Multiplayer() {
  const [rooms] = useState([
    {
      id: 1,
      name: "Racing Room #1",
      players: "3/4",
      game: "Speed Racer X",
      status: "Waiting",
      host: "Alex Gaming"
    },
    {
      id: 2,
      name: "Battle Arena",
      players: "2/6",
      game: "Arena Warriors",
      status: "In Progress",
      host: "Sarah Pro"
    },
    {
      id: 3,
      name: "Puzzle Party",
      players: "1/4",
      game: "Mind Maze",
      status: "Waiting",
      host: "Mike Winner"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-white font-bold">Multiplayer Rooms</h1>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            Create Room
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-[#1a1b26] rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl text-white font-semibold mb-2">{room.name}</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Players: {room.players}</p>
                  <p>Game: {room.game}</p>
                  <p>Host: {room.host}</p>
                  <div className="mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      room.status === 'Waiting' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                  Join Room
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

export default Multiplayer;