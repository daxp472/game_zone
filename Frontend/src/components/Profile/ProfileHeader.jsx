import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileHeader = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
                <img
                    className="w-16 h-16 rounded-full"
                    src={user.profilePicture}
                    alt={user.username}
                />
                <div className="ml-4">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                    <p className="text-gray-400">Level: {user.level} (XP: {user.experiencePoints})</p>
                </div>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Edit Profile</button>
        </div>
    );
};

export default ProfileHeader;
