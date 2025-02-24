import React, { useState } from 'react';
import GameNavbar from '../../components/GameNavbar';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Footer from '../../components/Footer';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePlanChange = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <ProfileHeader />
            <div className="flex ml-5 mt-5">
                <div className="">
                    <ProfileSidebar />
                </div>
                <main className="flex-grow p-6 mt-5 ml-10 bg-gray-800 rounded-lg shadow-lg">
                    <div className="bg-white p-4 rounded-md mb-6 text-gray-800">
                        <div className="flex justify-between items-center">
                            <div className="text-lg font-semibold">Current Plan</div>
                            <div className="text-green-400 text-sm  bg-green-100 box-border border-2 border-green-500 rounded-full mr-7 px-3 py-1">Active</div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <div className="">
                                <div className="text-xl font-semibold">Basic Plan</div>
                                <div className="text-gray-400">Permanent</div>
                            </div>
                            <div className="mr-5 p-3 box-border border-2 text-purple-600 border-purple-500 rounded-lg cursor-pointer">
                                Manage Plan
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-6 mt-4 text-white">Subscription Plans</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div
                            className={`bg-white p-6 rounded-lg cursor-pointer transition duration-300 shadow-md ${selectedPlan === 'Basic' ? 'bg-gray-100' : 'bg-white'}`}
                            onClick={() => handlePlanChange('Basic')}
                        >
                            <h2 className="text-sm text-black font-semibold mb-4">Basic</h2>
                            <h3 className="text-2xl font-bold text-gray-800">Free</h3>
                            <ul className="list-disc list-inside mt-5 text-gray-600">
                                <li>Basic features</li>
                                <li>3 TOM Card</li>
                                <li>Community support</li>
                            </ul>
                            <button className="w-full bg-transparent text-purple-600 border border-purple-600 py-2 px-4 mt-8 rounded-md hover:bg-purple-600 hover:text-white transition duration-300">Current Plan</button>
                        </div>
                        <div
                            className={`bg-[#4F46E5] p-8 rounded-lg cursor-pointer transition duration-300 shadow-md transform scale-110 ${selectedPlan === 'Pro' ? 'bg-#4F46E5' : 'bg-white'}`}
                            onClick={() => handlePlanChange('Pro')}
                        >
                            <div className='flex justify-between items-center -mt-3 mb-5'>
                                <div className='text-white font-bold text-sm'>Pro</div>
                                <div className='text-white text-sm bg-[#6366F1] box-border border-1 border-[#6566F1] rounded-full px-2 py-1'>Popular</div>
                            </div>
                            <h3 className="text-xs text-white"><span className="text-2xl font-bold">$29</span> /month</h3>
                            <ul className="list-disc list-inside mt-4 text-white">
                                <li>All Basic features</li>
                                <li>3 TOM Card per week</li>
                                <li>Priority support</li>
                                <li>Advanced analytics</li>
                                <li>2x Exp increase</li>
                            </ul>
                            <button className="w-full bg-white text-[#4F46E5] border border-purple-600 py-2 px-4 mt-4 rounded-md hover:bg-purple-600 hover:text-white transition duration-300">Upgrade Now</button>
                        </div>
                        <div
                            className={`bg-white p-6 rounded-lg cursor-pointer transition duration-300 shadow-md ${selectedPlan === 'Enterprise' ? 'bg-gray-100' : 'bg-white'}`}
                            onClick={() => handlePlanChange('Enterprise')}
                        >
                            <h2 className="text-sm text-black font-semibold mb-5">Enterprise</h2>
                            <h3 className="text-xs text-black"><span className="text-2xl font-bold">$99</span> /month</h3>
                            <ul className="list-disc list-inside mt-4 text-gray-600">
                                <li>All Pro features</li>
                                <li>Dedicated support</li>
                                <li>5 TOM Card per week</li>
                                <li>3x Exp increase</li>
                            </ul>
                            <button className="w-full bg-transparent text-purple-600 border border-purple-600 py-2 px-4 mt-8 rounded-md hover:bg-purple-600 hover:text-white transition duration-300">Contact Sales</button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Subscription;