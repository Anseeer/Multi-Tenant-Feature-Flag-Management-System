import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */

function SuperAdminProtectedRoute() {
    const { isAuthenticated } = useSelector(
        (state: any) => state.superAdmin
    );

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/super-admin/login" replace />
    );
}

export default SuperAdminProtectedRoute;