import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateNickname } from "../api/auth"; // API 함수 가져오기

const Profile = () => {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [nickname, setNickname] = useState(""); // 닉네임 변경 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 JWT 토큰 가져오기

      if (!token) {
        console.warn("❌ 토큰 없음: 로그인 페이지로 이동");
        navigate("/login");
        return;
      }

      try {
        const res = await getUserProfile(); // API 호출 (토큰은 자동으로 포함됨)
        setUser(res);
        setNickname(res.nickname); // 기존 닉네임 저장
      } catch (err) {
        console.error("❌ 프로필 로드 실패:", err.response?.data || err.message);
        navigate("/login"); // 실패 시 로그인 페이지로 이동
      }
    };

    fetchProfile();
  }, [navigate]);

  // 닉네임 업데이트 함수
  const handleNicknameUpdate = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const updatedUser = await updateNickname({ nickname }); // 닉네임 변경 API 호출
      console.log("✅ 닉네임 변경 완료:", updatedUser);
      setUser((prev) => ({ ...prev, nickname })); // UI 업데이트
    } catch (err) {
      console.error("❌ 닉네임 업데이트 실패:", err.response?.data || err.message);
      alert("닉네임 변경에 실패했습니다.");
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
          {/* 닉네임 업데이트 버튼 */}
          <button
            onClick={handleNicknameUpdate}
            className="bg-blue-500 text-white p-2 mt-2"
          >
            닉네임 변경
          </button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Profile;