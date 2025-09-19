const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chalisaRoutes = require("./routes/chalisaRoutes.js");
const podcastRoutes = require("./routes/podcastRoutes.js");
const songRoutes = require("./routes/songRoutes.js");
const storyRoutes = require("./routes/storyRoute.js");
const bodyParser = require("body-parser");
const path = require("path");
const chatbotRoutes = require("./routes/chatRoutes.js");


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://project-gyan-setu-three.vercel.app", // ✅ No trailing slash
    credentials: true,
  })
);


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.input;

  try {
    const response = await axios.post(
      "https://api.gemini.com/v1/chat", // check actual Gemini endpoint
      {
        model: "gemini-1",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Error from Gemini API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
});

// Routes
app.use("/api", chalisaRoutes);
app.use("/api", podcastRoutes);
app.use("/api", songRoutes);
app.use("/api", storyRoutes);
app.use("/api", chatbotRoutes); // optional


// Serve static files (if any)
app.use("/podcasts", express.static(path.join(__dirname, "podcasts")));

// ❌ Don't use app.listen() on Vercel
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
