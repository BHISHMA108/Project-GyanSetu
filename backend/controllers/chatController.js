// const axios = require("axios");

// exports.chatInputFunction = async (req, res) => {
//   try {
//     const userMessage = req.body.input;

//     if (!userMessage || userMessage.trim() === "") {
//       return res.status(400).json({ error: "No input provided" });
//     }

//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//     const systemPrompt = `You are GyanSetu’s AI Cultural Guide. Your role is to provide respectful, accurate, and educational explanations from the perspectives of Hinduism, Islam, Sikhism, and Christianity. Always answer in a neutral, informative, and culturally sensitive way, without giving personal opinions or comparisons.
//      Share teachings and perspectives as they are understood in each tradition, keeping your answers clear, concise, and balanced.`;

//     const payload = {
//       contents: [
//         {
//           parts: [{ text: systemPrompt + "\nUser question: " + userMessage }]
//         }
//       ]
//     };

//     const response = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-goog-api-key": GEMINI_API_KEY
//         }
//       }
//     );

//     console.log("Gemini raw response:", JSON.stringify(response.data, null, 2));

//     let botReply = "No reply from AI";
//     const candidates = response.data?.candidates;
//     if (candidates && candidates.length > 0) {
//       const firstCandidate = candidates[0];
//       const parts = firstCandidate.content?.parts || [];
//       if (parts.length > 0) {
//         botReply = parts.map((p) => p.text).join("");
//       }
//     }

//     res.status(200).json({ reply: botReply });
//   } catch (error) {
//     console.error(
//       "Error in chatbot backend:",
//       error.response?.data || error.message
//     );
//     res.status(500).json({ error: "Failed to get response from Gemini API" });
//   }
// };

// module.exports = chatInputFunction;

const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const userMessage = req.body.input;
    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({ error: "No input provided" });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY not set" });
    }

    const systemPrompt = `You are GyanSetu’s AI Cultural Guide...`;

    const payload = {
      contents: [
        { parts: [{ text: systemPrompt + "\nUser question: " + userMessage }] }
      ]
    };

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY
        }
      }
    );

    let botReply = "No reply from AI";
    const candidates = response.data?.candidates;
    if (candidates?.length) {
      botReply = candidates[0].content?.parts?.map(p => p.text).join("") || botReply;
    }

    res.status(200).json({ reply: botReply });

  } catch (err) {
    console.error("Error in chatbot backend:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
};
