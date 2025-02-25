import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // 초기 로그인 상태 설정

  // 로그인 상태 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // storage 이벤트 감지 (다른 탭에서도 동기화 가능)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 상태 즉시 업데이트
    navigate("/login");
  };

  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        {/* 제목 클릭시 홈으로 이동 */}
        <Link to="/" className="text-xl">MBTI 테스트</Link>
        <div>

          {/* 로그인 상태에 따라 네비게이션 변경 */}
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="mr-4">프로필</Link>
              <Link to="/test" className="mr-4">테스트</Link>
              <Link to="/results" className="mr-4">결과</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </div>
      </nav>

      {/* 현재 페이지의 콘텐츠 렌더링 */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;