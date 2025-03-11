import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import Popup from '../components/Daily/Popup'; // Assuming Popup.jsx is in Daily folder

gsap.registerPlugin(ScrollTrigger);

function RubiksCube() {
  const mesh = useRef();
  const [rotationSpeed] = useState(() => THREE.MathUtils.randFloat(0.01, 0.03));
  const [wobbleSpeed] = useState(() => THREE.MathUtils.randFloat(0.5, 1.5));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time * wobbleSpeed) * 0.2;
    mesh.current.rotation.y += rotationSpeed;
  });

  return (
    <group ref={mesh}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="purple" />
      </mesh>
      {[-1, 0, 1].map((x) =>
        [-1, 0, 1].map((y) =>
          [-1, 0, 1].map((z) => {
            if (x === 0 && y === 0 && z === 0) return null;
            return (
              <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
                <boxGeometry args={[0.95, 0.95, 0.95]} />
                <meshStandardMaterial
                  color={new THREE.Color().setHSL(Math.random(), 0.7, 0.5)}
                  metalness={0.5}
                  roughness={0.5}
                />
              </mesh>
            );
          })
        )
      )}
    </group>
  );
}

function Home() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup toggle
  const heroRef = useRef(null);
  const isInView = useInView(heroRef);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dashboard-oeum.onrender.com/dashboard/games');
        const gamesWithIds = response.data.map((game, index) => ({
          ...game,
          id: game.id || `game-${index}`,
        }));
        setGames(gamesWithIds);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    gsap.from('.game-card', {
      scrollTrigger: {
        trigger: '.game-grid',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });
  }, []);

  const categories = [
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'action', name: 'Action', icon: '🎮' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'strategy', name: 'Strategy', icon: '♟️' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      
      {/* Circular Button for Daily Streak */}
      <div className="fixed top-20 right-4 z-50">
        <motion.button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">🔥</span> {/* Fire emoji for streak */}
        </motion.button>
      </div>

      {/* Popup Overlay */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-[#1a1b26] p-6 rounded-lg shadow-lg relative max-w-md w-full"
          >
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-purple-500"
            >
              ✕
            </button>
            <Popup /> {/* Your Popup component */}
          </motion.div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow -pt-16">
        <div className="-ml-16">
          {/* Welcome Section */}
          <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center -mt-16 overflow-hidden">
            <div className="hidden lg:block absolute inset-0 -mt-16">
              <Canvas className="absolute inset-0">
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars />
                <OrbitControls enableZoom={true} />
                <RubiksCube />
              </Canvas>
            </div>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
              <motion.div
                className="lg:w-1/2 text-left lg:pr-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Welcome to GameZone
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Discover a world of endless gaming possibilities where every click opens a new adventure.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link
                    to="/categories"
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    Explore Games
                  </Link>
                  <Link
                    to="/tournaments"
                    className="bg-transparent border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-lg hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    Join Tournament
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="hidden lg:block lg:w-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="w-full h-[600px] relative">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <RubiksCube />
                    <OrbitControls enableZoom={false} />
                  </Canvas>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Featured Games Section */}
          {loading ? (
            <Loader setLoading={setLoading} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="container mx-auto px-4 py-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game) => (
                  <motion.div
                    key={game.id}
                    variants={cardVariants}
                    className="game-card bg-[#1a1b26] rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-600/70"
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  >
                    <img
                      src={game.imageUrl || 'https://via.placeholder.com/400x200'}
                      alt={game.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                      <p className="text-gray-400 mb-4">{game.description || 'An exciting game awaits!'}</p>
                      <Link
                        to={`/game/${game.id}`}
                        className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors hover:shadow-md hover:shadow-white/80"
                      >
                        Play Now
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Categories Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-16 bg-[#1a1b26]"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Game Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="group relative bg-[#2a2b36] p-6 rounded-lg flex flex-col items-center hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</span>
                    <h3 className="text-white font-medium text-center">{category.name}</h3>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Call to Action Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Gaming?</h2>
              <p className="text-xl text-white/80 mb-8">Join millions of players worldwide and experience the best online games</p>
              <Link
                to="/categories"
                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Start Playing Now
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;