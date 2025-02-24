import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // 초기 로그인 상태 설정

  /**
   * ✅ 로그인 상태 업데이트 함수
   * - 로그인, 로그아웃 시 `localStorage` 변경을 감지하여 즉시 상태를 업데이트함.
   */
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

  /**
   * ✅ 로그아웃 함수
   * - 토큰 삭제 후 로그인 상태 업데이트
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 상태 즉시 업데이트
    navigate("/login");
  };

  return (
    <div>
      {/* 🔹 네비게이션 바 */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl">MBTI 테스트</h1>
        <div>
          <Link to="/" className="mr-4">홈</Link>

          {/* 🔹 로그인 상태에 따라 네비게이션 변경 */}
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="mr-4">프로필</Link>
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

      {/* 현재 페이지의 콘텐츠가 여기에 렌더링됨 */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;