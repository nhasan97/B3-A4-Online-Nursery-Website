import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/auth.type";
import { TProtectedRoute } from "@/types/global.type";
import { verifyToken } from "@/utils/verifyToken";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const { token } = useAppSelector((currentState) => currentState.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (!token) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  if (role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
