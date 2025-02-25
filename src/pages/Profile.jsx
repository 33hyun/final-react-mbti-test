import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getUserProfile, updateNickname } from "../api/auth";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); // 전역 상태에서 사용자 정보 가져오기
  const [nickname, setNickname] = useState(""); // 닉네임 변경을 위한 상태

  const navigate = useNavigate();

  useEffect(() => {
    // 프로필 정보를 불러오는 비동기 함수
    const fetchProfile = async () => {
      if (!user) {
        try {
          const res = await getUserProfile(); // API 호출하여 사용자 정보 가져오기
          setUser(res.data); // 전역 상태 업데이트
          setNickname(res.data.nickname); // 닉네임 상태 업데이트
        } catch (err) {
          console.error("프로필 불러오기 실패:", err.response?.data || err.message);
          alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login"); // 로그인 페이지로 리디렉션
        }
      }
    };

    fetchProfile();
  }, [user, navigate, setUser]); // 의존성 배열에 user 포함 (user 변경 시 fetchProfile 재실행)

  // 닉네임 변경 요청 함수
  const handleUpdateNickname = async () => {
    try {
      await updateNickname({ nickname }); // API 요청하여 닉네임 변경
      alert("닉네임이 업데이트되었습니다.");
      setUser((prevUser) => ({ ...prevUser, nickname })); // 사용자 정보 상태 업데이트
    } catch (err) {
      console.error("닉네임 업데이트 실패:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">프로필</h2>
      {user ? (
        <div className="text-center bg-white shadow-md p-6 rounded-lg">
          <p className="mb-2">아이디: {user.id || "정보 없음"}</p>
          <p className="mb-2">닉네임: {user.nickname || "정보 없음"}</p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={handleUpdateNickname} className="bg-blue-500 text-white p-2 mt-2 rounded">
            변경
          </button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Profile;