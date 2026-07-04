import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const researchCompany = async (query) => {
  const response = await API.post("/research", {
    query,
  });

  return response.data;
};