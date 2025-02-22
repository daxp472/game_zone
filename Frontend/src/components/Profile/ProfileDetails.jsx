import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileDetails = () => {
    const { user, updateUser } = useAuth();
    const [details, setDetails] = useState({
        name: user.name,
        email: user.email,
        bio: user.bio,
    });

    const handleInputChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateUser(details);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-4">Personal Details</h2>
            <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Bio</label>
                <textarea
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                    name="bio"
                    value={details.bio}
                    onChange={handleInputChange}
                />
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleSave}>Save</button>
        </div>
    );
};

export default ProfileDetails;
