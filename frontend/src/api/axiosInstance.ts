import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axiosInstance.post("/auth/refresh", { refreshToken });
          const newToken = response.data.token;
          localStorage.setItem("token", newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (err) { void err; }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
