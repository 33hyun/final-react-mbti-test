import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", email, password);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2">로그인</button>
      </form>
    </div>
  );
};

export default Login;