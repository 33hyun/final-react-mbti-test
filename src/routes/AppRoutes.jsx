import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout"; // Layout 추가
import ProtectedRoute from "../ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Test from "../pages/Test";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🏠 모든 페이지에 Layout 적용 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        {/* 🔒 보호된 라우트 (로그인 필요) */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;