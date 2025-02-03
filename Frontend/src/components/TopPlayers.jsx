import { Link } from 'react-router-dom';

function TopPlayers({ players = [] }) {
  if (players.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#1a1b26] rounded-lg p-6">
      <h2 className="text-xl text-white font-bold mb-4">Top Players</h2>
      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center space-x-3">
            <img
              src={player.avatar}
              alt={player.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">{player.username}</h3>
                <span className="text-purple-500 text-sm">Level {player.level}</span>
              </div>
              <p className="text-gray-400 text-sm">{player.position}</p>
            </div>
          </div>
        ))}
      </div>
      <Link 
        to="/leaderboard" 
        className="block w-full text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 mt-4"
      >
        Show All Players
      </Link>
    </div>
  );
}

export default TopPlayers;