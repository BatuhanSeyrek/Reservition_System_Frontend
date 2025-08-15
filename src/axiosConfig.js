import axios from "axios";

const baseURL = "https://4fcc4c79fb3c.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Login ve register isteklerinde token gönderme
    if (
      config.url.includes("/admin/login") ||
      config.url.includes("/admin/register") ||
      config.url.includes("/user/login") ||
      config.url.includes("/user/register")
      
    ) {
      return config;
    }

    // Diğer tüm isteklere token ekle
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['ngrok-skip-browser-warning']='true';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
