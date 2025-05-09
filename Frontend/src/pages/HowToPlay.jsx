import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';

function HowToPlay() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <LandingNavbar />
      <main className="flex-grow">
        <section className="relative px-20 py-32 max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/9add4428ce0617d877d024c4d295e7ec12761d036880a99e7e5b5787d632596c?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
            alt="Game background"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative container mx-auto">
            <h1 className="text-5xl font-extrabold text-white">Master the Game</h1>
            <p className="mt-6 text-xl text-gray-200 max-w-2xl">
              Learn the rules, strategies, and mechanics to become a pro player in our gaming community.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/login'}>
                Play Now
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = '/download'}>
                Download Mobile App
              </button>
            </div>
          </div>
        </section>

        <section className="px-20 py-24 max-md:px-5">
          <div className="container mx-auto grid grid-cols-3 gap-8 max-md:grid-cols-1">
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/c598464253451dcea255213e1849af23c7cbcb971ceb6afd46ad477aba443bd4?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt="Controls icon"
                className="w-12 h-12"
              />
              <h3 className="mt-4 text-xl font-bold text-white">Basic Controls</h3>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/50265ad4e4e75cd3e1efeda9f342970c805f97eeae7a06d23128a2c3f2830324?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Movement controls"
                    className="w-4 h-4"
                  />
                  Use WASD or Arrow keys to move
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/e4227766cf9d89817ef6f6431498b072d214ef85a1ad1f4db8a878146e3067c1?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Shoot control"
                    className="w-4 h-4"
                  />
                  Left click to shoot
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/406a91e029edecef919787f1e86884768523c41301b21169d3b78f38f11f31d0?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Jump control"
                    className="w-4 h-4"
                  />
                  Space bar to jump
                </li>
              </ul>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/cb482095479e0d2417ae8ce7fe1907a3883a26e065e476f003e271096c44d4a2?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt="Scoring system icon"
                className="w-12 h-12"
              />
              <h3 className="mt-4 text-xl font-bold text-white">Scoring System</h3>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/657941bd2b2201f0466710a952c5b9a89d754306d853aa671e685790afa90966?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Coins icon"
                    className="w-4 h-4"
                  />
                  Collect coins: 10 points
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/43a07c036c43ed1fe99588b10f3fa714791c992a05ddbbf15d80fd9aed08718d?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Enemies icon"
                    className="w-4 h-4"
                  />
                  Defeat enemies: 50 points
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/46ffdc6e60f36b2ee01767baa3d55023b60179f93b726890c0871a0a7fd9a390?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Special items icon"
                    className="w-4 h-4"
                  />
                  Special items: 100 points
                </li>
              </ul>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/ac102bbfce41d5d33d96ab25fc2f5b31b2c34bab556308f004c877cf07f60af9?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt="Power-ups icon"
                className="w-12 h-12"
              />
              <h3 className="mt-4 text-xl font-bold text-white">Power-ups</h3>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/28fc9bdea6af783eb877de1c5be96b359734cf009b78de4911de2a62f2e0fdae?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Speed boost icon"
                    className="w-4 h-4"
                  />
                  Speed boost
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/f5da11a0b0383ef0ad06e51321a89a57989e659cd069757051ec8c0497eae109?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Health restore icon"
                    className="w-4 h-4"
                  />
                  Health restore
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/470b3458e49e9786e12bc54e85503ce6f425a4cc34a5f4b6169b30f56acd7fdc?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                    alt="Double damage icon"
                    className="w-4 h-4"
                  />
                  Double damage
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}

export default HowToPlay;