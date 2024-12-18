import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const value = localStorage.getItem('token');

    return value ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute