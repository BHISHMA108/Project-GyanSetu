const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const chalisaRoutes = require("./routes/chalisaRoutes.js");
const podcastRoutes = require("./routes/podcastRoutes.js");
const songRoutes = require("./routes/songRoutes.js");
const storyRoutes = require("./routes/storyRoute.js");
const chatbotRoutes = require("./routes/chatRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();
const app = express();

/* ==============================
   ✅ CORS CONFIG (ONLY ONE)
============================== */

// const allowedOrigins = [
//   "https://gyansetu-frontend-latest.onrender.com",
//   "https://project-gyan-setu-three.vercel.app",
//   "http://localhost:5173",
//   "http://localhost:3000",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) return callback(null, true);
//     return callback(null, false);
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(cors({
  origin: true,
  credentials: true
}));

app.options("*", (req, res) => {
  res.sendStatus(200);
});
/* ==============================
   ✅ MIDDLEWARE
============================== */

app.use(express.json());
app.use(bodyParser.json());

/* ==============================
   ✅ ROUTES
============================== */

app.use("/api", chalisaRoutes);
app.use("/api", podcastRoutes);
app.use("/api", songRoutes);
app.use("/api", storyRoutes);
app.use("/api", chatbotRoutes);
app.use("/api", userRoutes);

/* ==============================
   ✅ STATIC FILES
============================== */

app.use("/podcasts", express.static(path.join(__dirname, "podcasts")));

/* ==============================
   ✅ START SERVER
============================== */

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("💗 🔱 Connected to MongoDB 🔱 💗"))
    .catch((err) => console.error(" MongoDB connection error:", err));

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`💗 Server running on port ${PORT}`);
  });
}

module.exports = app;
