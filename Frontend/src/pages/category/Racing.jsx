import GameNavbar from "../../components/GameNavbar";
import Footer from "../../components/Footer";

function Racing() {
  const games = [
    { id: 1, name: "Need for Speed", category: "racing" },
    { id: 2, name: "Asphalt 9", category: "racing" },
    { id: 3, name: "Forza Horizon", category: "racing" },
  ];

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl text-white font-bold mb-6">Racing Games</h2>
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

export default Racing;
