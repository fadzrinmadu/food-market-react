import * as React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const GuardRoute = ({ children }) => {
  let { user } = useSelector(state => state.auth);
  return user ? children : <Navigate to="/login" />;
};

export default GuardRoute;
