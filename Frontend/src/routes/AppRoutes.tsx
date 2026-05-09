import { Routes, Route } from "react-router-dom";
import SuperAdminRoutes from "./SuperAdminRoutes";
import AdminRoutes from "./AdminRoute";
import UserRoutes from "./UserRoute";

function AppRoutes() {
    return (
        <Routes>
            {SuperAdminRoutes}
            {AdminRoutes}
            {UserRoutes}
            <Route
                path="*"
                element={<h1>404 Page Not Found</h1>}
            />
        </Routes>
    );
}

export default AppRoutes;