/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React, { useState, useEffect } from "react";
import { LayoutProp } from "@/interfaces";
import { cn } from "@/lib/utils";
import Sidebar from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./header";
import WhatsappWidget from "../custom/whatsapp-widget";
import { usePathname } from "next/navigation";

function PageLayout({
  className,
  children,
  showWhatsapp = true,
  header,
}: LayoutProp) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((state) => !state);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={cn(" relative flex flex-col bg-white", className)}>
      {/* {showWhatsapp ? <WhatsappWidget /> : null} */}

      {header ?? <Header toggleSidebar={toggleSidebar} />}
      <div
        className={cn(
          "w-full mt-[75px] relative dark:bg-[#121212]/95 bg-[#F9FBFF] dark:text-white grow flex flex-col md:flex-row",
          { "mt-0": pathname === "/" },
        )}
      >
        <Sidebar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />

        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-3 left-3 md:bottom-5 md:left-5 z-50 w-[45px] h-[45px] md:w-[60px] md:h-[60px] bg-orange-500 hover:bg-orange-500/80 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

export default PageLayout;
