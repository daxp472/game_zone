import GameNavbar from "../../components/GameNavbar";
import Footer from "../../components/Footer";

function Sports() {
  const games = [
    { id: 1, name: "FIFA 23", category: "sports" },
    { id: 2, name: "NBA 2K24", category: "sports" },
    { id: 3, name: "eFootball 2024", category: "sports" },
  ];

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl text-white font-bold mb-6">Sports Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-[#1a1b26] p-6 rounded-lg text-white">
              {game.name}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Sports;
