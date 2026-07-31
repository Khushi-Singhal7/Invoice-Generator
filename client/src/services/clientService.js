import api from "../api/api";

export const getClients = async () => {
    const response = await api.get("/client");
    return response.data;
};

export const saveClient = async (client) => {
    const response = await api.post("/client", client);
    return response.data;
};

export const updateClient = async (id, client) => {
    const response = await api.put(`/client/${id}`, client);
    return response.data;
};

export const deleteClient = async (id) => {
    const response = await api.delete(`/client/${id}`);
    return response.data;
};

export const getClientById = async (id) => {
    const response = await api.get(`/client/${id}`);
    return response.data;
};