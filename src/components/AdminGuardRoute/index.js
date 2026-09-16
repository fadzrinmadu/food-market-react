import * as React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminGuardRoute = ({ children }) => {
  let { user } = useSelector(state => state.auth);

  return user && user.role === 'admin' ? children : <Navigate to={user ? '/' : '/login'} />;
};

export default AdminGuardRoute;
