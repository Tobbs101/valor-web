"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RentalCarService from "@/assets/rental-car-service.svg";

const ExperienceValor = () => {
  return (
    <motion.div
      className="bg-[#023047] mt-[75px] md:mt-[100px] rounded-[20px] overflow-hidden flex flex-col lg:flex-row items-stretch"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Left side - Illustration */}
      <motion.div
        className="flex-1 flex items-end justify-center lg:justify-start"
        variants={{
          hidden: { opacity: 0, x: -30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <Image
          src={RentalCarService}
          alt="Valor Car Rental Service"
          width={500}
          height={400}
          className="w-full max-w-[500px] h-auto object-contain"
        />
      </motion.div>

      {/* Right side - Content */}
      <motion.div
        className="flex-1 flex flex-col justify-center py-12 px-8 lg:px-12 lg:py-16"
        variants={{
          hidden: { opacity: 0, x: 30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
          },
        }}
      >
        <motion.h2
          className="text-[28px] md:text-[40px] font-[700] text-white leading-[36px] md:leading-[50px] mb-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.2 },
            },
          }}
        >
          Ready to experience the Valor difference? Download our app now
        </motion.h2>
        <motion.p
          className="text-[16px] md:text-[20px] text-[#E1E1E1] leading-[24px] mb-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.3 },
            },
          }}
        >
          See a list of our car options that you can pick from
        </motion.p>

        {/* App Store Buttons */}
        <motion.div
          className="flex flex-wrap gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.4 },
            },
          }}
        >
          {/* App Store Button */}
          <a
            href="#"
            className="bg-white rounded-[10px] px-5 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[12px] text-[#646464] leading-tight">
                Download on the
              </span>
              <span className="text-[16px] font-[500] text-black leading-tight">
                App Store
              </span>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="#"
            className="bg-white rounded-[10px] px-5 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#EA4335"
                d="M5.26 3.25L14.05 12l-8.79 8.75c-.5-.4-.76-1-.76-1.75V5c0-.75.26-1.35.76-1.75z"
              />
              <path
                fill="#FBBC04"
                d="M17.48 10.22L14.05 12l3.43 1.78 1.94-1.08c.57-.32.86-.73.86-1.2s-.29-.88-.86-1.2l-1.94-1.08z"
              />
              <path
                fill="#34A853"
                d="M5.26 20.75c.22.15.5.25.85.25.32 0 .68-.1 1.08-.32l9.29-5.18-3.43-1.78-7.79 7.03z"
              />
              <path
                fill="#4285F4"
                d="M16.48 8.5L7.19 3.32C6.79 3.1 6.43 3 6.11 3c-.35 0-.63.1-.85.25L14.05 12l2.43-3.5z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-[12px] text-[#646464] leading-tight">
                GET IT ON
              </span>
              <span className="text-[16px] font-[500] text-black leading-tight">
                Google Play
              </span>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceValor;
