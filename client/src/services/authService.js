import api from "../api/api";

export const login = async (data) => {
  const response = await api.post("/auth/login", data);

  localStorage.setItem("token", response.data.token);

  localStorage.setItem(
    "user",
    JSON.stringify({
      name: response.data.name,
      email: response.data.email,
    })
  );

  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};