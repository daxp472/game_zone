import React from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { FaMedal, FaTrophy, FaStar, FaUsers, FaGamepad, FaChartLine, FaCrown} from 'react-icons/fa';

const Achievements = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <div className="flex flex-col items-center justify-center py-12">
                <h1 className="text-4xl font-bold mb-8">Achievements</h1>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-5xl text-center">
                    <h2 className="text-2xl font-semibold mb-4">Currently, you have no achievements.</h2>
                    <p className="text-lg text-gray-400 mb-4">Try in the next upcoming event, which happens every 3 months!</p>
                    <p className="text-md text-gray-500 mb-6">Stay tuned for more details on how to participate and earn achievements. The next event is happening around May, so please join and participate to earn these achievements!</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gray-700 p-4 rounded-md">
                            <FaMedal className="text-yellow-500 text-4xl mb-3 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Event Champion</h3>
                            <p className="text-gray-400 mb-4">Awarded for winning the quarterly gaming event.</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">View Details</button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <FaCrown className="text-yellow-500 text-4xl mb-3 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Top Scorer</h3>
                            <p className="text-gray-400 mb-4">Awarded for achieving the highest score in a game.</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">View Details</button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <FaStar className="text-yellow-500 text-4xl mb-3 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Rising Star</h3>
                            <p className="text-gray-400 mb-4">Awarded for outstanding performance by a new player.</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">View Details</button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <FaGamepad className="text-yellow-500 text-4xl mb-3 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Game Master</h3>
                            <p className="text-gray-400 mb-4">Awarded for mastering all levels of a game.</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">View Details</button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <FaTrophy className="text-yellow-500 text-4xl mb-3 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Tournament Winner</h3>
                            <p className="text-gray-400 mb-4">Awarded for winning a tournament.</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">View Details</button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <FaUsers className="text-yellow-500 text-4xl mb-3 mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Community Hero</h3>
                            <p className="text-gray-400 mb-4">Awarded for making significant contributions to the community.</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Achievements;