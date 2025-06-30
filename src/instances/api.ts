import axios from 'axios';
import { getAccessTokenCookie, refreshToken } from '@/utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenCookie();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      refreshToken(error);
    }
    return Promise.reject(error);
  }
);

export default api;
