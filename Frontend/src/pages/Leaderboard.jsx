import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function Leaderboard() {
  const players = [
    { id: 1, username: 'Alex Gaming', level: 50, position: '1st', score: 15000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: 2, username: 'Sarah Pro', level: 45, position: '2nd', score: 14500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: 3, username: 'Mike Winner', level: 42, position: '3rd', score: 14000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    { id: 4, username: 'Lisa Game', level: 40, position: '4th', score: 13500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
    { id: 5, username: 'John Player', level: 38, position: '5th', score: 13000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { id: 6, username: 'Emma Pro', level: 36, position: '6th', score: 12500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
    { id: 7, username: 'David Star', level: 34, position: '7th', score: 12000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    { id: 8, username: 'Sophie Game', level: 32, position: '8th', score: 11500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie' },
  ];

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl text-white font-bold mb-8">Global Leaderboard</h1>
        <div className="bg-[#1a1b26] rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-700 text-gray-400 font-medium">
            <div className="col-span-3">Player</div>
            <div>Level</div>
            <div>Score</div>
            <div>Position</div>
          </div>
          {players.map((player) => (
            <div key={player.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-700 items-center hover:bg-[#2a2b36]">
              <div className="col-span-3 flex items-center space-x-3">
                <img src={player.avatar} alt={player.username} className="w-10 h-10 rounded-full" />
                <span className="text-white">{player.username}</span>
              </div>
              <div className="text-purple-500">Level {player.level}</div>
              <div className="text-gray-300">{player.score}</div>
              <div className="text-gray-300">{player.position}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Leaderboard;