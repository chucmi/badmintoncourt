import axios from "axios";

// Set the base URL for your API
axios.defaults.baseURL = "https://badmintonbookingserver.up.railway.app/api";

// Initialize a flag for token refresh
let refresh = false;

// Intercept responses to handle token refresh
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await axios.post(
        "/v1/auth/refresh",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data["token"]}`;
        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);

// Create an axios instance with custom headers
const axiosClient = axios.create({
  baseURL: "https://badmintonbookingserver.up.railway.app/api", // Set your desired base URL
  headers: {
    "Content-type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";

      // Check the data type being sent
      if (config.data instanceof FormData) {
        // If data is FormData (multipart/form-data), set the corresponding Content-Type
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        // If not FormData, set Content-Type to application/json
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;