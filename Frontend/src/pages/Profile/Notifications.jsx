import React, { useState, useEffect } from 'react';
import GameNavbar from '../../components/GameNavbar';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

// Mock API Endpoints
const API_BASE_URL = '/api';
const NOTIFICATIONS_API = {
    GET: `${API_BASE_URL}/notifications`,
    DELETE: `${API_BASE_URL}/notifications`
};

// Mock Notifications Data
const mockNotifications = [
    { id: 1, message: 'Welcome to the platform!', timestamp: '2025-02-22T10:00:00Z' },
    { id: 2, message: 'Your profile has been updated.', timestamp: '2025-02-21T14:30:00Z' },
    { id: 3, message: 'New friend request received.', timestamp: '2025-02-20T08:15:00Z' }
];

const Notifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Mock fetching notifications
        setNotifications(mockNotifications);
    }, []);

    const clearAllNotifications = async () => {
        // Mock clearing notifications
        setNotifications([]);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <ProfileHeader />
            <div className="flex ml-5 mt-5">
                <div>
                    <ProfileSidebar />
                </div>
                <main className="flex-grow p-6 mt-5 ml-10">
                    <h1 className="text-3xl font-bold mb-6 mt-4">Notifications</h1>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Your Notifications</h2>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                onClick={clearAllNotifications}
                            >
                                Clear All
                            </button>
                        </div>
                        {notifications.length === 0 ? (
                            <p className="text-center">You have no notifications.</p>
                        ) : (
                            <ul>
                                {notifications.map((notification) => (
                                    <li 
                                        key={notification.id} 
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 mb-4 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{notification.message}</span>
                                            <span className="text-gray-300 text-sm">{new Date(notification.timestamp).toLocaleString()}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Notifications;
