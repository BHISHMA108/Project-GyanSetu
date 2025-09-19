const axios = require("axios");

exports.chatInputFunction = async (req, res) => {
  try {
    const userMessage = req.body.input;

    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({ error: "No input provided" });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//     const systemPrompt = `
// You are 💮GyanSetu’s AI Cultural Guide. You must act as an all-rounder guide across religions, giving respectful, accurate, and educational explanations from the perspective of Hinduism, Islam, Sikhism, and Christianity. For every user question, always respond in a neutral, informative, and culturally sensitive tone. 
// Do not provide personal opinions, comparisons, or judgments—only share teachings and perspectives as understood within each tradition. Keep responses concise yet clear, providing context where necessary, and ensure balance and respect for all four religions.
// `;

    const systemPrompt = `You are GyanSetu’s AI Cultural Guide. Your role is to provide respectful, accurate, and educational explanations from the perspectives of Hinduism, Islam, Sikhism, and Christianity. Always answer in a neutral, informative, and culturally sensitive way, without giving personal opinions or comparisons.
     Share teachings and perspectives as they are understood in each tradition, keeping your answers clear, concise, and balanced.`;

    const payload = {
      contents: [
        {
          parts: [{ text: systemPrompt + "\nUser question: " + userMessage }]
        }
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

    console.log("Gemini raw response:", JSON.stringify(response.data, null, 2));

    let botReply = "No reply from AI";
    const candidates = response.data?.candidates;
    if (candidates && candidates.length > 0) {
    const firstCandidate = candidates[0];
    const parts = firstCandidate.content?.parts || [];
    if (parts.length > 0) {
        botReply = parts.map(p => p.text).join("");
    }
    }


    // const MAX_LENGTH = 800;
    // if (botReply.length > MAX_LENGTH) {
    //   botReply = botReply.slice(0, MAX_LENGTH) + "...";
    // }

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Error in chatbot backend:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
};



// const chatInputfucntion = async (req , res)=>{
//     try{    console.log("We are backend for chatbot");
//     console.log("The data from the chat bot is "+ JSON.stringify(req.body));

//     res.status(200).json({
//         message: "We have got the input",
//         data: req.body
//     })
//     }catch(e){
//         console.log("Error in chatBot backend " + e);
//         }
// }

// export default chatInputfucntion;