import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserProfile } from "../api/auth";

const AuthContext = createContext({
  user: null,
  setUser: () => {}, 
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("토큰 없음.");
        return;
      }
  
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (error) {
        console.error("사용자 정보 불러오기 실패:", error.response?.data || error.message);
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