import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authenticated } = useAppSelector((state) => state.auth);

  if (!authenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}