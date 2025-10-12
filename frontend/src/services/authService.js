import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // return the actual response data
  } catch (error) {
    console.error("AuthService Login Error:", error);
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

