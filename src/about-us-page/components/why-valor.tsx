"use client";

import Container from "@/components/layout/container";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhyValorImage from "@/assets/why-valor-3.png";
import Image from "next/image";

const WhyValor = () => {
  return (
    <div className="bg-white pt-[10px] md:pt-[80px] overflow-hidden">
      <Container className="px-0 sm:px-5">
        <motion.div
          className="sm:mt-24 flex flex-col lg:flex-row items-start gap-0 sm:gap-10 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Phone mockup placeholder */}
          <div className="flex-1 px-5 sm:px-0 pt-5 sm:pt-0">
            <div className="">
              {/* Phone image placeholder - add your image here */}
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
                Why Valor
              </h2>
              <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] sm:mb-10">
                At Valor, we’ve streamlined the car rental process across
                Africa, offering a seamless experience and the best prices. Our
                app goes beyond just rentals—by vetting drivers, we ensure
                safety and security for all users.
              </p>
            </div>
          </div>

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
            <div className="flex items-start sm:items-center justify-center sm:justify-start">
              <Image
                src={WhyValorImage}
                alt="Why Valor"
                width={500}
                className="object-contain sm:rounded-[36px] w-fit h-[400px]"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default WhyValor;
