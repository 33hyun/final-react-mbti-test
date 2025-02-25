import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth"; // 회원가입 API 요청 함수

const SignUp = () => {
  const [id, setId] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const [nickname, setNickname] = useState(""); // 닉네임
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션

  /**
   * React Query의 `useMutation`을 사용하여 회원가입 요청 처리
   */
  const mutation = useMutation({
    mutationFn: register, // API 요청 함수
    onSuccess: () => {
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
    },
    onError: (error) => {
      console.error("회원가입 실패:", error.response?.data || error.message);
      alert(error.response?.data?.message || "회원가입에 실패했습니다.");
    },
  });

  /**
   * 회원가입 요청 핸들러
   * @param {Event} e - 폼 제출 이벤트
   */
  const handleSignUp = (e) => {
    e.preventDefault(); // 기본 새로고침 방지
    mutation.mutate({ id, password, nickname }); // 회원가입 요청 실행
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSignUp} className="w-full max-w-md flex flex-col gap-4">
        {/* 아이디 입력 필드 */}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="border p-3 rounded w-full"
        />
        {/* 닉네임 입력 필드 */}
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          className="border p-3 rounded w-full"
        />
        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-3 rounded w-full"
        />
        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="bg-green-500 text-white py-3 rounded hover:bg-green-600"
          disabled={mutation.isLoading} // 요청 중이면 버튼 비활성화
        >
          {mutation.isLoading ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;