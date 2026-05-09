import axiosInstance from "./axios";

interface createPayload {
    name: string;
    createdAt: Date;
}

export const createFeature = async (payload: createPayload) => {
    const response = await axiosInstance.post(
        "feature/",
        payload
    );

    return response.data;
};

export const fetchFeatures = async () => {
    const response = await axiosInstance.get('feature/', {});
    return response.data.data;
}

export const toggleFeature = async (id: string) => {
    const response = await axiosInstance.patch(`/feature/${id}`);
    return response.data;
}

export const editFeature = async (id: string, name: string, isEnable: boolean) => {
    const response = await axiosInstance.put(`/feature/`, { id, name, isEnable });
    return response.data.data;
}

export const removeFeature = async (id: string) => {
    const response = await axiosInstance.delete(`/feature/${id}`);
    return response.data;
}

