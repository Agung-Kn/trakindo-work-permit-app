import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const { token, profile } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!profile || !profile.roles?.some((r) => allowedRoles.includes(r)))) {
    return <Navigate to="/permit-a" replace />;
  }

  return <Outlet />;
}
