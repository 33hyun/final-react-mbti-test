import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserProfile } from "../api/auth";

const AuthContext = createContext({
  user: null,
  setUser: () => {}, // 기본값 설정
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getUserProfile();
        setUser(res);
      } catch (error) {
        console.error("🔴 사용자 정보 불러오기 실패:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchProfile();
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