import React, { useEffect } from "react";
import SidebarDemo from "../Components/sidebar/Sidebar.jsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Ecommerce from "../Components/CristianPageComponents/ChristianParalax.jsx";
import News from "./News.jsx";
import GradientText from "../Components/Bhagwatgita/GradientText.jsx";
import VideoSlider from "../Components/CristianPageComponents/VideoSlider3.jsx";
import ScrollVelocity from "../Components/MainPageComponents/ScrollVelocity.jsx";
import TimeLineDemo3 from "../Components/CristianPageComponents/TimeLineDemo3.jsx";
import AnimatedDropdown from "../Components/MainPageComponents/dropdown.jsx";

function CristianPage() {
  useEffect(() => {
    // Inject Botpress Webchat script dynamically
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src =
      "https://files.bpcontent.cloud/2025/03/06/05/20250306054305-B3UE1L4Z.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      if (script1.parentNode) document.body.removeChild(script1);
      if (script2.parentNode) document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-black
                      py-4 sm:py-2 px-2 flex justify-between items-center">

        {/* Bible Link */}
        <div className="flex flex-row justify-center">
          <a
            href="https://www.biblegateway.com/resources/audio/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <GradientText
              colors={["#FFD700", "#800080", "#FF0000", "#6A0DAD", "#FFD700"]}
              animationSpeed={4.5}
              showBorder={false}
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(1rem, 4vw, 2rem)", // responsive font size
              }}
            >
              Bible
            </GradientText>
          </a>
        </div>

        {/* Icons + Dropdown */}
        <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
          <ShoppingCartIcon className="text-blue-500" fontSize="medium" />
          <FavoriteIcon className="text-red-600" fontSize="medium" />
          <div className="block sm:block">
            <AnimatedDropdown />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-screen mt-[7rem] sm:mt-[6rem] lg:mt-[7.5rem]">
        {/* Sidebar */}
        <div className="z-[90] w-full lg:w-auto">
          <SidebarDemo />
        </div>

        {/* Video Slider */}
        <div className="flex-1 relative z-[50] w-full lg:w-1/2">
          <VideoSlider />
        </div>
      </div>

      {/* Sections */}
      {/* <Ecommerce /> */}
      <News />

      <ScrollVelocity
        texts={["Jesus Loves You", "Amen Amen Amen"]}
        velocity={70}
        className="custom-scroll-text"
        color="red"
      />

      <TimeLineDemo3 />
    </div>
  );
}

export default CristianPage;
