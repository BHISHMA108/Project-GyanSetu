import axios from "axios";

// const API_URL = "https://gyansetu-backend-latest.onrender.com/api/analyze"; // Backend URL

export const getMeaning = async (verse) => {
  try {
    const response = await axios.post(
      "https://gyansetu-backend-latest.onrender.com/api/analyze",
      { verse },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data; // Assuming response contains { meaning: "..." }
  } catch (error) {
    console.error(
      "Error fetching meaning:",
      error.response ? error.response.data : error.message
    );
    return { meaning: "Error fetching meaning. Try again!" };
  }
};
