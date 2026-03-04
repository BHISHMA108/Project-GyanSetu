// geminiAPI.js
// src/utils/geminiAPI.js
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://gyansetu-backend-latest.onrender.com";

export const generateStoryWithGemini = async (
  finalPrompt,
  language = "english",
  religion = "",
) => {
  try {
    const response = await fetch(`${API_URL}/api/generate-story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: finalPrompt,
        language,
        religion,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Frontend fetch error:", error);
    return { success: false, error: "Request failed" };
  }
};
