import axiosInstance from "./axios";

interface createPayload {
    name: string;
    email: string;
    password: string;
}

export const createUser = async (payload: createPayload) => {
    const response = await axiosInstance.post(
        "auth/user-signup",
        payload
    );

    return response.data;
};

export const fetchOrgUsers = async (orgId: string) => {
    const response = await axiosInstance.get(`user/organaisation-user/${orgId}`);

    return response.data.data;
}

export const fetchUser = async (userId: string) => {
    const response = await axiosInstance.get(`user/${userId}`);

    return response.data;
}
