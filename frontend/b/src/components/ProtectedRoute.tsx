import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Updated path

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}