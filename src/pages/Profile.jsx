import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../api/auth"; // 프로필 관련 API 함수 가져오기

const Profile = () => {
  const [user, setUser] = useState(null); // 사용자 정보 상태 관리
  const [nickname, setNickname] = useState(""); // 닉네임 변경을 위한 상태
  const [avatar, setAvatar] = useState(null); // 프로필 이미지 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // JWT 토큰 가져오기
      if (!token) {
        navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
        return;
      }
      try {
        const res = await getUserProfile(token);
        setUser(res); // 사용자 정보 저장
        setNickname(res.nickname); // 기존 닉네임 저장
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("프로필 정보를 불러오는 데 실패했습니다.");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 프로필 업데이트 함수
  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("nickname", nickname); // 닉네임 변경
      if (avatar) {
        formData.append("avatar", avatar); // 프로필 이미지 변경
      }
      await updateProfile(formData, token);
      alert("프로필이 업데이트되었습니다.");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("프로필 업데이트 실패");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">프로필</h2>
      {user ? (
        <div className="text-center">
          <p className="mb-2">아이디: {user.id}</p>
          {/* 닉네임 입력 필드 */}
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border p-2"
          />
          {/* 프로필 이미지 업로드 필드 */}
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="border p-2 mt-2"
          />
          {/* 프로필 업데이트 버튼 */}
          <button onClick={handleProfileUpdate} className="bg-blue-500 text-white p-2 mt-2">
            프로필 업데이트
          </button>
          {/* 로그아웃 버튼 */}
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-4">
            로그아웃
          </button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Profile;