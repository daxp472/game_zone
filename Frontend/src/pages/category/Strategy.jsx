import GameNavbar from "../../components/GameNavbar";
import Footer from "../../components/Footer";

function Strategy() {
  const games = [
    { id: 1, name: "Age of Empires IV", category: "strategy" },
    { id: 2, name: "Civilization VI", category: "strategy" },
    { id: 3, name: "Total War: Warhammer III", category: "strategy" },
  ];

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl text-white font-bold mb-6">Strategy Games</h2>
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

export default Strategy;
