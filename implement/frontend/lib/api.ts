import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

/**
 * Axios instance configured for ClarityExpense API
 * Base URL points to Spring Boot backend
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Automatically attaches JWT token to all requests if user is authenticated
 */
api.interceptors.request.use(
  (config) => {
    // Get token from Zustand store
    const token = useAuthStore.getState().token;
    
    // If token exists, attach it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle common error scenarios (e.g., 401 Unauthorized)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If response is 401 Unauthorized, logout user
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      
      // Redirect to login page if not already there
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
