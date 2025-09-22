// geminiAPI.js
// src/utils/geminiAPI.js

export const generateStoryWithGemini = async (
  finalPrompt,
  language = "english",
  religion = ""
) => {
  try {
    const response = await fetch(" http://localhost:5000/api/generate-story", {
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
