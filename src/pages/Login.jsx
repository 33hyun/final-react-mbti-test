import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Tanstack Query 활용한 로그인 요청
  const mutation = useMutation({
    mutationFn: login, // API 요청 함수
    onSuccess: (res) => {
      const token = res.data?.accessToken;
      if (!token) {
        alert("로그인 실패: 토큰을 받지 못했습니다.");
        return;
      }

      // 토큰을 localStorage에 저장
      localStorage.setItem("token", token);
      setUser(res.data); // 사용자 정보 업데이트
      window.dispatchEvent(new Event("storage")); // 로그인 상태 반영 트리거
      navigate("/"); // 로그인 후 홈으로 이동
    },
    onError: (error) => {
      alert("로그인 실패");
      console.error("로그인 오류:", error);
    },
  });

  // 폼 제출 시 로그인 요청 실행
  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ id, password }); // API 호출 실행
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-4">
        <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} required className="border p-3 rounded w-full" />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-3 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600" disabled={mutation.isLoading}>
          {mutation.isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
};

export default Login;