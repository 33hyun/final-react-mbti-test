import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import TestPage from "../pages/TestPage";
import TestResultList from "../pages/TestResultList";
import ResultPage from "../pages/ResultPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<TestPage />} />
          <Route path="results" element={<TestResultList />} />
          <Route path="result/:id" element={<ResultPage />} /> 
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;