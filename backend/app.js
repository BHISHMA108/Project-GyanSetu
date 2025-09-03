const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chalisaRoutes = require("./routes/chalisaRoutes.js");
const podcastRoutes = require("./routes/podcastRoutes.js");
const songRoutes = require("./routes/songRoutes.js");
const storyRoutes = require("./routes/storyRoute.js");
const bodyParser = require("body-parser");
const path = require("path");

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

// Routes
app.use("/api", chalisaRoutes);
app.use("/api", podcastRoutes);
app.use("/api", songRoutes);
app.use("/api", storyRoutes);

// Serve static files (if any)
app.use("/podcasts", express.static(path.join(__dirname, "podcasts")));

// ❌ Don't use app.listen() on Vercel
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
