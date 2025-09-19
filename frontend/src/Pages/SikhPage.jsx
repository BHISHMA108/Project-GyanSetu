import React, { useEffect } from "react";
import SidebarDemo from "../Components/sidebar/Sidebar.jsx";
import ChatBot from "../Components/ChatBot.jsx";
import News from "./News.jsx";
import VideoSlider from "../Components/SikhPageComponents/VideoSlider2.jsx";
import GradientText from "../Components/Bhagwatgita/GradientText.jsx";
import ScrollVelocity from "../Components/MainPageComponents/ScrollVelocity.jsx";
import TimeLineDemo2 from "../Components/SikhPageComponents/TimeLineDemo2.jsx";
import AnimatedDropdown from "../Components/MainPageComponents/dropdown.jsx";

function SikhPage() {

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header Section */}
      <div
        className="fixed top-0 left-0 w-full z-[100] bg-black 
                      py-4 sm:py-2 px-2 flex justify-between items-center"
      >
        {/* Guru Granth Sahib Link */}
        <div className="flex flex-row items-center">
          <GradientText
            colors={["#FFA500", "#002366", "#FFFFFF", "#FFA500", "#002366"]}
            animationSpeed={4.5}
            showBorder={false}
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1rem, 4vw, 2rem)", // responsive font size
            }}
          >
            <a
              href="https://www.searchgurbani.com/guru-granth-sahib/ang-by-ang"
              target="_blank"
              rel="noopener noreferrer"
            >
              GurugranthSahib
            </a>
          </GradientText>
        </div>

        {/* Icons + Dropdown */}
        <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
          <div>
            <AnimatedDropdown />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-screen mt-28">
        {/* Sidebar */}
        <div className="z-[90] w-full lg:w-auto">
          <SidebarDemo />
        </div>

        <ChatBot/>

        {/* Video Slider */}
        <div className="flex-1 relative z-[50] w-full lg:w-1/2">
          <VideoSlider />
        </div>
      </div>

      {/* Sections */}
      {/* <Sikh /> */}
      <News />

      <ScrollVelocity
        texts={["ਸਤਿਨਾਮ ਵਾਹਿਗੁਰੂ", "ੴ ਇਕ ਓਅੰਕਾਰ"]}
        velocity={70}
        className="custom-scroll-text"
        color="Gold"
      />

      <TimeLineDemo2 />
    </div>
  );
}

export default SikhPage;
