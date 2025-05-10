import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import Popup from '../components/Daily/Popup';
import NET from 'vanta/dist/vanta.net.min';
import { FaFire, FaTrophy, FaGamepad } from 'react-icons/fa';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

function RubiksCube() {
  const mesh = useRef();
  const [rotationSpeed] = useState(() => THREE.MathUtils.randFloat(0.02, 0.05));
  const [wobbleSpeed] = useState(() => THREE.MathUtils.randFloat(0.8, 1.8));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time * wobbleSpeed) * 0.3;
    mesh.current.rotation.y += rotationSpeed;
  });

  return (
    <group ref={mesh}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#9333ea" metalness={0.7} roughness={0.3} />
      </mesh>
      {[-1, 0, 1].map((x) =>
        [-1, 0, 1].map((y) =>
          [-1, 0, 1].map((z) => {
            if (x === 0 && y === 0 && z === 0) return null;
            return (
              <mesh key={`${x}-${y}-${z}`} position={[x * 1.1, y * 1.1, z * 1.1]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                  color={new THREE.Color().setHSL(Math.random(), 0.8, 0.6)}
                  metalness={0.6}
                  roughness={0.4}
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const heroRef = useRef(null);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const isInView = useInView(heroRef);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 0.8,
      color: 0x9333ea,
      backgroundColor: 0x0a0b13,
      points: 12.0,
      maxDistance: 20.0,
      spacing: 15.0,
    });

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

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
        toast.success('Games loaded successfully!', { position: 'top-right', autoClose: 3000, theme: 'dark' });
      } catch (error) {
        setError(error.message);
        toast.error('Failed to load games!', { position: 'top-right', autoClose: 3000, theme: 'dark' });
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
        start: 'top 80%',
        end: 'bottom 20%',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.8 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  const tickerVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' },
      },
    },
  };

  return (
    <div className="min-h-screen font-orbitron relative overflow-hidden" ref={vantaRef}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b13]/90 via-[#13141f]/80 to-[#1a1b26]/90 z-0"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <GameNavbar />

      {/* Daily Streak Button */}
      <div className="fixed top-20 right-4 z-50">
        <motion.button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaFire className="text-2xl" />
        </motion.button>
      </div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              className="bg-[#1a1b26]/95 p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-purple-500/30 relative max-w-md w-full"
            >
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400 bg-gray-800/50 rounded-full h-8 w-8 flex items-center justify-center"
              >
                ✕
              </button>
              <Popup />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex-grow pt-16">
        {/* Live Tournament Ticker */}
        <motion.div
          className="bg-[#1a1b26]/90 py-3 overflow-hidden border-y border-purple-500/30"
          variants={tickerVariants}
          animate="animate"
        >
          <div className="flex space-x-8 whitespace-nowrap">
            {['Epic Battle Royale: $500 Prize', 'Puzzle Championship: Join Now!', 'Racing League: Top 10 Leaderboard'].map((item, i) => (
              <span key={i} className="text-purple-400 text-sm font-medium flex items-center">
                <FaTrophy className="mr-2" /> {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center" ref={heroRef}>
          <div className="absolute inset-0 lg:block">
            <Canvas className="absolute inset-0">
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
              <RubiksCube />
              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              className="lg:w-1/2 text-left lg:pr-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              >
                Welcome to GameZone
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Dive into a universe of epic games, thrilling tournaments, and endless adventures. Your gaming journey starts here!
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/categories"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transform hover:scale-105 transition-all duration-300 text-center"
                >
                  Explore Games
                </Link>
                <Link
                  to="/tournaments"
                  className="bg-transparent border-2 border-purple-500 text-purple-400 px-8 py-3 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  Join Tournament
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="lg:w-1/2 mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-full h-[400px] lg:h-[600px] relative">
                <Canvas>
                  <ambientLight intensity={0.7} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} />
                  <RubiksCube />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Games Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-16"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <FaGamepad className="mr-2 text-purple-400" /> Featured Games
          </h2>
          {loading ? (
            <Loader setLoading={setLoading} />
          ) : error ? (
            <motion.div
              className="bg-red-600/90 text-white p-4 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          ) : (
            <div className="game-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  variants={cardVariants}
                  className="game-card bg-[#1a1b26]/95 rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] border border-purple-500/30"
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <img
                    src={game.imageUrl || 'https://via.placeholder.com/400x200'}
                    alt={game.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{game.description || 'An exciting game awaits!'}</p>
                    <Link
                      to={`/game/${game.id}`}
                      className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-[0_0_10px_rgba(139,92,246,0.7)] transition-all duration-300"
                    >
                      Play Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Categories Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-[#1a1b26]/95 border-y border-purple-500/30"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center">
              <FaGamepad className="mr-2 text-purple-400" /> Game Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group relative bg-[#2a2b36]/80 p-6 rounded-lg flex flex-col items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
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
          className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Conquer the GameZone?</h2>
            <p className="text-xl text-white/90 mb-8">Join millions of players and dominate the leaderboards today!</p>
            <Link
              to="/categories"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              Start Playing Now
            </Link>
          </div>
        </motion.section>
      </div>
      <Footer />
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Home;