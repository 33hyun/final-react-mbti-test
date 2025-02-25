import axiosInstance from "./axiosInstance";

export const register = (userData) => axiosInstance.post("/register", userData);
export const login = (userData) => axiosInstance.post("/login", userData);
export const getUserProfile = () => axiosInstance.get("/user");
export const updateNickname = (data) => axiosInstance.patch("/profile", data);