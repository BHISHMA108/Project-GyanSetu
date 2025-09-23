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

// Detect if running in Docker (by checking env variable, optional)
const isDocker = process.env.DOCKER === "true";

// CORS middleware
// app.use(
//   cors({
//     origin: isDocker ? "*" : "https://project-gyan-setu-three.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
app.use(cors({ origin: "*" }));


// Preflight
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

// Start server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
