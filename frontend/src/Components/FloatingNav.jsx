"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingNav = ({ toggleCalendar }) => {
  const navigate = useNavigate();

  return (
    <div
className=" fixed hidden lg:block text-2xl md:text-[15px] top-4 left-1/4 right-1/4 z-[999] 
           bg-blue-300 shadow-md rounded-[51px] 
           items-center justify-center px-6 py-3"

    >
      <div className="flex justify-around items-center gap-6 flex-wrap">
        <button
          className="px-3 py-2 text-black hover:text-black hover:bg-blue-400 
                     transition ease-in-out hover:scale-[1.1] duration-300 rounded-[32px]"
          id="calendar"
          onClick={(e) => {
            e.stopPropagation();
            toggleCalendar();
          }}
        >
          Calendar
        </button>

        <button
          className="px-3 py-2 text-black hover:text-black hover:bg-blue-400 
                     transition ease-in-out hover:scale-[1.1] duration-300 rounded-[32px]"
          id="about"
          onClick={() => navigate("/about")}
        >
          About
        </button>

        <button
      className="px-3 py-2 text-black hover:text-black hover:bg-blue-400 
                     transition ease-in-out hover:scale-[1.1] duration-300 rounded-[32px]"
          id="home"
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button
        className="px-3 py-2 text-black hover:text-black hover:bg-blue-400 
                     transition ease-in-out hover:scale-[1.1] duration-300 rounded-[32px]"
          id="contact"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>

        <button
          className="px-3 py-2 text-black hover:text-black hover:bg-orange-600 
                     transition ease-in-out hover:scale-[1.1] duration-300 hover:font-bold hover:border-2 rounded-[32px]"
          id="login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default FloatingNav;
