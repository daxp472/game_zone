import React from 'react';
import GameNavbar from '../../components/GameNavbar';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import Leaderboard from '../../components/Leaderboard';

const GlobalPerformance = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <ProfileHeader />
            <div className="flex ml-5 mt-5">
                <div>
                    <ProfileSidebar />
                </div>
                <main className="flex-grow p-6 mt-5 ml-10">
                    <h1 className="text-3xl font-bold mb-6 mt-4">Global Performance</h1>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Hello, {user.name}!</h2>
                        <p className="text-lg mb-2">Username: <span className="text-blue-400">@{user.username}</span></p>
                        <p className="text-lg mb-2">Email: <span className="text-blue-400">{user.email}</span></p>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-2">Overall Ranking</h3>
                            <p className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-lg shadow-md mb-4">
                                You're currently ranked <span className="font-bold text-yellow-300">#42</span> globally!
                            </p>

                            <h3 className="text-xl font-bold mb-2">Performance Metrics</h3>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Total Matches Played</h4>
                                    <p className="text-2xl font-bold">128</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Wins</h4>
                                    <p className="text-2xl font-bold">96</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Win Rate</h4>
                                    <p className="text-2xl font-bold">75%</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Total Points Scored</h4>
                                    <p className="text-2xl font-bold">4567</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Achievements Unlocked</h4>
                                    <p className="text-2xl font-bold">8</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2">Comparison with Top Players</h3>
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-lg shadow-md mb-6">
                                <p className="font-bold text-lg">Top 10 Players</p>
                                <ul className="list-disc list-inside">
                                    <li className="font-semibold">Player1 - 6789 points</li>
                                    <li className="font-semibold">Player2 - 6500 points</li>
                                    <li className="font-semibold">Player3 - 6300 points</li>
                                    <li className="font-semibold">Player4 - 6200 points</li>
                                    <li className="font-semibold">Player5 - 6000 points</li>
                                    <li className="font-semibold">Player6 - 5900 points</li>
                                    <li className="font-semibold">Player7 - 5800 points</li>
                                    <li className="font-semibold">Player8 - 5700 points</li>
                                    <li className="font-semibold">Player9 - 5600 points</li>
                                    <li className="font-semibold">Player10 - 5500 points</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-bold mb-2">Recent Activity</h3>
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-lg shadow-md mb-6">
                                <p className="font-bold text-lg">Recent Wins</p>
                                <ul className="list-disc list-inside">
                                    <li className="font-semibold">Victory against PlayerX - 45 points</li>
                                    <li className="font-semibold">Victory against PlayerY - 50 points</li>
                                    <li className="font-semibold">Victory against PlayerZ - 55 points</li>
                                </ul>
                                <p className="font-bold text-lg mt-4">Recent Losses</p>
                                <ul className="list-disc list-inside">
                                    <li className="font-semibold">Loss to PlayerA - 30 points</li>
                                    <li className="font-semibold">Loss to PlayerB - 25 points</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-bold mb-2">Personal Bests</h3>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Highest Score in a Single Match</h4>
                                    <p className="text-2xl font-bold">150</p>
                                </div>
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Longest Winning Streak</h4>
                                    <p className="text-2xl font-bold">10</p>
                                </div>
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                                    <h4 className="text-lg font-bold">Fastest Match Victory</h4>
                                    <p className="text-2xl font-bold">2m 30s</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2">Upcoming Challenges</h3>
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-lg shadow-md">
                                <p className="font-bold text-lg">Scheduled Matches</p>
                                <ul className="list-disc list-inside">
                                    <li className="font-semibold">Match against PlayerD - Tomorrow at 5 PM</li>
                                    <li className="font-semibold">Match against PlayerE - Sunday at 3 PM</li>
                                </ul>
                                <p className="font-bold text-lg mt-4">Challenges and Tournaments</p>
                                <ul className="list-disc list-inside">
                                    <li className="font-semibold">Participate in the Weekly Tournament</li>
                                    <li className="font-semibold">Complete the Daily Challenge</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-3xl font-bold mb-2">Leaderboard</h2>
                            <div className="h-20 overflow-y-auto">
                                <Leaderboard
                                    gameId="Global-Performance"
                                    username={user.username}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default GlobalPerformance;