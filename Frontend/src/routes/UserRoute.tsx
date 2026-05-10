import { Route } from "react-router-dom";
import UserFeaturePage from "../pages/user/UserFeaturePage";
import UserLoginPage from "../pages/user/Login";
import UserProtectedRoute from "../components/UserProtectedRoute";

const UserRoutes = (
    <>
        <Route path="/login" element={<UserLoginPage />} />
        <Route element={<UserProtectedRoute />}>
            <Route path="/" element={<UserFeaturePage />} />
        </Route>
    </>
);

export default UserRoutes;