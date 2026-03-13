import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

export const getProducts = async (page: number, limit: number) => {
  const response = await axios.get(API_URL, {
    params: { page, limit },
  });
  return response.data;
};
