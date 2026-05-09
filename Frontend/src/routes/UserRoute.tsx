import { Route } from "react-router-dom";
import UserFeaturePage from "../pages/user/UserFeaturePage";
import UserLoginPage from "../pages/user/Login";

const UserRoutes = (
    <>
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user" element={<UserFeaturePage />} />
    </>
);

export default UserRoutes;