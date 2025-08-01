import axios from "axios";

// Yeni bir axios örneği oluştur
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Backend'in URL'si
   withCredentials: true 
});

// Her istekten önce token'ı header'a ekle
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // localStorage'dan token al
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Header'a ekle
  }
  return config;
}, (error) => {
  return Promise.reject(error); // Hata varsa geri döndür
});

export default axiosInstance;