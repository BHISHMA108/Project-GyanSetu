// MainSidebar.jsx
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};

// SidebarProvider to manage open state
export const SidebarProvider = ({ children, open: openProp, setOpen: setOpenProp }) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen }) => (
  <SidebarProvider open={open} setOpen={setOpen}>{children}</SidebarProvider>
);

export const SidebarBody = ({ className = "", children }) => (
  <>
    <DesktopSidebar className={className}>{children}</DesktopSidebar>
    <MobileSidebar className={className}>{children}</MobileSidebar>
  </>
);

// Desktop Sidebar
export const DesktopSidebar = ({ className, children }) => {
  const { open } = useSidebar();
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className={`hidden md:flex flex-col h-screen bg-neutral-100 dark:bg-neutral-800 shadow-md rounded-2xl overflow-hidden ${className}`}
      animate={{ width: hover || open ? 225 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col flex-1 p-2">{children}</div>
    </motion.div>
  );
};

// Mobile Sidebar
export const MobileSidebar = ({ className, children }) => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="  left-4 z-[999] bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
      >
        
        <IconMenu2 className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
        {/* Fallback text for debugging */}
        <span className="sr-only">Open Menu</span>
      </button>

      {/* Spacer */}
      <div className="h-20" />

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.div
              className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 p-6 z-50 shadow-2xl ${className}`}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
              >
                <IconX className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
                <span className="sr-only">Close Menu</span>
              </button>
              
              <div className="mt-12">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

