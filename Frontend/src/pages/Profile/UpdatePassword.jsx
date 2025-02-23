import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = ({ setMessage }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        try {
            await axios.post(
                'https://user-auth-76vd.onrender.com/api/auth/change-password',
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update password' });
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-2">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-white p-2 rounded-md"
                    />
                </div>
                <div className="text-red-500 text-sm">
                    <Link to={`/profile/${user.username}/settings/forgot-password`} className="hover:underline">
                        Forgot your password?
                    </Link>
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;