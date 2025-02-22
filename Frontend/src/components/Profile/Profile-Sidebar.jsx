import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaCreditCard, FaGift, FaBell, FaTrophy, FaCog } from 'react-icons/fa';

const ProfileSidebar = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-900 text-white w-64 flex flex-col">
            <div className="bg-gray-800 p-4">
                <h2 className="text-xl font-bold">My Profile</h2>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-4 p-4">
                    <li>
                        <Link
                            to="/profile"
                            className={`relative flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform transform hover:-translate-y-1 ${location.pathname === '/profile/details' ? 'bg-gray-700' : ''}`}
                        >
                            <FaUser className="mr-2 transition-transform transform hover:rotate-180" />
                            Personal Details
                            <div className="absolute bottom-0 left-0 right-0 border-b-4 border-l-4 border-transparent hover:border-blue-500 transition-border duration-300"></div>
                            <div className="absolute bottom-0 right-0 left-0 bg-blue-200 h-1 shadow-lg hover:opacity-100 transition-opacity"></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile/subscription"
                            className={`relative flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform transform hover:-translate-y-1 ${location.pathname === '/profile/subscription' ? 'bg-gray-700' : ''}`}
                        >
                            <FaCreditCard className="mr-2 transition-transform transform hover:rotate-180" />
                            Subscription
                            <div className="absolute bottom-0 left-0 right-0 border-b-4 border-l-4 border-transparent hover:border-pink-500 transition-border duration-300"></div>
                            <div className="absolute bottom-0 right-0 left-0 bg-pink-200 h-1 shadow-lg hover:opacity-100 transition-opacity"></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile/referral"
                            className={`relative flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform transform hover:-translate-y-1 ${location.pathname === '/profile/referral' ? 'bg-gray-700' : ''}`}
                        >
                            <FaGift className="mr-2 transition-transform transform hover:rotate-180" />
                            Referral & Earn
                            <div className="absolute bottom-0 left-0 right-0 border-b-4 border-l-4 border-transparent hover:border-purple-500 transition-border duration-300"></div>
                            <div className="absolute bottom-0 right-0 left-0 bg-purple-200 h-1 shadow-lg hover:opacity-100 transition-opacity"></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile/notifications"
                            className={`relative flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform transform hover:-translate-y-1 ${location.pathname === '/profile/notifications' ? 'bg-gray-700' : ''}`}
                        >
                            <FaBell className="mr-2 transition-transform transform hover:rotate-180" />
                            Notifications
                            <div className="absolute bottom-0 left-0 right-0 border-b-4 border-l-4 border-transparent hover:border-yellow-500 transition-border duration-300"></div>
                            <div className="absolute bottom-0 right-0 left-0 bg-yellow-200 h-1 shadow-lg hover:opacity-100 transition-opacity"></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile/global-performance"
                            className={`relative flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform transform hover:-translate-y-1 ${location.pathname === '/profile/global-performance' ? 'bg-gray-700' : ''}`}
                        >
                            <FaTrophy className="mr-2 transition-transform transform hover:rotate-180" />
                            Global Performance
                            <div className="absolute bottom-0 left-0 right-0 border-b-4 border-l-4 border-transparent hover:border-green-500 transition-border duration-300"></div>
                            <div className="absolute bottom-0 right-0 left-0 bg-green-200 h-1 shadow-lg hover:opacity-100 transition-opacity"></div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile/settings"
                            className={`relative flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform transform hover:-translate-y-1 ${location.pathname === '/profile/settings' ? 'bg-gray-700' : ''}`}
                        >
                            <FaCog className="mr-2 transition-transform transform hover:rotate-180" />
                            Settings
                            <div className="absolute bottom-0 left-0 right-0 border-b-4 border-l-4 border-transparent hover:border-teal-500 transition-border duration-300"></div>
                            <div className="absolute bottom-0 right-0 left-0 bg-teal-200 h-1 shadow-lg hover:opacity-100 transition-opacity"></div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProfileSidebar;
