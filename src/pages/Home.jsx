import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  /**
   * ✅ 테스트 시작 버튼 클릭 시 실행되는 함수
   * 로그인 여부를 확인 후 로그인 상태에 따라 페이지 이동
   */
  const handleStartTest = () => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 JWT 토큰 가져오기

    if (token) {
      navigate("/test"); // 로그인 상태면 테스트 페이지로 이동
    } else {
      alert("로그인이 필요합니다!"); // (추후 alert 대신 UI 개선 가능)
      navigate("/login"); // 로그인 상태가 아니면 로그인 페이지로 이동
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">MBTI 테스트</h1>
      <button
        onClick={handleStartTest}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        테스트 시작하기
      </button>
    </div>
  );
};

export default Home;