import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav className="flex justify-between p-4 bg-gray-800 text-white">
        <Link to="/">홈</Link>
        <div>
          <Link to="/login" className="mr-4">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;