import { useState } from "react";
import axios from "axios";
import { FaMicrophone, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Podcast = () => {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const topics = [
    "The Essence of Sanatana Dharma",
    "Bhagavad Gita: Lessons for Modern Life",
    "The Four Yogas: Paths to Liberation",
    "Upanishads & Vedanta Simplified",
    "Concept of Karma & Reincarnation",
    "Ramayana & Mahabharata: Life Lessons",
    "The Mystical Stories of Lord Shiva",
    "Significance of Lord Krishna’s Leelas",
    "Goddess Worship in Hinduism",
    "The Many Avatars of Lord Vishnu",
    "Meditation & Mantras in Hinduism",
    "Why Do Hindus Fast?",
    "Sacred Rivers in Hinduism",
    "Hindu Temple Architecture & Its Mysticism",
    "The Science Behind Puja & Yagna",
    "Navratri: The Divine Feminine Energy",
    "Deepavali: Beyond Lights & Fireworks",
    "Mahashivratri: A Night of Transformation",
    "The True Meaning of Holi",
    "Makar Sankranti & the Cosmic Connection",
    "Spiritual Minimalism in Hindu Thought",
    "Ayurveda & Spiritual Well-Being",
    "How Hinduism Views the Afterlife",
    "The Role of Gurus & Satsang",
    "Ancient Hindu Wisdom for Mental Peace",
  ];

  const generatePodcast = async () => {
    if (!topic) {
      alert("Please select a topic!");
      return;
    }

    setLoading(true);
    setScript("");

    try {
      const response = await axios.post(
        " https://project-gyan-backend.vercel.app/api/generate-podcast",
        { topic }
      );
      setScript(response.data.script);
    } catch (error) {
      console.error("Error generating podcast:", error);
      alert("Failed to generate podcast. Please try again.");
    }

    setLoading(false);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-6 sm:px-6 lg:px-8">
      {/* Back button */}
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition"
      >
        <ArrowBackIcon color="primary" fontSize="medium" />
        <p className="text-blue-400">Go back</p>
      </div>

      {/* Main card */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-gray-900 text-white rounded-2xl shadow-xl">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          🎙️ AI Podcast Generator
        </motion.h1>

        {/* Select dropdown */}
        <motion.div
          className="mt-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg outline-none border border-gray-700 focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select a topic</option>
            {topics.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Generate button */}
        <motion.button
          onClick={generatePodcast}
          disabled={loading}
          className="mt-6 w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaMicrophone />}
          {loading ? "Generating..." : "Generate Podcast"}
        </motion.button>

        {/* Script Output */}
        {script && (
          <motion.div
            className="mt-8 p-6 bg-gray-800 rounded-lg text-left relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              📜 Podcast Script:
            </h3>
            <div className="p-4 bg-red-500 text-white rounded-lg relative leading-relaxed">
              {script}
              {/* little speech bubble pointer */}
              <div className="absolute left-6 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-red-500 border-l-transparent border-r-transparent"></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Podcast;
