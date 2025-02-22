import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-4 ml-4 flex items-center justify-between">
            <div className="relative flex items-center">
                <img
                    className="w-16 h-16 rounded-full"
                    src={user.profilePicture}
                    alt={user.username}
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600">
                    <FaCamera />
                </button>
                <div className="ml-6">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                    <p className="text-gray-400">Level: {user.level} (XP: {user.experiencePoints})</p>
                </div>
            </div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={() => navigate('/profile')}
            >
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileHeader;
