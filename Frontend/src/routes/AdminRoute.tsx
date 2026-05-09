import { Route } from "react-router-dom";
import OrganizationPage from "../pages/super.admin/OrganaisationPage";
import AdminLoginPage from "../pages/admin/LoginPage";
import AdminDashboardPage from "../pages/admin/Dashboard";
import AdminSignupPage from "../pages/admin/SignupPage";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

const AdminRoutes = (
    <>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/signup" element={<AdminSignupPage />} />
        <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route
                path="organizations"
                element={<OrganizationPage />}
            />
        </Route>
    </>
);

export default AdminRoutes;