"use client";

import Container from "@/components/layout/container";
import React from "react";
import Image from "next/image";
import HowItWorks from "@/assets/report-bug.png";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HowToBecomeAHost = () => {
  return (
    <div className="bg-white pt-[50px] md:pt-[80px] overflow-hidden">
      <Container className="px-5">
        <motion.div
          className="mt-24 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Phone mockup placeholder */}
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
            <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
              How To Become A Valor Host
            </h2>
            <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] mb-10">
              Listing your car on Valor is easy! Follow these steps to get
              started:
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
                      Sign Up
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Create an account and register as a host on the Valor app.
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
                      List Your Car
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Provide details about your vehicle, upload photos, and set
                      your rental rates and availability.
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
                      Get Verified
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Complete the verification process to ensure a safe and
                      secure platform for all users.
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
                      Accept Bookings
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Review and accept booking requests from potential
                      customers.
                    </p>
                  </div>
                </motion.div>

                {/* Step 5 */}
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
                      Earn Money
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Once the car is rented out, sit back, relax, and watch
                      your earnings grow.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HowToBecomeAHost;
