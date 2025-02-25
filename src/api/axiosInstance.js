import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.nbcamp-react-auth.link",
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 (토큰 자동 추가)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;