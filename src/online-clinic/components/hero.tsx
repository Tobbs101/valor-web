"use client";
import React from "react";
import { motion } from "framer-motion";
import background from "@/assets/images/online_clinic.jpeg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CountdownToSaturday from "./countdown";

const lines = ["Online Clinics: Personalized Support", "for Exam Success!"];

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

const secondLetterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05 + 2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const AnimatedText = () => {
  return (
    <div className="text-center z-[2]">
      {lines.map((line, lineIndex) => (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            delay: 0 + lineIndex / 5,
            duration: 0.5,
            ease: "easeOut",
          }}
          key={lineIndex}
          className=""
        >
          {line.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              // variants={lineIndex === 0 ? letterVariants : secondLetterVariants}
              // initial="hidden"
              // animate="visible"
              className=" text-white font-[700]"
              style={{
                fontSize: "clamp(1.2rem, 5vw, 5rem)",
                lineHeight: "clamp(1.8rem, 6.5vw, 5rem)",
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
  const router = useRouter();
  return (
    <div className="w-full relative h-[600px] overflow-hidden flex items-center justify-center flex-col">
      <AnimatedText />
      <motion.p
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="z-[2] text-center max-w-[90%] lg:max-w-[50%] mx-auto text-white mt-5 text-sm md:text-xl font-[500]"
      >
        Guidance and expert advice to help you conquer your academic challenges.
      </motion.p>
      <motion.div
        initial={{ y: "0%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Image src={background} alt="" className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        initial={{ y: "0%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 bg-black/60 z-[1] w-full h-full"
      />
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className=" mt-10 mx-auto  w-full z-[1] h-fit flex items-center justify-center flex-col"
      >
        {/* <Button
          onClick={() =>
            window.open(
              "https://courses.limitbreakers.co.uk/users/sign_in",
              "_blank"
            )
          }
          className="px-7 w-fit font-semibold border hover:bg-gray-100 border-gray-100 hover:text-black bg-white text-black h-[50px] duration-200"
        >
          Book a Session Today
        </Button> */}
        {/* <CountdownToSaturday /> */}
      </motion.div>
    </div>
  );
};

export default Hero;
