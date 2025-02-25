import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ✅ default import 사용
import { getUserProfile } from "../api/auth";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        try {
          const res = await getUserProfile();
          setUser(res);
          setNickname(res.nickname);
        } catch (err) {
          console.error("❌ 프로필 불러오기 실패:", err.response?.data || err.message);
          alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [user, navigate, setUser]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">프로필</h2>
      {user ? (
        <div className="text-center">
          <p className="mb-2">아이디: {user.id}</p>
          <p className="mb-2">닉네임: {nickname}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Profile;