import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/context/AuthContext";

const PrivateRoute = ({ role, redirectPath = "/login" }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
