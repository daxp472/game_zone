import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';
import axios from 'axios';

function Settings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://user-auth-76vd.onrender.com/api/auth/profile/${user.id}`,
        {
          name: formData.name,
          username: formData.username,
          bio: formData.bio
        }
      );
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    try {
      const response = await axios.put(
        `https://user-auth-76vd.onrender.com/api/auth/password/${user.id}`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }
      );
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update password' });
    }
  };

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl text-white font-bold mb-8">Settings</h1>

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } text-white`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="bg-[#1a1b26] p-6 rounded-lg">
            <h2 className="text-xl text-white font-bold mb-6">Profile Settings</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md opacity-50 cursor-not-allowed"
                />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* Password Settings */}
          <div className="bg-[#1a1b26] p-6 rounded-lg">
            <h2 className="text-xl text-white font-bold mb-6">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#2a2b36] text-white p-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Settings;