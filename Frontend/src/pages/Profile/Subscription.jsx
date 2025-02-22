import React, { useState } from 'react';
import GameNavbar from '../../components/GameNavbar';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Footer from '../../components/Footer';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState('Current');

    const handlePlanChange = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <ProfileHeader />
            <div className="flex ml-5 mt-5">
                <div className=''>
                <ProfileSidebar />
                </div>
                <main className="flex-grow p-6 mt-5 ml-10">
                    
                    <h1 className="text-3xl font-bold mb-6 mt-4">Subscription Plans</h1>
                    <div className="grid grid-cols-3 gap-4">
                        <div 
                            className={`p-6 rounded-lg cursor-pointer ${selectedPlan === 'Current' ? 'bg-blue-600' : 'bg-gray-800'}`}
                            onClick={() => handlePlanChange('Current')}
                        >
                            <h2 className="text-xl font-bold">Current Plan</h2>
                            <p className="mt-2">Enjoy our basic features with the current plan.</p>
                            {selectedPlan === 'Current' && <p className="mt-4 text-green-400">You are currently subscribed to this plan.</p>}
                        </div>
                        <div 
                            className={`p-6 rounded-lg cursor-pointer ${selectedPlan === 'Pro' ? 'bg-blue-600' : 'bg-gray-800'}`}
                            onClick={() => handlePlanChange('Pro')}
                        >
                            <h2 className="text-xl font-bold">Pro Plan</h2>
                            <p className="mt-2">Unlock advanced features with the Pro plan.</p>
                            {selectedPlan === 'Pro' && <p className="mt-4 text-green-400">You have selected the Pro plan.</p>}
                        </div>
                        <div 
                            className={`p-6 rounded-lg cursor-pointer ${selectedPlan === 'Enterprise' ? 'bg-blue-600' : 'bg-gray-800'}`}
                            onClick={() => handlePlanChange('Enterprise')}
                        >
                            <h2 className="text-xl font-bold">Enterprise Plan</h2>
                            <p className="mt-2">Get premium features with the Enterprise plan.</p>
                            {selectedPlan === 'Enterprise' && <p className="mt-4 text-green-400">You have selected the Enterprise plan.</p>}
                        </div>
                    </div>
                    <div className="mt-8">
                        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                            Confirm Subscription
                        </button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Subscription;
