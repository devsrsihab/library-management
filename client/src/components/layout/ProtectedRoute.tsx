import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  currentToken,
  logout,
  TUser,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string[] | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(currentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  // distpatch for user logout
  const distpatch = useAppDispatch();
  
  if (role !== undefined) {
    if (!role.includes((user as TUser)?.role)) {
      distpatch(logout());
      return <Navigate to="/auth/login" replace={true} />;
    }
  }

  // if token not found
  if (!token) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
