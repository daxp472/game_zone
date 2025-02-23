import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'https://user-auth-76vd.onrender.com/api/auth';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: credentials.email, // API accepts username/email in username field
        password: credentials.password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        gender: userData.gender,
        dob: userData.dob
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    setUser,  // Make sure to include setUser here
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
