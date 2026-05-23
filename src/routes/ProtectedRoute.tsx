import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({
  children,
}: Props) => {
  const { isLogin } =
    useAuthStore();

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;