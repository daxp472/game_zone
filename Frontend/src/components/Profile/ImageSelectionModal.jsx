import React from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const ImageSelectionModal = ({ images, onClose, onSelectImage }) => {
    const handleImageSelect = async (image) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'https://your-api-endpoint.com/api/auth/update-profile-picture',
                { profilePicture: image },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            onSelectImage(image);
            onClose();
        } catch (error) {
            console.error('Failed to update profile picture', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-gray-800 p-6 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-white" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2 className="text-xl font-bold mb-4 text-white">Select Profile Picture</h2>
                <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt="Profile Option"
                            className="w-24 h-24 rounded-full cursor-pointer"
                            onClick={() => handleImageSelect(image)}
                        />
                    ))}
                </div>
                <div className="mt-4">
                    <button
                        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageSelectionModal;
