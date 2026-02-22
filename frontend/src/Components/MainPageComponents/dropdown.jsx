"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnimatedDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    "Explore Hindu Religion",
    "Explore Muslim Religion",
    "Explore Sikh Religion",
    "Explore Christian Religion",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    if (item === "Explore Hindu Religion") navigate("/main");
    else if (item === "Explore Muslim Religion") navigate("/muslim");
    else if (item === "Explore Sikh Religion") navigate("/sikh");
    else if (item === "Explore Christian Religion") navigate("/christian");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-[220px] sm:w-[250px] ml-2 sm:ml-6">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center px-3 sm:px-4 py-2 
                   text-sm sm:text-base 
                   bg-gradient-to-r from-purple-500 to-indigo-600 
                   text-white rounded-lg shadow-md"
      >
        <span className="truncate text-left">Explore other religions?</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full mt-2 
                       bg-white dark:bg-gray-800 
                       shadow-lg rounded-lg overflow-hidden z-[999]"
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ backgroundColor: "white", color:"black", scale: 1.02 }}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base cursor-pointer 
                           dark:text-white text-black"
                onClick={() => handleSelect(item)}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdown;
