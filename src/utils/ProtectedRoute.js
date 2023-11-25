import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const token = cookies.token;

  let location = useLocation();

  if (!token) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
  return children;
};

export default ProtectedRoute;
