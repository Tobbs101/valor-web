"use client";

import Container from "@/components/layout/container";
import React from "react";
import { motion } from "framer-motion";
import OurStoryImage from "@/assets/our-story-2.png";
import Image from "next/image";

const OurStory = () => {
  return (
    <div className="bg-white pt-[10px] md:pt-[80px] overflow-hidden">
      <Container className="px-0 sm:px-5">
        <motion.div
          className="sm:mt-24 flex flex-col-reverse lg:flex-row items-start sm:gap-10 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Right side - How it works content */}
          <motion.div
            className="flex-1"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <div className="flex items-center justify-center sm:justify-end">
              <Image
                src={OurStoryImage}
                alt="Our Story"
                width={500}
                className="object-contain sm:rounded-[36px] w-fit h-[400px]"
              />
            </div>
          </motion.div>

          {/* Left side - Phone mockup placeholder */}
          <div className="flex-1 px-5 sm:px-0 pt-5 sm:pt-0">
            <div className="">
              {/* Phone image placeholder - add your image here */}
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
                Our Story
              </h2>
              <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] sm:mb-10">
                Founded in 2021, Valor was born from our drive to challenge the
                status quo and create a better way for car rentals and
                ridesharing in Nigeria. As customer satisfaction declined and
                prices soared, we developed a platform designed to address these
                challenges, offering a more reliable, affordable, and
                user-friendly solution.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default OurStory;
