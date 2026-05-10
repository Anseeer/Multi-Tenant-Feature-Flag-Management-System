import axiosInstance from "./axios";

interface createPayload {
    name: string;
    orgId: string;
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

export const fetchFeaturesByOrgId = async (orgId: string) => {
    const response = await axiosInstance.get(`/feature/orgId/${orgId}`);
    return response.data;
}

export const fetchOrganaisationByOrgId = async (orgId: string) => {
    const response = await axiosInstance.get(`/organaisation/orgId/${orgId}`);
    return response.data;
}

