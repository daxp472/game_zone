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
                <ul className="space-y-2 p-4">
                    <li>
                        <Link to="/profile" className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/profile/details' ? 'bg-gray-700' : ''}`}>
                            <FaUser className="mr-2" /> Personal Details
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/subscription" className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/profile/subscription' ? 'bg-gray-700' : ''}`}>
                            <FaCreditCard className="mr-2" /> Subscription
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/referral" className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/profile/referral' ? 'bg-gray-700' : ''}`}>
                            <FaGift className="mr-2" /> Referral & Earn
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/notifications" className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/profile/notifications' ? 'bg-gray-700' : ''}`}>
                            <FaBell className="mr-2" /> Notifications
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/global-performance" className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/profile/global-performance' ? 'bg-gray-700' : ''}`}>
                            <FaTrophy className="mr-2" /> Global Performance
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/settings" className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/profile/settings' ? 'bg-gray-700' : ''}`}>
                            <FaCog className="mr-2" /> Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProfileSidebar;
