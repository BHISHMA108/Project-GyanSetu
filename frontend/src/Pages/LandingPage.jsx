import React, { useState } from "react";
import PageTwo from "../Components/PageTwo.jsx";
import OpeningPage from "../Components/OpeningPage.jsx";
import PageTwobottom from "../Components/PageTwobottom.jsx";
import Navbar from "../Components/FloatingNav.jsx";
import { useNavigate } from "react-router-dom";
import CalendarDrawer from "../Components/calender/CalendarDrawer.jsx";
import AltPageTwo from "../Components/AltPageTwo.jsx";
import useIsMediumUp from "../hooks/customhook.jsx"; // place hook in hooks folder

const LandingPage = () => {
  const navigate = useNavigate();
  const [openCalendar, setOpenCalendar] = useState(false);

  const toggleCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  const isMd = useIsMediumUp();

  return (
    <>
      <Navbar toggleCalendar={toggleCalendar} />
      <CalendarDrawer open={openCalendar} onClose={toggleCalendar} />
      <OpeningPage />
      {isMd ? <><PageTwo /><PageTwobottom/></>: <AltPageTwo />}
    </>
  );
};

export default LandingPage;
