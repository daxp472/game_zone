import React, { useState } from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';

const SiteSettings = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('English');

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleNotifications = () => setNotifications(!notifications);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <div className="flex flex-col items-center justify-center py-12">
                <h1 className="text-4xl font-bold mb-8">Site Settings</h1>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Appearance</h2>
                        <div className="flex justify-between items-center bg-gray-700 p-4 rounded-md mb-4">
                            <div className="text-lg">Dark Mode</div>
                            <button
                                onClick={toggleDarkMode}
                                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                    darkMode ? 'bg-purple-500' : ''
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                        darkMode ? 'translate-x-6' : ''
                                    }`}
                                ></div>
                            </button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
                        <div className="flex justify-between items-center bg-gray-700 p-4 rounded-md mb-4">
                            <div className="text-lg">Enable Notifications</div>
                            <button
                                onClick={toggleNotifications}
                                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                    notifications ? 'bg-purple-500' : ''
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                        notifications ? 'translate-x-6' : ''
                                    }`}
                                ></div>
                            </button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Language</h2>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <div className="text-lg mb-2">Select Language</div>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-gray-600 text-white rounded-md py-2 px-4 w-full"
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SiteSettings;