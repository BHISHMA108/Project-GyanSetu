const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

const chalisaRoutes = require("./routes/chalisaRoutes.js");
const podcastRoutes = require("./routes/podcastRoutes.js");
const songRoutes = require("./routes/songRoutes.js");
const storyRoutes = require("./routes/storyRoute.js");
const chatbotRoutes = require("./routes/chatRoutes.js");

dotenv.config();
const app = express();

// ✅ CORS middleware
app.use(
  cors({
    origin: ["https://project-gyan-setu-three.vercel.app", "http://localhost:5173"], // your frontend domains
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle all preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api", chalisaRoutes);
app.use("/api", podcastRoutes);
app.use("/api", songRoutes);
app.use("/api", storyRoutes);
app.use("/api", chatbotRoutes);

// Static files
app.use("/podcasts", express.static(path.join(__dirname, "podcasts")));

// ❌ Don't app.listen() on Vercel
module.exports = app;
