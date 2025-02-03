import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';
import axios from 'axios';

function Profile() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMatches: 1234,
    winRate: 68,
    totalPoints: 25400,
    matchesGrowth: 12,
    winRateGrowth: 5,
    pointsGrowth: 8
  });

  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    bio: 'Professional gamer and content creator. Love to stream and compete in tournaments.',
    level: 42,
    xp: 2500
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://user-auth-76vd.onrender.com/api/auth/profile/${user.id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-[#1a1b26] rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username || 'default'}`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#1a1b26] bg-[#1a1b26]"
              />
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
                <p className="text-gray-300">Level {profile.level} • {profile.xp} XP</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="mt-20 p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#2a2b36] p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400">Total Matches</h3>
                  <span className="text-purple-500">🎮</span>
                </div>
                <p className="text-2xl text-white font-bold mt-2">{stats.totalMatches}</p>
                <p className="text-sm text-green-500">+{stats.matchesGrowth}% from last month</p>
              </div>
              
              <div className="bg-[#2a2b36] p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400">Win Rate</h3>
                  <span className="text-yellow-500">🏆</span>
                </div>
                <p className="text-2xl text-white font-bold mt-2">{stats.winRate}%</p>
                <p className="text-sm text-green-500">+{stats.winRateGrowth}% from last month</p>
              </div>
              
              <div className="bg-[#2a2b36] p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400">Total Points</h3>
                  <span className="text-yellow-500">⭐</span>
                </div>
                <p className="text-2xl text-white font-bold mt-2">{stats.totalPoints}</p>
                <p className="text-sm text-green-500">+{stats.pointsGrowth}% from last month</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-[#2a2b36] p-6 rounded-lg">
              <h2 className="text-xl text-white font-bold mb-4">Profile Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Full Name</label>
                  <p className="text-white">{profile.name}</p>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Username</label>
                  <p className="text-white">{profile.username}</p>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <p className="text-white">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Member Since</label>
                  <p className="text-white">{new Date(profile.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-gray-400 mb-2">Bio</label>
                <p className="text-white">{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;