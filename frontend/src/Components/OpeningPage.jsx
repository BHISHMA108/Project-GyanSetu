import React, { useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "./OpeningPage.css";
import FloatingNav from "./FloatingNav";
import CalendarDrawer from "../Components/calender/CalendarDrawer.jsx";
import IntroLogo from "./intrologo.jsx";
import { motion } from "framer-motion";


export default function OpeningPage(props) {
    useEffect(() => {
        const scroll = new LocomotiveScroll();
    }, []);
    

    const [openCalendar, setOpenCalendar] = useState(false);
    const toggleCalendar = () => {
        setOpenCalendar((prev) => !prev);
        console.log("Calendar Open:", !openCalendar);
    };
    
    return (
        <div className="Container">
            <FloatingNav toggleCalendar={toggleCalendar} />
            <IntroLogo/>
            <div className="flex flex-col justify-center items-center z-10 absolute">
        <div className="block sm:hidden z-20 bg-transparent flex justify-center">
            <motion.img
                src="https://res.cloudinary.com/dst3yuj1w/image/upload/v1756030168/gyansetu_onm94g.png"
                alt="Gyan Setu Logo"
                className="w-40 h-auto drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                opacity: [0.8, 1, 0.8], // smooth glow
                scale: [0.95, 1.05, 0.95], // gentle pulsing
                filter: [
                    "drop-shadow(0px 0px 5px rgba(59,130,246,0.5))",
                    "drop-shadow(0px 0px 15px rgba(59,130,246,0.8))",
                    "drop-shadow(0px 0px 5px rgba(59,130,246,0.5))",
                ],
                }}
                transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                }}
            />
            </div>
            </div>

            <div className="video">
                <video loop muted autoPlay className="hidden sm:block lg:block z-0" src="https://res.cloudinary.com/dst3yuj1w/video/upload/v1757856802/landingvideo_lfl4zo.mp4"></video>
            </div>
            <CalendarDrawer open={openCalendar} onClose={toggleCalendar} />
            
        </div>
    );
}
