const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");

const chalisaRoutes = require("./routes/chalisaRoutes.js");
const podcastRoutes = require("./routes/podcastRoutes.js");
const songRoutes = require("./routes/songRoutes.js");
const storyRoutes = require("./routes/storyRoute.js");
const chatbotRoutes = require("./routes/chatRoutes.js");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://project-gyan-setu-three.vercel.app", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors()); // handle preflight

// Routes
app.use("/api", chalisaRoutes);
app.use("/api", podcastRoutes);
app.use("/api", songRoutes);
app.use("/api", storyRoutes);
app.use("/api", chatbotRoutes);

// Serve static files
app.use("/podcasts", express.static(path.join(__dirname, "podcasts")));

// Export for Vercel
module.exports = app;
