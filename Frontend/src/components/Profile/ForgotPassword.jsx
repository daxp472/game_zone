import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = ({ setMessage }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'https://user-auth-76vd.onrender.com/api/auth/forgot-password',
                {
                    email
                }
            );
            setMessage({ type: 'success', text: 'Password reset OTP sent to your email' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to send OTP' });
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Forgot Password</h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                >
                    Send OTP
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;