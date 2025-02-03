import { useNavigate } from 'react-router-dom';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';

function Categories() {
  const navigate = useNavigate();
  
  const categories = [
    { id: 'racing', name: 'Racing', icon: '🏎️', count: '120+ Games' },
    { id: 'action', name: 'Action', icon: '🎮', count: '250+ Games' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩', count: '200+ Games' },
    { id: 'sports', name: 'Sports', icon: '⚽', count: '150+ Games' },
    { id: 'strategy', name: 'Strategy', icon: '♟️', count: '180+ Games' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️', count: '160+ Games' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl text-white font-bold mb-8">Game Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-[#1a1b26] p-6 rounded-lg flex flex-col items-center hover:bg-purple-600 transition-colors"
            >
              <span className="text-3xl mb-3">{category.icon}</span>
              <h3 className="text-white font-medium mb-1">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.count}</p>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categories;