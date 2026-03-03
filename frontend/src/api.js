import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
// const API_URL = "https://gyansetu-backend-latest.onrender.com"; // Backend URL

export const getMeaning = async (verse) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/analyze`,
      { verse },
      { headers: { "Content-Type": "application/json" } },
    );
    // console.log("API Response:", response); // Log the entire response for debugging
    return response.data; // Assuming response contains { meaning: "..." }
  } catch (error) {
    console.error("=== GEMINI FULL ERROR ===");
    console.error(error.response?.data || error.message || error);
    throw error; // <-- IMPORTANT
  }
};
