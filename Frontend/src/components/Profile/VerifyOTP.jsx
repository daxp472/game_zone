import React, { useState } from 'react';
import axios from 'axios';

const VerifyOTP = ({ setMessage }) => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        try {
            await axios.post(
                'https://user-auth-76vd.onrender.com/api/auth/reset-password',
                {
                    email,
                    otp,
                    newPassword,
                    confirmPassword
                }
            );
            setMessage({ type: 'success', text: 'Password reset successful' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to reset password' });
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Verify OTP</h2>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">OTP</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                >
                    Verify OTP and Reset Password
                </button>
            </form>
        </div>
    );
};

export default VerifyOTP;