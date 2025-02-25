import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth || auth.user === null) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;