"use client";

import React from "react";
import AboutImg from "@/assets/privacy_policy_bg.jpg";
import Image from "next/image";
import { motion } from "framer-motion";

const lines = ["Privacy Policy"];

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05 + 0.5,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const AnimatedText = () => {
  return (
    <div className="text-center z-[2]">
      {lines.map((line, lineIndex) => (
        <motion.div key={lineIndex} className="">
          {line.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className=" text-white font-bold"
              style={{
                fontSize: "clamp(1.5rem, 6vw, 7rem)",
                lineHeight: "clamp(1rem, 5.5vw, 10rem)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-[75px] min-h-[50vh] flex items-center justify-center flex-col gap-5">
      <AnimatedText />
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Image src={AboutImg} className="w-full h-full object-cover" alt="" />
      </motion.div>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 bg-black/60 z-[1] w-full h-full"
      />
    </div>
  );
};

export default Hero;
