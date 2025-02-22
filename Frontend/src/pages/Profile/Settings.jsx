import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GameNavbar from '../../components/GameNavbar';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Footer from '../../components/Footer';
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
            await axios.put(
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
            await axios.put(
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
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <ProfileHeader />
            <div className="flex ml-5 mt-5">
                <div>
                <ProfileSidebar />
                </div>
                <div className="flex-grow container mx-auto p-6 mt-5 ml-10 px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>

                    {message.text && (
                        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                            {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full bg-gray-700 text-white p-2 rounded-md opacity-50 cursor-not-allowed"
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
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
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

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-6">Change Password</h2>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
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

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-6">Notifications Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input type="checkbox" id="emailNotifications" className="bg-gray-700 text-purple-600 focus:ring-purple-500 rounded-md" />
                                    <label htmlFor="emailNotifications" className="ml-2 text-gray-400">Email Notifications</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="smsNotifications" className="bg-gray-700 text-purple-600 focus:ring-purple-500 rounded-md" />
                                    <label htmlFor="smsNotifications" className="ml-2 text-gray-400">SMS Notifications</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="pushNotifications" className="bg-gray-700 text-purple-600 focus:ring-purple-500 rounded-md" />
                                    <label htmlFor="pushNotifications" className="ml-2 text-gray-400">Push Notifications</label>
                                </div>
                                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 mt-4">
                                    Update Notifications
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input type="checkbox" id="profileVisibility" className="bg-gray-700 text-purple-600 focus:ring-purple-500 rounded-md" />
                                    <label htmlFor="profileVisibility" className="ml-2 text-gray-400">Profile Visibility</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="searchability" className="bg-gray-700 text-purple-600 focus:ring-purple-500 rounded-md" />
                                    <label htmlFor="searchability" className="ml-2 text-gray-400">Searchability</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="dataSharing" className="bg-gray-700 text-purple-600 focus:ring-purple-500 rounded-md" />
                                    <label htmlFor="dataSharing" className="ml-2 text-gray-400">Data Sharing</label>
                                </div>
                                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 mt-4">
                                    Update Privacy Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;