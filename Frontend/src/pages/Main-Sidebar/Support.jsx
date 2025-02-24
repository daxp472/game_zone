import React, { useState } from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send the data to an API)
        console.log(formData);
        alert('Support request submitted!');
    };

    const [faqOpen, setFaqOpen] = useState({
        gameplay: false,
        technical: false,
        account: false,
        payments: false,
        general: false
    });

    const toggleFaq = (section) => {
        setFaqOpen((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="overflow-hidden">
            <GameNavbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
                <div className="text-center m-5 mb-8">
                    <h1 className="text-5xl font-bold mb-4">Support</h1>
                    <p className="text-lg">How can we assist you? Please find FAQs below or submit a support request.</p>
                </div>

                {/* Support Section */}
                <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-md shadow-md text-center mb-8">
                    <h2 className="text-3xl font-semibold mb-4">Support Section</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h3 className="text-2xl font-medium mb-2">Report Issues & Bugs</h3>
                            <p>Report any bugs or issues with the game or platform.</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h3 className="text-2xl font-medium mb-2">Contact Support</h3>
                            <p>Contact us via email or fill out the form below.</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h3 className="text-2xl font-medium mb-2">Account Recovery</h3>
                            <p>Reset password or update email if you have login issues.</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h3 className="text-2xl font-medium mb-2">Purchase & Transactions Help</h3>
                            <p>Resolve issues with the Coin Store or betting.</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h3 className="text-2xl font-medium mb-2">Report Player (Abuse/Cheating)</h3>
                            <p>Report toxic or cheating players.</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md">
                            <h3 className="text-2xl font-medium mb-2">Privacy & Security Help</h3>
                            <p>Get help with account safety and security questions.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-md shadow-md text-left mb-8">
                    <h2 className="text-3xl font-semibold mb-4">FAQ Section</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between gap-3">
                            <motion.div
                                className="bg-gray-700 p-4 rounded-md flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-medium mb-2">Gameplay & Features</h3>
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                                    onClick={() => toggleFaq('gameplay')}
                                >
                                    {faqOpen.gameplay ? 'Hide' : 'Show'} FAQs
                                </button>
                                {faqOpen.gameplay && (
                                    <div className="mt-4 space-y-2">
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to earn coins?</summary>
                                            <p className="mt-2">You can earn coins by completing daily challenges, participating in tournaments, and achieving milestones in the game.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How does the betting arena work?</summary>
                                            <p className="mt-2">The betting arena allows you to place bets on various game outcomes. You can earn coins if your bets are successful.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to join clans & guilds?</summary>
                                            <p className="mt-2">You can join clans and guilds by navigating to the 'Clans & Guilds' section and searching for a clan or guild to join.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">What are achievements and how to unlock them?</summary>
                                            <p className="mt-2">Achievements are special milestones you can unlock by completing various tasks in the game. You can view available achievements in the 'Achievements' section.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to add & challenge friends?</summary>
                                            <p className="mt-2">You can add friends by searching for their usernames in the 'Friends System' section. Once added, you can challenge them to various game modes.</p>
                                        </details>
                                    </div>
                                )}
                            </motion.div>
                            <motion.div
                                className="bg-gray-700 p-4 rounded-md flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-medium mb-2">Technical Support</h3>
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                                    onClick={() => toggleFaq('technical')}
                                >
                                    {faqOpen.technical ? 'Hide' : 'Show'} FAQs
                                </button>
                                {faqOpen.technical && (
                                    <div className="mt-4 space-y-2">
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">Game not loading / crashes frequently, what to do?</summary>
                                            <p className="mt-2">Try clearing your browser cache and cookies, or restart your device. If the issue persists, contact support.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to fix connection issues?</summary>
                                            <p className="mt-2">Ensure you have a stable internet connection. If issues continue, try restarting your router or contacting your ISP.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">Which devices & browsers are supported?</summary>
                                            <p className="mt-2">Our game supports modern browsers like Chrome, Firefox, Safari, and Edge. It is also compatible with most smartphones and tablets running iOS and Android.</p>
                                        </details>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-3">
                            <motion.div
                                className="bg-gray-700 p-4 rounded-md flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-medium mb-2">Account & Security</h3>
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                                    onClick={() => toggleFaq('account')}
                                >
                                    {faqOpen.account ? 'Hide' : 'Show'} FAQs
                                </button>
                                {faqOpen.account && (
                                    <div className="mt-4 space-y-2">
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to reset my password?</summary>
                                            <p className="mt-2">Go to the 'Settings' page and click on 'Reset Password'. Follow the instructions provided.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to enable 2FA for security?</summary>
                                            <p className="mt-2">Navigate to 'Settings'  'Security' and enable Two-Factor Authentication (2FA) using an authenticator app.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to change my email or username?</summary>
                                            <p className="mt-2">Go to 'Settings'  'Account' and update your email or username. You may need to verify your account for changes.</p>
                                        </details>
                                    </div>
                                )}
                            </motion.div>
                            <motion.div
                                className="bg-gray-700 p-4 rounded-md flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-medium mb-2">Payments & Purchases</h3>
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                                    onClick={() => toggleFaq('payments')}
                                >
                                    {faqOpen.payments ? 'Hide' : 'Show'} FAQs
                                </button>
                                {faqOpen.payments && (
                                    <div className="mt-4 space-y-2">
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to buy coins in the Coin Store?</summary>
                                            <p className="mt-2">Navigate to the 'Coin Store' section and select the coin package you wish to purchase. Follow the on-screen instructions to complete your purchase.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">What are the accepted payment methods?</summary>
                                            <p className="mt-2">We accept major credit cards (Visa, Mastercard), PayPal, and some local payment methods depending on your region.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">What if my purchase didn’t go through?</summary>
                                            <p className="mt-2">If your purchase was not successful, please check your payment method for any errors. If the issue persists, contact support with your transaction details.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">Is there a refund policy?</summary>
                                            <p className="mt-2">We offer refunds within 30 days of purchase for eligible items. Please contact support with your transaction details to request a refund.</p>
                                        </details>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-3">
                            <motion.div
                                className="bg-gray-700 p-4 rounded-md flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-medium mb-2">General Questions</h3>
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                                    onClick={() => toggleFaq('general')}
                                >
                                    {faqOpen.general ? 'Hide' : 'Show'} FAQs
                                </button>
                                {faqOpen.general && (
                                    <div className="mt-4 space-y-2">
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">Is this game free-to-play?</summary>
                                            <p className="mt-2">Yes, the game is free-to-play. However, some in-game items and features may require purchases.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">How to contact support for further assistance?</summary>
                                            <p className="mt-2">You can contact support by filling out the support request form below or by emailing us directly at support@gamezone.com.</p>
                                        </details>
                                        <details className="bg-gray-600 p-2 rounded-md">
                                            <summary className="font-semibold">Where can I see the latest game updates?</summary>
                                            <p className="mt-2">Game updates can be found in the 'Game News & Updates' section of our website or through our social media channels.</p>
                                        </details>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Support Request Form */}
                <div className="w-full max-w-2xl m-5 bg-gray-800 p-8 rounded-md shadow-md">
                    <h2 className="text-3xl font-semibold mb-4">Submit a Support Request</h2>
                    <form onSubmit={handleSubmit} className="text-left space-y-4">
                        <div>
                            <label className="block font-medium mb-1" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded-md text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded-md text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-700 rounded-md text-white"
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default Support;