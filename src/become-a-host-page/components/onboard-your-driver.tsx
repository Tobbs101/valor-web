"use client";

import Container from "@/components/layout/container";
import React from "react";
import Image from "next/image";
import HowItWorks from "@/assets/327shots.png";
import { motion, AnimatePresence } from "framer-motion";

const OnboardYourDriver = () => {
  return (
    <div className="bg-white pt-[50px] md:pt-[80px] overflow-hidden">
      <Container className="px-5">
        <motion.div
          className="mt-24 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - How it works content */}
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
            <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
              How To Onboard Your Driver
            </h2>
            <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] mb-10">
              Onboard your drivers on the Valor platform so they can complete
              trips on your behalf.
            </p>

            {/* Steps - Timeline */}
            <div className="relative">
              {/* Vertical dashed line */}
              <div className="absolute left-[5px] top-[12px] bottom-[12px] w-[2px] border-l-2 border-dashed border-[#88CAEE]"></div>

              <div className="space-y-10">
                {/* Step 1 */}
                <motion.div
                  className="flex gap-6 relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.4 },
                    },
                  }}
                >
                  <div className="flex-shrink-0 mt-1 z-10">
                    <div className="w-[12px] h-[12px] bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                      Navigate to the fleet page
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      While on the app, navigate to the fleet page, then select
                      the drivers tab.
                    </p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  className="flex gap-6 relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3, duration: 0.4 },
                    },
                  }}
                >
                  <div className="flex-shrink-0 mt-1 z-10">
                    <div className="w-[12px] h-[12px] bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                      Click on the Add(+) button
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      When on the drivers tab, click on the add button to input
                      driver’s info, and valid ID card.
                    </p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  className="flex gap-6 relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.4, duration: 0.4 },
                    },
                  }}
                >
                  <div className="flex-shrink-0 mt-1 z-10">
                    <div className="w-[12px] h-[12px] bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                      Assign a Vehicle to driver
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Once the driver has been created and approved, you can
                      assign a driver to a vehicle, and to a booked job.
                    </p>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  className="flex gap-6 relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.5, duration: 0.4 },
                    },
                  }}
                >
                  <div className="flex-shrink-0 mt-1 z-10">
                    <div className="w-[12px] h-[12px] bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                      Driver downloads mobile app
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      After account creation, the driver must download the Valor
                      Driver mobile app to complete trips. The driver should log
                      in using the email address and phone number added by the
                      host during onboarding.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Phone mockup placeholder */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className=" w-full max-w-[450px] overflow-hidden min-h-[600px] bg-[#EEF9FF] rounded-[30px] flex items-center justify-center">
              {/* Phone image placeholder - add your image here */}
              <div className="flex items-center justify-center text-[#646464]">
                {/* Add phone image here */}
                <Image
                  priority
                  src={HowItWorks}
                  alt="How it works"
                  width={687.175537109375}
                  height={858.375}
                  className="object-cover w-[687.175537109375px] h-[858.375px]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default OnboardYourDriver;
