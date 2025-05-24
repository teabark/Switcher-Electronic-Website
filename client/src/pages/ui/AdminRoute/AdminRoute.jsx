//Meant to p// components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, isAuthenticated}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.email === 'denzel@gmail.com';

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
