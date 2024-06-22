import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://badmintonbookingserver.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let refresh = false;

// Intercept responses to handle token refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      try {
        const response = await axiosClient.post('/v1/auth/refresh', {}, { withCredentials: true });
        if (response.status === 200) {
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          error.config.headers['Authorization'] = `Bearer ${response.data.token}`;
          return axiosClient(error.config);
        }
      } catch (err) {
        // Handle refresh token error
        return Promise.reject(err);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

// Add a request interceptor to include the token in headers
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = 'application/json';

      // Check the data type being sent
      if (config.data instanceof FormData) {
        // If data is FormData (multipart/form-data), set the corresponding Content-Type
        config.headers['Content-Type'] = 'multipart/form-data';
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
