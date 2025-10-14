import axios from "axios";

// Use environment variable or fallback to Render-hosted URL
const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api/auth`
  : "https://keyframes.onrender.com/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // return the actual response data
  } catch (error) {
    console.error("AuthService Login Error:", error);
    throw error.response ? error.response.data : { message: "Server error" };
  }
};
