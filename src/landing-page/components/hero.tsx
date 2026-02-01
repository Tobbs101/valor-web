"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import background from "@/assets/valor-hero.jpg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Each from "@/components/helpers/each";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AnimatedBtn from "@/components/ui/animated-btn";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/container";

const lines = ["Hire any car with ease"];

// const lines = ["Windcrest Pediatric", "Dentistry"];

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// const secondLetterVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.05 + 1.5,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   }),
// };

const AnimatedText = () => {
  return (
    <div className="text-center z-[2] max-w-[90%] w-full mx-auto mb-5">
      {lines.map((line, lineIndex) => (
        <motion.div key={lineIndex} className="">
          {line.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-white font-[500]"
              style={{
                fontSize: "clamp(2rem, 5vw, 5rem)", // Increased minimum size from 1.5rem to 2rem
                lineHeight: "clamp(2.2rem, 5vw, 8rem)", // Increased minimum line height for better proportion
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

  const [search, setSearch] = useState("");

  const [searchType, setSearchType] = useState("");

  return (
    <div className="w-full relative lg:h-screen-minus-82 py-5 lg:py-0 overflow-hidden flex items-center justify-center flex-col gap-2">
      <div
        className=" relative py-[50px] flex items-center justify-center flex-col rounded-[30px] h-[600px] lg:h-[94%] w-[95%] md:w-[97.5%] mx-auto bg-cover"
        style={{
          backgroundImage: `url(${(background as any).src ?? background})`,
          // filter: "brightness(0.6)",
        }}
      >
        <AnimatedText />

        <motion.p
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
          className=" text-white w-full leading-[20px] md:leading-[30px] text-center max-w-[98%] mx-auto text-sm md:text-[24px] font-[400]"
        >
          Book from a variety of vetted hosts and make payment securely using
          our platform.
        </motion.p>

        {/* <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-0 z-[-1] left-0 w-full h-full"
        >
          <Image
            src={background}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div> */}
        {/* <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute rounded-[30px] top-0 left-0 bg-black/30 z-[1] w-full h-full"
        /> */}

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
          className="mt-5 lg:mt-7 w-[90%] max-w-[900px] mx-auto z-[1] p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-3 rounded-full shadow-xl bg-white"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 w-full">
            {/* Location Select */}
            <Select
              value={searchType}
              onValueChange={(value: string) => setSearchType(value)}
            >
              <SelectTrigger className="w-full sm:flex-1 h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-5 pr-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lagos" className="text-sm">
                  Lagos
                </SelectItem>
                <SelectItem value="abuja" className="text-sm">
                  Abuja
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Date Select */}
            <Select>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-5 pr-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today" className="text-sm">
                  Today
                </SelectItem>
                <SelectItem value="tomorrow" className="text-sm">
                  Tomorrow
                </SelectItem>
                <SelectItem value="this-week" className="text-sm">
                  This Week
                </SelectItem>
                <SelectItem value="next-week" className="text-sm">
                  Next Week
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => {
              if (searchType === "schools")
                return router.push(`schools?search=${search}`);

              if (searchType === "county")
                return router.push(
                  `local-education-authority?search=${search}`,
                );
            }}
            className="h-[50px] rounded-full px-[50px] bg-primary text-white hover:bg-primary/90 duration-200 w-full sm:w-auto"
          >
            Search
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          className="max-w-[90%] w-full flex items-center justify-center mx-auto mt-[50px]"
        >
          <button
            className={cn(
              "duration-300 text-[14px] gap-1 font-[700] flex items-center justify-center outline-none bg-white rounded-[300px] text-primary focus:ring-0 focus-visible:ring-0 cursor-pointer px-10 py-4",
            )}
          >
            Get Bids From Hosts <ArrowRight className="mt-[2px]" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
