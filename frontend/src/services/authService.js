import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

// ✅ Register New User
export const registerUser = async (userData) => {
  await axios.post(`${API_URL}/register`, userData);
};

// ✅ Login User
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data; // JWT Token
};
