import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageSelectionModal = ({ images, selectedImage, onClose, onSelectImage, onSetImage }) => {
    const handleImageSelect = (image) => {
        onSelectImage(image);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-gray-800 p-6 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-white" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2 className="text-xl font-bold mb-4 text-white">Select Profile Picture</h2>
                <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt="Profile Option"
                            className={`w-24 h-24 rounded-full cursor-pointer ${selectedImage === image ? 'border-4 border-green-500' : ''}`}
                            onClick={() => handleImageSelect(image)}
                        />
                    ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mr-2"
                        onClick={onSetImage}
                        disabled={!selectedImage}
                    >
                        Set Image
                    </button>
                    <button
                        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
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
