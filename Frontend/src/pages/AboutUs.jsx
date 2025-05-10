import React, { useState } from 'react';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';
import Ownner from '../assets/ownner.jpeg';
import Tournament from '../assets/tournament.jpeg';
import { FaGamepad, FaTrophy, FaUsers, FaRocket } from 'react-icons/fa';

function AboutUs() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const milestones = [
    {
      id: 1,
      title: 'The Figma Spark (2024)',
      description: 'GameZone was born as a class project where our founder, Dax Patel, designed a Figma prototype for a gaming platform. While others cloned big sites, Dax envisioned a unique gaming hub tailored for passionate gamers.',
      icon: <FaRocket size={40} />,
      details: 'Inspired by the need for a community-driven gaming platform, Dax created a sleek Figma design with vibrant colors and intuitive navigation. This prototype laid the foundation for GameZone’s aesthetic and user-centric approach.',
    },
    {
      id: 2,
      title: 'The 2048 Era (Early 2025)',
      description: 'GameZone launched as a simple website featuring the classic 2048 game. It was a proof-of-concept, but the community loved it, sparking the idea to expand.',
      icon: <FaGamepad size={40} />,
      details: 'The initial site was minimalist, with no profiles or leaderboards. Dax coded the 2048 game from scratch, focusing on smooth gameplay. User feedback drove the addition of new features, turning GameZone into a growing platform.',
    },
    {
      id: 3,
      title: 'Building the Community (Mid 2025)',
      description: 'Profiles, leaderboards, and authentication were added, transforming GameZone into a social gaming hub. Tournaments and multiple games followed, with Kalpan Kaneria leading epic events.',
      icon: <FaUsers size={40} />,
      details: 'The introduction of user profiles allowed gamers to showcase their achievements. Leaderboards fueled competition, while tournaments brought players together. Kalpan’s expertise in event management made every tournament a thrilling experience.',
    },
    {
      id: 4,
      title: 'The Future: Multiplayer & Rewards (Ongoing)',
      description: 'GameZone is now working on multiplayer functionality and a reward system to make gaming even more exciting. Stay tuned for global leaderboards and epic battles!',
      icon: <FaTrophy size={40} />,
      details: 'Our team is developing real-time multiplayer features to connect gamers worldwide. The reward system will let players earn points for victories, redeemable for exclusive in-game perks. GameZone is set to redefine mobile gaming!',
    },
  ];

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0c29] to-[#302b63]">
      <LandingNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:px-20 md:py-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 animate-pulse"></div>
          <div className="relative container mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in">
              About GameZone
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-fade-in delay-100">
              Your ultimate gaming destination, built by gamers, for gamers. Join us on a journey to redefine gaming.
            </p>
            <a
              href="/register"
              className="inline-flex items-center mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300"
            >
              <FaGamepad className="mr-2" />
              Join the Community
            </a>
          </div>
        </section>

        {/* Our Gaming Journey */}
        <section className="px-6 py-20 md:px-20 bg-gradient-to-b from-[#0f0c29] to-gray-900">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16 animate-fade-in">
              Our Gaming Journey
            </h2>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                  GameZone was founded in 2025 with a bold vision: to create an inclusive gaming community where players from all walks of life can connect, compete, and celebrate their passion for gaming. What started as a small gaming cafe in a college project has grown into a full-fledged gaming hub.
                </p>
                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                  From a single game (2048) to a platform hosting multiple games, tournaments, and leaderboards, GameZone is now a thriving ecosystem. Our mission is to empower gamers with cutting-edge technology, seamless experiences, and a vibrant community.
                </p>
                <div className="flex gap-8 mt-10 justify-center md:justify-start">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 animate-pulse">10K+</div>
                    <div className="mt-2 text-gray-200">Active Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 animate-pulse">500+</div>
                    <div className="mt-2 text-gray-200">Tournaments Hosted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 animate-pulse">50+</div>
                    <div className="mt-2 text-gray-200">Gaming Stations</div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/0ec3deb4a059ba152f8108e9febe0df1fb848394f8bb2d4ac0f009a48edebe56?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
                  alt="Gaming setup"
                  className="w-full rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500 md:max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="px-6 py-20 md:px-20 bg-gray-900">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-200 leading-relaxed">
                To build a global gaming community where every player feels valued, empowered, and connected through unforgettable gaming experiences.
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-200 leading-relaxed">
                To redefine gaming by blending cutting-edge technology, competitive spirit, and a vibrant community into a seamless platform.
              </p>
            </div>
          </div>
        </section>

        {/* GameZone’s Evolution Timeline */}
        <section className="px-6 py-20 md:px-20 bg-gradient-to-b from-[#0f0c29] to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.2)_0%,_transparent_70%)] opacity-50"></div>
          <div className="container mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16 animate-fade-in">
              The GameZone Journey
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-600"></div>
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} max-md:flex-col`}
                >
                  <div className="w-1/2 max-md:w-full px-6">
                    <div
                      className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                      onClick={() => handleMilestoneClick(milestone)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-purple-400">{milestone.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                          <p className="mt-2 text-gray-200">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 max-md:w-full px-6 max-md:mt-6">
                    {selectedMilestone?.id === milestone.id && (
                      <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-slide-in">
                        <h4 className="text-lg font-bold text-white mb-2">{milestone.title}</h4>
                        <p className="text-gray-200">{milestone.details}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-400 rounded-full border-4 border-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="px-6 py-20 md:px-20 bg-gray-900">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16 animate-fade-in">
            Why Choose GameZone?
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <FaTrophy className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white">Competitive Gaming</h3>
              <p className="mt-4 text-gray-200">
                Join regular tournaments and leagues across various game titles, with prize pools that fuel your competitive spirit.
              </p>
            </div>
            <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <FaUsers className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white">Community Events</h3>
              <p className="mt-4 text-gray-200">
                Participate in meetups, workshops, and social events to connect with fellow gamers and build lasting friendships.
              </p>
            </div>
            <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <FaGamepad className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white">Pro Equipment</h3>
              <p className="mt-4 text-gray-200">
                Experience gaming on state-of-the-art setups with the latest hardware and peripherals for unmatched performance.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-6 py-20 md:px-20 bg-gradient-to-b from-[#0f0c29] to-gray-900">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16 animate-fade-in">
            What Gamers Say
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
              <p className="text-gray-200 italic">
                "GameZone’s tournaments are insane! The community vibe and pro setups make every match epic."
              </p>
              <div className="mt-4 text-white font-bold">Alex "Thunder" Nguyen</div>
              <div className="text-gray-400">Pro Gamer</div>
            </div>
            <div className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
              <p className="text-gray-200 italic">
                "From casual to competitive, GameZone has something for everyone. I’ve made lifelong friends here!"
              </p>
              <div className="mt-4 text-white font-bold">Priya "Blaze" Sharma</div>
              <div className="text-gray-400">Community Member</div>
            </div>
            <div className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300">
              <p className="text-gray-200 italic">
                "The platform’s evolution is unreal. Can’t wait for multiplayer and rewards!"
              </p>
              <div className="mt-4 text-white font-bold">Jake "Phantom" Lee</div>
              <div className="text-gray-400">Beta Tester</div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="px-6 py-20 md:px-20 bg-gray-900 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 animate-fade-in">
            Meet Our Team
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
            <div className="flex flex-col items-center">
              <img
                src={Ownner}
                alt="Dax Patel"
                className="w-40 h-40 rounded-full shadow-lg hover:scale-110 transition-transform duration-500"
              />
              <div className="mt-4 text-xl font-bold text-white">Dax Patel</div>
              <div className="mt-2 text-gray-200">Founder & CEO</div>
              <p className="mt-4 text-gray-200 max-w-xs">
                A visionary gamer and coder, Dax turned a class project into a global gaming platform, driven by his passion for community and innovation.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={Tournament}
                alt="Kalpan Kaneria"
                className="w-40 h-40 rounded-full shadow-lg hover:scale-110 transition-transform duration-500"
              />
              <div className="mt-4 text-xl font-bold text-white">Kalpan Kaneria</div>
              <div className="mt-2 text-gray-200">Tournament Director</div>
              <p className="mt-4 text-gray-200 max-w-xs">
                Kalpan brings the thrill of competition to GameZone, crafting unforgettable tournaments that unite gamers worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-20 md:px-20 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in">
            Join the GameZone Revolution
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Be part of a growing community of gamers. Download the app, join tournaments, and shape the future of gaming with us!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/download"
              className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] transition-all duration-300"
            >
              <FaGamepad className="mr-2" />
              Download Now
            </a>
            <a
              href="/register"
              className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300"
            >
              <FaUsers className="mr-2" />
              Sign Up
            </a>
          </div>
        </section>
      </main>
      <LandingFooter />
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
}

export default AboutUs;