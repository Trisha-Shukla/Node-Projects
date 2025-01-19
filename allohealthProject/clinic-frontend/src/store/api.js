import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual backend URL

// Queue APIs
export const getQueue = async () => {
  return await axios.get(`${API_BASE_URL}/queue`);
};

export const addToQueue = async (queueData) => {
  return await axios.post(`${API_BASE_URL}/queue`, queueData);
};
