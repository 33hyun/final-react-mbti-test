import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth"; // 회원가입 API 요청 함수 가져오기

const SignUp = () => {
  // 사용자가 입력한 회원가입 정보를 저장하는 상태
  const [id, setId] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const [nickname, setNickname] = useState(""); // 닉네임
  const navigate = useNavigate(); // 페이지 이동을 위한 `useNavigate` 사용

  /**
   * ✅ 회원가입 요청 함수
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSignUp = async (e) => {
    e.preventDefault(); // 기본 동작(새로고침) 방지
    try {
      // 회원가입 API 호출
      await register({ id, password, nickname });
      alert("회원가입 성공! 로그인 페이지로 이동합니다."); // 성공 메시지 표시
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (err) {
      console.error("회원가입 실패:", err.response?.data || err.message);
      alert(err.response?.data?.message || "회원가입에 실패했습니다."); // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">회원가입</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-2">
        {/* 아이디 입력 필드 */}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="border p-2"
        />
        {/* 닉네임 입력 필드 */}
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          className="border p-2"
        />
        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2"
        />
        {/* 회원가입 버튼 */}
        <button type="submit" className="bg-green-500 text-white p-2">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;