import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */

function UserProtectedRoute() {
    const { isAuthenticated } = useSelector(
        (state: any) => state.user
    );

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}

export default UserProtectedRoute;