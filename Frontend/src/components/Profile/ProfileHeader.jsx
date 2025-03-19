import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ImageSelectionModal from './ImageSelectionModal';
import { getXPFromAPI } from '../Logic/xp';
import axios from 'axios';

const ProfileHeader = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentXP, setCurrentXP] = useState(user.experiencePoints || 0);
    const [currentLevel, setCurrentLevel] = useState(user.level || 1);

    const images = [
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302380/images_idrluf.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302337/images_ervcsc.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302296/images_qjfuo0.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302287/images_wbqnpd.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302267/images_iyyd6w.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302256/images_onsw4x.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302244/images_sr9sn7.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302227/images_b1tmda.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302224/images_menj8s.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302189/images_rrj7om.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302178/images_kzjgki.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302169/download_hmk4qp.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302157/download_zti3bm.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302146/download_razvfe.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302134/download_dvpvh4.jpg",
        "https://res.cloudinary.com/dk16ymotz/image/upload/v1740302086/download_djnukr.jpg",
    ];

    useEffect(() => {
        const fetchXPAndLevel = async () => {
            try {
                const email = user?.email || localStorage.getItem('email');
                if (email) {
                    const xpData = await getXPFromAPI(email);
                    const xp = xpData.xpAmount || 0;
                    const level = xpData.level || 1;
                    setCurrentXP(xp);
                    setCurrentLevel(level);
                    setUser(prev => ({ ...prev, experiencePoints: xp, level }));
                }
            } catch (error) {
                console.error('Failed to fetch XP and Level:', error);
            }
        };
        fetchXPAndLevel();
    }, [user, setUser]);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleSetImage = async () => {
        if (selectedImage) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.patch(
                    'https://user-auth-76vd.onrender.com/api/auth/profile',
                    { profilePicture: selectedImage },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const updatedUser = response.data.user;
                setUser(updatedUser);
                setIsModalOpen(false);
            } catch (error) {
                console.error('Failed to update profile picture', error);
            }
        }
    };

    const handleLevelPathClick = () => {
        navigate('/profile/level'); // Assuming this is the route for level path page
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-4 ml-4 flex items-center justify-between">
            <div className="relative flex items-center">
                <div className="relative flex items-center">
                    <img
                        className="w-16 h-16 rounded-full"
                        src={user.profilePicture}
                        alt={user.username}
                    />
                    <button
                        className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaCamera />
                    </button>
                </div>
                <div className="ml-6">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                    <p className="text-gray-400">Level: {currentLevel} (XP: {currentXP})</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={() => navigate('/profile')}
                >
                    Edit Profile
                </button>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    onClick={handleLevelPathClick}
                >
                    Level Path
                </button>
            </div>
            {isModalOpen && (
                <ImageSelectionModal
                    images={images}
                    selectedImage={selectedImage}
                    onClose={() => setIsModalOpen(false)}
                    onSelectImage={handleImageSelect}
                    onSetImage={handleSetImage}
                />
            )}
        </div>
    );
};

export default ProfileHeader;