import axiosInstance from "./axios";

interface LoginPayload {
    email: string;
    password: string;
}

export const loginSuperAdmin = async (payload: LoginPayload) => {
    const response = await axiosInstance.post(
        "/auth/super-admin-login",
        payload
    );

    return response.data;
};