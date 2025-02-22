import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GameNavbar from '../../components/GameNavbar';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Footer from '../../components/Footer';
import PasswordSettings from './UpdatePassword';
import axios from 'axios';

function Settings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || '',
        profilePicture: user?.profilePicture || '',
        dob: user?.dob || '',
        bio: user?.bio || '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `https://user-auth-76vd.onrender.com/api/auth/profile`,
                {
                    name: formData.name,
                    username: formData.username,
                    profilePicture: formData.profilePicture,
                    bio: formData.bio,
                    dob: formData.dob
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
        }
        setLoading(false);
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handlePasswordUpdate = (passwordData) => {
        // Handle the password update action within the Settings component
        console.log('Password updated:', passwordData);
        setMessage({ type: 'success', text: 'Password updated successfully!' });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <ProfileHeader />
            <div className="flex mt-5 ml-5">
                <div>
                <ProfileSidebar />
                </div>
                <div className="flex-grow container mx-auto px-4 py-8">
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
                                    <label className="block text-gray-400 mb-2">Profile Picture URL</label>
                                    <input
                                        type="text"
                                        name="profilePicture"
                                        value={formData.profilePicture}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                                    />
                                    {formData.dob && (
                                        <p className="text-sm text-gray-500 mt-1">Age: {calculateAge(formData.dob)}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows="4"
                                        maxLength="500"
                                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                                    ></textarea>
                                    <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>

                        <PasswordSettings user={user} onPasswordUpdate={handlePasswordUpdate} />

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;
