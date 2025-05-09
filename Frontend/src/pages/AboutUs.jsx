import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';
import Ownner from '../assets/ownner.jpeg';
import Tournament from '../assets/tournament.jpeg';

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <LandingNavbar />
      <main className="flex-grow">
        <section className="relative px-20 py-32 text-center max-md:px-5">
          <div className="relative container mx-auto">
            <h1 className="text-5xl font-extrabold text-white">About GameZone</h1>
            <p className="mt-6 text-xl text-gray-300">Your Ultimate Gaming Destination</p>
          </div>
        </section>

        <section className="px-20 py-24 bg-gradient-to-b from-gray-900 to-[#1a1b26] max-md:px-5">
          <div className="container mx-auto flex flex-wrap gap-12">
            <div className="w-1/2 max-md:w-full">
              <h2 className="text-3xl font-extrabold text-white">Our Gaming Journey</h2>
              <p className="mt-6 text-gray-300">
                GameZone was founded in 2025 with a mission to create an inclusive gaming community where players from all walks of life can share their passion for gaming.
              </p>
              <p className="mt-4 text-gray-300">
                We've grown from a small gaming cafe to a full-fledged gaming hub, offering the latest games, tournaments, and a space for gamers to connect and compete.
              </p>
              <div className="flex gap-8 mt-10">
                <div>
                  <div className="text-3xl font-bold text-purple-400">10K+</div>
                  <div className="mt-2 text-gray-300">Active Players</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="mt-2 text-gray-300">Tournaments</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="mt-2 text-gray-300">Gaming Stations</div>
                </div>
              </div>
            </div>
            <div className="w-1/2 max-md:w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/0ec3deb4a059ba152f8108e9febe0df1fb848394f8bb2d4ac0f009a48edebe56?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt="Gaming setup"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section className="px-20 py-24 max-md:px-5">
          <div className="container mx-auto grid grid-cols-3 gap-8 max-md:grid-cols-1">
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg">
              <h3 className="text-xl font-bold text-white">Competitive Gaming</h3>
              <p className="mt-4 text-gray-300">Regular tournaments and leagues for various game titles with attractive prize pools.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg">
              <h3 className="text-xl font-bold text-white">Community Events</h3>
              <p className="mt-4 text-gray-300">Regular meetups, workshops, and social events for our gaming community.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg">
              <h3 className="text-xl font-bold text-white">Pro Equipment</h3>
              <p className="mt-4 text-gray-300">State-of-the-art gaming setups with the latest hardware and peripherals.</p>
            </div>
          </div>
        </section>

        <section className="px-20 py-24 text-center max-md:px-5">
          <h2 className="text-4xl font-extrabold text-white">Meet Our Team</h2>
          <div className="container mx-auto grid grid-cols-4 gap-8 mt-12 max-md:grid-cols-1">
            <div className="flex flex-col items-center">
              <img src={Ownner} alt="Dax Patel" className="w-32 h-32 rounded-full shadow-lg" />
              <div className="mt-4 font-bold text-white">Dax Patel</div>
              <div className="mt-2 text-gray-300">Founder & CEO</div>
            </div>
            <div className="flex flex-col items-center">
              <img src={Tournament} alt="Kalpan Kaneria" className="w-32 h-32 rounded-full shadow-lg" />
              <div className="mt-4 font-bold text-white">Kalpan Kaneria</div>
              <div className="mt-2 text-gray-300">Tournament Director</div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/58922931c78fa77560f28122cf0a2d21a8564c52c86b500e824ffb1f53f9efdc?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt="Mike Rodriguez"
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <div className="mt-4 font-bold text-white">Mike Rodriguez</div>
              <div className="mt-2 text-gray-300">Technical Manager</div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/86b71105d8757558c82122f30ff3c59bb9631dd21aa94503e2063b85422a6aab?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                alt="Emma Wilson"
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <div className="mt-4 font-bold text-white">Emma Wilson</div>
              <div className="mt-2 text-gray-300">Community Manager</div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}

export default AboutUs;