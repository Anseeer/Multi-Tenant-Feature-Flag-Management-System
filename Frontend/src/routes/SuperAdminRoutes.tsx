import { Route } from "react-router-dom";
import LoginPage from "../pages/super.admin/LoginPage";
import SuperAdminLayout from "../layouts/SuperAdminLayouts";
import DashboardPage from "../pages/super.admin/DashboardPage";
import OrganizationPage from "../pages/super.admin/OrganaisationPage";
import SuperAdminProtectedRoute from "../components/SuperAdminProtectedRout";


const SuperAdminRoutes = (
    <>
        <Route path="/super-admin/login" element={<LoginPage />} />
        <Route element={<SuperAdminProtectedRoute />}>
            <Route path="/super-admin" element={<SuperAdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route
                    path="organizations"
                    element={<OrganizationPage />}
                />
            </Route>
        </Route>
    </>
);

export default SuperAdminRoutes;