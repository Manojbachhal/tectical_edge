import { type JSX } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return !token ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
