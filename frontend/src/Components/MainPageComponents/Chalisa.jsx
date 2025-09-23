import React, { useState } from "react";
import { getMeaning } from "../../api.js";
import chalisaData from "../../data/chalisaData.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Chalisa = () => {
  const [language, setLanguage] = useState("hindi");
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const toggleLanguage = (lang) => setLanguage(lang);

  const showMeaning = async (line) => {
    try {
      const data = await getMeaning(line);
      setModalContent(data?.meaning || "Meaning not available.");
    } catch (error) {
      setModalContent("Error fetching meaning. Please try again.");
    }
  };

  const closeModal = () => setModalContent(null);

  return (
    <div className="relative min-h-screen">
      {/* Back Button */}
      <span className="absolute top-4 left-4 flex items-center cursor-pointer z-50">
        <ArrowBackIcon color="primary" fontSize="medium" />
        &nbsp;
        <p
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 hover:underline"
        >
          Go back
        </p>
      </span>

      {/* Main Container */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col items-center p-4"
        style={{ backgroundImage: "url('/Gods Images/Hanumanji.jpg')" }}
      >
        {/* Header */}
        <header className="text-2xl sm:text-3xl md:text-4xl font-bold bg-orange-500 px-6 py-3 rounded-lg shadow-lg text-center w-full max-w-2xl mb-4">
          Hanuman Chalisa
        </header>

        {/* Language Toggle */}
        <div className="flex space-x-3 sm:space-x-4 mb-4">
          {["hindi", "english"].map((lang) => (
            <button
              key={lang}
              className={`px-3 sm:px-4 py-2 text-base sm:text-lg rounded-md transition ${
                language === lang
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => toggleLanguage(lang)}
            >
              {lang === "hindi" ? "हिंदी" : "English"}
            </button>
          ))}
        </div>

        {/* Info Box */}
        <p className="bg-orange-300 text-black p-2 sm:p-3 rounded-lg w-full max-w-2xl text-center text-sm sm:text-base">
          Click on any line to view its meaning.
        </p>

        {/* Chalisa Lines */}
        <div className="w-full max-w-2xl mt-4 space-y-2 sm:space-y-3">
          {chalisaData.map((line, index) => (
            <div
              key={index}
              className="bg-white text-black opacity-70 text-sm sm:text-lg p-2 sm:p-3 rounded-lg text-center cursor-pointer transition hover:bg-orange-500 hover:opacity-100 hover:text-white"
              onClick={() => showMeaning(line.hindi)}
            >
              {language === "hindi" ? line.hindi : line.english}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div
            className="bg-white text-black p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg relative flex flex-col items-center justify-center"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="absolute top-2 right-4 text-red-500 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="w-full text-center">
              <p className="text-base sm:text-lg break-words">{modalContent}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chalisa;
