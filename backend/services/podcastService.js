const { GoogleGenerativeAI } = require("@google/generative-ai");
const textToSpeech = require("@google-cloud/text-to-speech"); // Corrected import
const fs = require("fs");
const path = require("path");
const util = require("util");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const ttsClient = new textToSpeech.TextToSpeechClient(); // Google Cloud TTS Client

// Function to generate podcast script using Gemini
exports.generatePodcastScript = async (topic) => {
  console.log(topic);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent(`
Generate a detailed podcast script on "${topic}".

Formatting Rules (IMPORTANT):
- Return plain text only.
- Do NOT use bullet points.
- Do NOT use markdown.
- Do NOT use bold text or symbols like *, -, or #.
- Do NOT use section headings.
- Write in clean conversational dialogue format only.
- Each new line must begin with either "Host:" or "Guest:".
- Keep spacing clean with one line break between each dialogue.

Structure:
1. Host gives a warm introduction.
2. Guest responds.
3. Host asks thoughtful questions.
4. Guest gives deep, insightful answers.
5. End with Guest summarizing and giving practical takeaways.
and keep space after each dialogue.
start host and guest dialogue with "Host:" and "Guest:" respectively on new lines.

Return only the script.
`);
    console.log(response);
    const script = response.response.text();
    console.log(script);

    return script || "No response generated.";
  } catch (error) {
    console.error("Error generating podcast script:", error);
    return null;
  }
};
