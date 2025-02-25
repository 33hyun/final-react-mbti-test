import axiosInstance from "./axiosInstance";

/**
 * 회원가입 요청 함수
 * @param {Object} userData - { id, password, nickname }
 * @returns {Promise<Object>} - 회원가입 응답 메시지
 */
export const register = (userData) => axiosInstance.post("/register", userData);

/**
 * 로그인 요청 함수
 * @param {Object} userData - { id, password }
 * @returns {Promise<Object>} - 로그인 성공 시 { accessToken, userId, avatar, nickname }
 */
export const login = (userData) => axiosInstance.post("/login", userData);

/**
 * 프로필 정보 가져오기 함수
 * @returns {Promise<Object>} - 사용자 프로필 정보
 */
export const getUserProfile = () => axiosInstance.get("/user");

/**
 * 닉네임 변경 함수
 * @param {Object} data - 변경할 닉네임
 * @returns {Promise<Object>} - 변경된 닉네임 정보
 */
export const updateNickname = (data) =>
  axiosInstance.patch("/profile", data);