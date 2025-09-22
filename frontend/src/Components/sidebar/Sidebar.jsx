// SidebarDemo.jsx
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "./MainSidebar.jsx";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const SidebarDemo = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setOpen(false);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setOpen(false);
  };

  const links = [
    { label: "Profile", icon: <IconUserBolt className="h-5 w-5 shrink-0" />, route: "/profile" },
    { label: "Dashboard", icon: <IconBrandTabler className="h-5 w-5 shrink-0" />, route: "/dashboard" },
    { label: "AI-Story", icon: <AutoFixHighIcon className="h-5 w-5 shrink-0" />, route: "/story" },
    { label: "Settings", icon: <IconSettings className="h-5 w-5 shrink-0" />, route: "/future" },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="flex flex-col justify-between gap-6 p-4">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <motion.div layout className="mb-4">
            {open ? <Logo /> : <LogoIcon />}
          </motion.div>

          <div className="flex flex-col gap-2 mt-4">
            {links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(link.route)}
                className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:text-blue-500 transition-all p-2 rounded-md"
              >
                {link.icon}
                <span className={`${open ? "inline" : "hidden md:inline"}`}>{link.label}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:text-red-500 transition-all p-2 rounded-md"
            >
              <IconArrowLeft className="h-5 w-5 shrink-0" />
              <span className={`${open ? "inline" : "hidden md:inline"}`}>Logout</span>
            </button>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

// Logo for open sidebar
export const Logo = () => (
  <Link to="#" className="flex items-center space-x-2 text-black dark:text-white">
    <div
      className="h-[50px] w-[50px] rounded-full"
      style={{
        backgroundImage: 'url("/gyansetu.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-orange-400 text-2xl font-semibold dark:text-orange-700"
    >
      GyanSetu
    </motion.span>
  </Link>
);

// Small logo for collapsed sidebar
export const LogoIcon = () => (
  <Link to="#">
    <div
      className="h-10 w-10 rounded-full"
      style={{
        backgroundImage: 'url("/gyansetu.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  </Link>
);

export default SidebarDemo;