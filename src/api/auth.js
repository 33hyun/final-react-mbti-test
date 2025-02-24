import axios from "axios";

// ✅ 기본 API URL 설정
const API_URL = "https://www.nbcamp-react-auth.link";

/**
 * ✅ 회원가입 요청 함수
 * @param {Object} userData - { id, password, nickname }
 * @returns {Promise<Object>} - 회원가입 응답 메시지
 */
export const register = async (userData) => {
  try {
    // API 요청: 회원가입 엔드포인트로 `POST` 요청을 보냄
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // 성공 시 API의 응답 데이터 반환
  } catch (error) {
    console.error("회원가입 오류:", error.response?.data || error.message);
    throw error; // 오류를 발생시켜 상위에서 처리할 수 있도록 함
  }
};

/**
 * ✅ 로그인 요청 함수
 * @param {Object} userData - { id, password }
 * @returns {Promise<Object>} - 로그인 성공 시 { accessToken, userId, avatar, nickname }
 */
export const login = async (userData) => {
  try {
    // API 요청: 로그인 엔드포인트로 `POST` 요청을 보냄
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // 로그인 성공 시 `accessToken` 및 유저 정보 반환
  } catch (error) {
    console.error("로그인 오류:", error.response?.data || error.message);
    throw error; // 오류 발생 시 상위에서 처리 가능하도록 예외 던짐
  }
};

/**
 * ✅ 프로필 정보 가져오기 함수
 * @param {string} token - JWT accessToken
 * @returns {Promise<Object>} - 사용자 프로필 정보
 */
export const getUserProfile = async (token) => {
  try {
    // API 요청: 유저 정보를 가져오기 위해 `GET` 요청을 보냄
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }, // 헤더에 JWT 토큰 포함
    });
    return response.data; // 성공 시 유저 프로필 데이터 반환
  } catch (error) {
    console.error("프로필 정보 가져오기 오류:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ 프로필 업데이트 함수 (닉네임 및 프로필 이미지 변경)
 * @param {FormData} formData - 변경할 데이터 (avatar, nickname)
 * @param {string} token - JWT accessToken
 * @returns {Promise<Object>} - 변경된 프로필 정보
 */
export const updateProfile = async (formData, token) => {
  try {
    // API 요청: 프로필 업데이트 엔드포인트로 `PATCH` 요청을 보냄
    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드를 위한 설정
        Authorization: `Bearer ${token}`, // 헤더에 JWT 토큰 포함
      },
    });
    return response.data; // 성공 시 변경된 닉네임 및 이미지 URL 반환
  } catch (error) {
    console.error("프로필 업데이트 오류:", error.response?.data || error.message);
    throw error;
  }
};