require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const stringSimilarity = require("string-similarity");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const axios = require("axios");



const getMeaning = async (verse) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ Updated model name
        const prompt = `Give me the meaning of this Hanuman Chalisa verse in simple English or hindi if asked in which language: "${verse}"
        `;

        const response = await model.generateContent([prompt]); // ✅ Ensure correct format
        const text = response.response.text(); // ✅ Extract response correctly
        return text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error fetching meaning.";
    }
};



const correctVerse = "जय हनुमान ज्ञान गुण सागर।";

// Function to analyze the user's chant accuracy
const getChantAnalysis = async (userSpeech) => {
    const similarity = stringSimilarity.compareTwoStrings(userSpeech, correctVerse);
    const score = Math.round(similarity * 10);

    let analysisText = "Keep practicing!";
    if (score > 7) analysisText = "Great job! Your chanting is accurate.";
    else if (score > 4) analysisText = "You're getting there! Focus on pronunciation.";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `A user chanted Hanuman Chalisa incorrectly. Their chant: "${userSpeech}". Correct verse: "${correctVerse}". Provide encouragement and feedback.`;
        
        const result = await model.generateContent(prompt);
        analysisText = result.response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
    }

    return { score, analysis: analysisText };
};


// talk to god make chatbot 
const getAIResponse = async (message, god) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ Use correct model name
      const prompt = `A user is talking to ${god}. Their question: "${message}". Respond as if you are ${god}, using a spiritual and knowledgeable tone.`;
  
      const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });

      return result.response.candidates[0].content.parts[0].text; // ✅ Correct response extraction
    } catch (error) {
      console.error("AI Error:", error);
      throw new Error("AI Service unavailable");
    }
  };





const getStoryFromGemini = async (prompt, language, religion = "") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or "gemini-2.5-flash" if you want flash

    const storyPrompt = `
You are a religious storyteller AI. Your job is to generate interesting, engaging, and age-appropriate stories.

Guidelines:
- The story should be **creative** and **engaging** and **brief**.
- The story should be written in **${language}**.
- The story should reflect **${religion || "a neutral/non-religious"}** theme.
- Use the user prompt as the core idea of the story.
- Break the story into clear **paragraphs** separated by **double line breaks (\\n\\n)**.
- Avoid any meta-commentary, summaries, or explanations.
- Return only the story content.

Prompt: ${prompt}
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: storyPrompt }],
        },
      ],
    });

    const generatedText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No story received from Gemini.");
    }

    return generatedText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate story. Please try again later.");
  }
};




module.exports = { getMeaning , getChantAnalysis ,getAIResponse, getStoryFromGemini };


