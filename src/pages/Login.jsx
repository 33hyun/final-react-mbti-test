import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /** 로그인 요청 */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ id, password });

      if (!res.accessToken) {
        alert("로그인 실패: 토큰을 받아오지 못했습니다.");
        return;
      }

      // JWT 토큰 저장 후 로그인 상태 업데이트
      localStorage.setItem("token", res.accessToken);
      setUser(res);
      navigate("/");
    } catch (error) {
      alert("로그인 실패");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="border p-3 rounded w-full"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-3 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;