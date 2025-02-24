import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout"; 
import ProtectedRoute from "../ProtectedRoute"; 

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import TestPage from "../pages/TestPage";
import Result from "../pages/TestResultList";
import Item from "../pages/TestResultItem" 

const AppRoutes = () => {
  return (
    <Routes>
      {/* 모든 페이지에 Layout 적용 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> 
        <Route path="login" element={<Login />} /> 
        <Route path="signup" element={<SignUp />} /> 
        
        {/* 보호된 라우트 (로그인 필요) */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<TestPage />} />
          <Route path="result" element={<Result />} />
          <Route path="item" element={<Item />} /> 
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;