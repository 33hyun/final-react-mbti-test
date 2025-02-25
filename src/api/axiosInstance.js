import axios from "axios";

// API 기본 URL 설정
const API_URL = "https://www.nbcamp-react-auth.link";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL, // 모든 요청의 기본 URL
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
});

// 요청 인터셉터 (자동으로 JWT 토큰 포함)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 응답 그대로 반환
  (error) => {
    console.error("API 요청 실패:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;