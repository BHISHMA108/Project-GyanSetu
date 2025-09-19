import { useEffect } from "react";
import SidebarDemo from "../Components/sidebar/Sidebar.jsx";
import ChatBot from "./ChatBot.js"
import MusicCardContainer from "./MainPageComponents/MusicCardContainer.jsx";
import GradientText from "./Bhagwatgita/GradientText.jsx";
import VideoSlider from "../Components/MainPageComponents/VideoSlider.jsx";
import ScrollVelocity from "./MainPageComponents/ScrollVelocity.jsx";
import TimeLineDemo from "./Timeline/TimeLineDemo.jsx";
import News from "../Pages/News.jsx";
import AnimatedDropdown from "./MainPageComponents/dropdown.jsx";

function MainPage() {
  console.log("MainPage component loaded!");

  useEffect(() => {
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
      <ChatBot/>
      <div
        className="fixed top-0 left-0 w-full z-[100] bg-black
                py-4 sm:py-2 px-2 flex justify-between items-center"
      >
        {/* BhagwatGita Link */}
        <div className="flex flex-row justify-center">
          <a
            href="https://bhagavadgita.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <GradientText
              colors={["#ffba08", "#d00000", "#ffba08", "#d00000", "#ffba08"]}
              animationSpeed={4.5}
              showBorder={false}
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(1rem, 4vw, 2rem)", // responsive font size
              }}
            >
              BhagwatGita
            </GradientText>
          </a>
        </div>

        {/* Icons + Dropdown */}
        <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
          <div className="block sm:block">
            <AnimatedDropdown />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-screen mt-30">
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
        texts={["ॐ नमः शिवाय", "राम राम राम"]}
        velocity={70}
        className="custom-scroll-text"
        color="orange-red"
      />

      <MusicCardContainer />
      <TimeLineDemo />
    </div>
  );
}

export default MainPage;
