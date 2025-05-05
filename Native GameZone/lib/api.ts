import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints } from '@/constants/ApiEndpoints';

const api = axios.create({
  baseURL: 'https://api.gamezone.com', // Base URL for all API calls
  timeout: 10000, // 10 seconds timeout
});

// Add JWT token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiClient = {
  login: (email: string, password: string) =>
    api.post(ApiEndpoints.AUTH_LOGIN, { email, password }),
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: string;
  }) => api.post(ApiEndpoints.AUTH_SIGNUP, userData),
  getGames: () => api.get(ApiEndpoints.GAME_LIST),
  getLeaderboard: () => api.get(ApiEndpoints.LEADERBOARD),
  getUserProfile: () => api.get(ApiEndpoints.USER_PROFILE),
  spinWheel: () => api.post(ApiEndpoints.SPIN_WHEEL),
  getTournaments: () => api.get(ApiEndpoints.TOURNAMENTS),
};