import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function GuestOnlyRoute({ children }) {
  let { user } = useSelector(state => state.auth);
  return !user ? children : <Navigate to="/" />;
}
