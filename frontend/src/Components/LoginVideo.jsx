import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginVideo.css";

const LoginVideo = ({ setShowVideo }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setFadeOut(true);
      setTimeout(() => {
        setShowVideo(false);
        navigate("/religionselector");
      }, 1500);
    };

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [navigate, setShowVideo]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black">
      <div className="flex md:hidden absolute inset-0 items-center justify-center bg-black text-orange-500 text-2xl font-bold animate-pulse">
        Loading...
      </div>

      <div
        className={`back hidden md:flex ${
          fadeOut ? "fade-out" : ""
        } w-full h-full`}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          preload="auto"
          className="w-screen h-screen object-cover"
        >
          <source src="https://res.cloudinary.com/dst3yuj1w/video/upload/v1772706111/Latest_crfpjo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default LoginVideo;
