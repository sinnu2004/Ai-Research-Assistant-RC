import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const researchCompany = async (query) => {
  const response = await API.post("/research", {
    query,
  });

  return response.data;
};