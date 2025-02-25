import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserProfile } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ 토큰이 변경될 때 실행할 함수
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("🛠️ AuthContext에서 로컬스토리지 토큰 확인:", token);
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await getUserProfile();
      setUser(res.data);
    } catch (error) {
      console.error("🔴 사용자 정보 불러오기 실패:", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // ✅ 컴포넌트 마운트 시 실행
  useEffect(() => {
    fetchProfile();
    window.addEventListener("storage", fetchProfile); // ✅ 토큰 변경 감지
    return () => window.removeEventListener("storage", fetchProfile);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;