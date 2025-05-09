import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';
import { FaApple, FaGooglePlay, FaHome, FaUserPlus, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';

function MobileDownload() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0c29] to-[#302b63]">
      <LandingNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:px-20 md:py-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/b514ab657358fc78ed39c431de981593f5ca302de869b8d69899d3721e5726f8?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&')] bg-cover bg-center opacity-30"></div>
          <div className="relative container mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in">
              Download GameZone App
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-fade-in delay-100">
              Experience gaming like never before. Download our mobile app for seamless gameplay, tournaments, and community vibes on the go!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300"
              >
                <FaApple size={24} className="mr-2" />
                App Store
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300"
              >
                <FaGooglePlay size={24} className="mr-2" />
                Google Play
              </a>
            </div>
          </div>
          {/* Floating Device Mockup */}
          <div className="relative mt-12">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/7a988fe01477da8a953337d32f07924c8839caab3b8ebb5274a347a1454bd708?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
              alt="Mobile App Mockup"
              className="mx-auto w-80 md:w-96 rounded-3xl shadow-2xl animate-float"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 md:px-20 bg-gradient-to-b from-[#0f0c29] to-gray-900">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">Why Download GameZone?</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="text-3xl text-purple-400 mb-4">🎮</div>
              <h3 className="text-xl font-bold text-white">Seamless Gameplay</h3>
              <p className="mt-4 text-gray-200">Enjoy lag-free gaming with optimized performance on iOS and Android.</p>
            </div>
            <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="text-3xl text-purple-400 mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white">Live Tournaments</h3>
              <p className="mt-4 text-gray-200">Join real-time tournaments and compete for epic rewards anytime, anywhere.</p>
            </div>
            <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="text-3xl text-purple-400 mb-4">🌐</div>
              <h3 className="text-xl font-bold text-white">Global Community</h3>
              <p className="mt-4 text-gray-200">Connect with millions of gamers worldwide and build your squad.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 md:px-20 text-center bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Level Up?</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Download the GameZone app now and dive into the ultimate gaming experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300"
            >
              <FaUserPlus size={20} className="mr-2" />
              Create Account
            </Link>
            <Link
              to="/"
              className="flex items-center px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] transition-all duration-300"
            >
              <FaHome size={20} className="mr-2" />
              Back to Home
            </Link>
            <Link
              to="/about"
              className="flex items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all duration-300"
            >
              <FaInfoCircle size={20} className="mr-2" />
              About Us
            </Link>
            <Link
              to="/"
              className="flex items-center px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(107,114,128,0.7)] transition-all duration-300"
            >
              <FaArrowLeft size={20} className="mr-2" />
              Back to Menu
            </Link>
          </div>
        </section>
      </main>
      <LandingFooter />
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default MobileDownload;