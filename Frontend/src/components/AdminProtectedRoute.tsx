import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */

function AdminProtectedRoute() {
    const { isAuthenticated } = useSelector(
        (state: any) => state.admin
    );

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" replace />
    );
}

export default AdminProtectedRoute;