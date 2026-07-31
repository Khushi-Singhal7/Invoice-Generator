import api from "../api/api.js";

export const saveCompany = async (company) => {
    const response = await api.post("/company", company);
    return response.data;
};

export const getCompanies = async () => {
    const response = await api.get("/company");
    return response.data;
};

export const getCompanyById = async (id) => {
    const response = await api.get(`/company/${id}`);
    return response.data;
};

export const updateCompany = async (id, company) => {
    const response = await api.put(`/company/${id}`, company);
    return response.data;
};

export const deleteCompany = async (id) => {
    await api.delete(`/company/${id}`);
};