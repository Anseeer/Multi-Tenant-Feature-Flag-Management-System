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

export const fetchUsers = async (id: string) => {
    const response = await axiosInstance.get(`user/organaisation-user/${id}`);

    return response.data.data;
}
