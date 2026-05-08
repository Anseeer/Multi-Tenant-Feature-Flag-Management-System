import { Routes, Route } from "react-router-dom";
import SuperAdminRoutes from "./SuperAdminRoutes";

function AppRoutes() {
    return (
        <Routes>
            {SuperAdminRoutes}

            <Route
                path="*"
                element={<h1>404 Page Not Found</h1>}
            />
        </Routes>
    );
}

export default AppRoutes;