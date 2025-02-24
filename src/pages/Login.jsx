import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // 로그인 API 호출 함수 가져오기

const Login = () => {
  // 사용자가 입력한 로그인 정보를 저장하는 상태
  const [id, setId] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const navigate = useNavigate(); // 페이지 이동을 위한 `useNavigate` 사용

  /**
   * ✅ 로그인 요청 함수
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 동작(새로고침) 방지
    try {
      // 로그인 API 호출
      const res = await login({ id, password });
      // 로그인 성공 시 accessToken을 localStorage에 저장
      localStorage.setItem("token", res.accessToken);
      alert("로그인 성공! 프로필 페이지로 이동합니다."); // 성공 메시지 표시
      navigate("/profile"); // 로그인 성공 후 프로필 페이지로 이동
    } catch (err) {
      console.error("로그인 실패:", err.response?.data || err.message);
      alert(err.response?.data?.message || "로그인에 실패했습니다."); // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        {/* 아이디 입력 필드 */}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
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
        {/* 로그인 버튼 */}
        <button type="submit" className="bg-blue-500 text-white p-2">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;