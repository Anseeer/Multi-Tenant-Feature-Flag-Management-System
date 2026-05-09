import axiosInstance from "./axios";

interface LoginPayload {
    email: string;
    password: string;
}

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    orgId: string;
}

export const loginSuperAdmin = async (payload: LoginPayload) => {
    const response = await axiosInstance.post(
        "/auth/super-admin-login",
        payload
    );

    return response.data;
};

export const loginAdmin = async (payload: LoginPayload) => {
    const response = await axiosInstance.post(
        "/auth/admin-login",
        payload
    );

    return response.data;
};

export const signupAdmin = async (payload: SignupPayload) => {
    const response = await axiosInstance.post(
        "/auth/admin-signup",
        payload
    );

    return response.data;
};

export const logout = async () => {
    return await axiosInstance.get('/auth/logout', {});
}