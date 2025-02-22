import React from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileStats from '../../components/Profile/ProfileStats';
import ProfileDetails from '../../components/Profile/ProfileDetails';

const Profile = () => {
    const stats = {
        totalMatches: 123,
        winRate: 75,
        totalPoints: 4567,
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <div className="flex ml-5 mt-5">
                <ProfileSidebar />
                <main className="flex-grow p-6 mt-5 ml-10">
                    <ProfileHeader />
                    <ProfileStats stats={stats} />
                    <ProfileDetails />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
