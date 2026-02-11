"use client";

import Container from "@/components/layout/container";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Highlander from "@/assets/highlander.png";

import SigMotors from "@/assets/sig-motors.png";
import FleetRentals from "@/assets/fleet-rentals.png";
import Shots from "@/assets/Shots.svg";
import TripTracking from "@/assets/trip-tracking.svg";
import HowItWorks from "@/assets/how-it-works.png";
import RentalOptions from "@/assets/rental-options.png";
import ReportBug from "@/assets/report-bug.png";
import Whatsapp from "@/assets/whatsapp.svg";
import Faqs from "@/components/shared/faqs";
import Rafiki from "@/assets/rafiki.svg";
import ExperienceValor from "@/components/shared/experience-valor";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/signup-store";

const AppFeatures = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { resetStore } = useSignupStore();

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };

  const router = useRouter();

  return (
    <div className="bg-white pt-[50px] md:pt-[80px] overflow-hidden">
      <Container className="px-5">
        <motion.h1
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="w-full text-[24px] text-primary md:leading-[56px] mb-2 md:mb-5 md:text-[48px] font-[700] text-center"
        >
          App Features
        </motion.h1>
        <motion.p
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={descriptionVariants}
          className=" text-[14px] text-center text-[#535353] leading-[20px] md:leading-[24px] md:text-[20px] font-[400] md:text-base"
        >
          Here are some unique features and advantages of using the Valor app.
        </motion.p>

        {/* Safe Transactions Section */}
        <motion.div
          className="mt-8 md:mt-16 flex flex-col lg:flex-row items-center gap-5 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Text content */}
          <motion.div
            className="flex-1  w-full lg:w-auto"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              },
            }}
          >
            <h2 className="text-[20px] md:text-[40px] font-[700] text-primary leading-[30px] md:leading-[48px] mb-2 md:mb-4">
              Safe transactions
            </h2>
            <p className="text-[14px] font-[400] md:text-[18px] text-[#535353] md:leading-[26px]">
              Payment is made to Valor and will only be released to the Host
              once the job has been successfully completed.
            </p>
          </motion.div>

          {/* Right side - Transaction cards */}
          <div className="flex-1 flex items-center justify-center lg:justify-start">
            <div className="relative w-full max-w-[550px] h-[350px] md:min-h-[420px] flex flex-col items-center justify-center">
              {/* Background container - positioned behind cards */}
              <div className="absolute inset-0 m-auto w-[70%] h-[90%] bg-[#EEF9FF] rounded-[30px] top-8"></div>

              {/* First transaction card - rotated */}
              <motion.div
                className="relative z-10 bg-white rounded-[20px] p-5 flex items-center gap-5 mb-6 border border-[#969696] w-[90%] max-w-[450px]"
                variants={{
                  hidden: { opacity: 0, y: -40, rotate: 0 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotate: -4,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.7,
                    },
                  },
                }}
              >
                <div className="h-[30px] w-[30px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden relative flex-shrink-0 bg-gray-200">
                  <Image
                    src={FleetRentals}
                    alt="Fleet rentals"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] md:text-[18px] font-[700] text-primary truncate">
                    Fleet rentals and logi...
                  </h4>
                  <p className="text-[10px] md:text-[14px] text-[#646464]">
                    Oct 04, 05:45 AM
                  </p>
                </div>
                <div className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] rounded-full bg-[#FFEEE8] flex items-center justify-center flex-shrink-0">
                  <Icon
                    strokeWidth={2}
                    icon="bi:box-arrow-in-down-left"
                    className="text-[#F97316] text-[12px] md:text-xl"
                  />
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[12.64px] md:text-[20px] font-[700] text-primary">
                    +N111.00
                  </p>
                  <p className="text-[9.03px] md:text-[13px] text-[#757575]">
                    On job completion
                  </p>
                </div>
              </motion.div>

              {/* Second transaction card */}
              <motion.div
                className="relative z-10 bg-white rounded-[20px] p-5 flex items-center gap-5 border border-[#969696] w-[90%] max-w-[450px]"
                variants={{
                  hidden: { opacity: 0, y: -60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                      delay: 1,
                    },
                  },
                }}
              >
                <div className=" h-[30px] w-[30px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden relative flex-shrink-0 bg-gray-200">
                  <Image
                    src={SigMotors}
                    alt="SIG Motors"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] md:text-[18px] font-[700] text-primary">
                    SIG Motors
                  </h4>
                  <p className="text-[10px] md:text-[14px] text-[#646464]">
                    Oct 22, 06:30 pM
                  </p>
                </div>
                <div className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] rounded-full bg-[#FFEEE8] flex items-center justify-center flex-shrink-0">
                  <Icon
                    strokeWidth={2}
                    icon="bi:box-arrow-in-down-left"
                    className="text-[#F97316] text-[12px] md:text-xl"
                  />
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[12.64px] md:text-[20px] font-[700] text-primary">
                    +N111.00
                  </p>
                  <p className="text-[9.03px] md:text-[13px] text-[#757575]">
                    On job completion
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Verified Vehicles and Hosts Section */}
        <motion.div
          className="mt-24 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Vehicle cards */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px] min-h-[450px] flex items-center justify-center">
              {/* Pink background container */}
              <div className="absolute left-0 top-[10%] w-[85%] h-[80%] bg-[#FDEEED] rounded-[30px]"></div>

              {/* White card with vehicle grid */}
              <motion.div
                className="relative w-full overflow-x-auto z-10 bg-white rounded-[20px] p-5 shadow-lg border border-[#969696] ml-auto"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.2,
                    },
                  },
                }}
              >
                <div className="flex flex-wrap gap-4">
                  {/* Vehicle Card 1 */}
                  <motion.div
                    className="min-w-[180px] flex-1 border border-[#F4F4F4] rounded-xl"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.3, duration: 0.4 },
                      },
                    }}
                  >
                    <div className="relative h-[150px] md:h-[130px] rounded-t-[12px] overflow-hidden">
                      <Image
                        src={Highlander}
                        alt="Toyota Highlander"
                        fill
                        priority
                        className="object-cover"
                      />
                      <button className="absolute top-2 right-2 w-[30px] h-[30px] bg-primary rounded-full flex items-center justify-center">
                        <Icon
                          icon="mdi:heart-outline"
                          className="text-white text-sm"
                        />
                      </button>
                    </div>
                    <div className="p-2">
                      <h4 className="text-[15px] font-[700] text-black mb-1">
                        Toyota Highlander
                      </h4>
                      <p className="text-[13px] text-[#646464] mb-2">
                        From <span className="font-[700] text-black">N57k</span>{" "}
                        /Day
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Icon
                            icon="mdi:navigation-variant"
                            className="text-orange-400 text-[14px]"
                          />
                          <span className="text-[12px] text-[#646464]">
                            Lagos, Nigeria
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] text-[#646464]">
                            4.8
                          </span>
                          <Icon
                            icon="material-symbols:star"
                            className="text-orange-400 text-[14px]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Vehicle Card 2 */}
                  <motion.div
                    className="min-w-[180px] flex-1 border border-[#F4F4F4] rounded-xl"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.4, duration: 0.4 },
                      },
                    }}
                  >
                    <div className="relative h-[150px] md:h-[130px] rounded-t-[12px] overflow-hidden">
                      <Image
                        src={Highlander}
                        alt="Bentley Continental"
                        fill
                        priority
                        className="object-cover"
                      />
                      <button className="absolute top-2 right-2 w-[30px] h-[30px] bg-primary rounded-full flex items-center justify-center">
                        <Icon
                          icon="mdi:heart-outline"
                          className="text-white text-sm"
                        />
                      </button>
                    </div>
                    <div className="p-2">
                      <h4 className="text-[15px] font-[700] text-black mb-1">
                        Bentley Continental
                      </h4>
                      <p className="text-[13px] text-[#646464] mb-2">
                        From <span className="font-[700] text-black">N70k</span>{" "}
                        /Day
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Icon
                            icon="mdi:navigation-variant"
                            className="text-orange-400 text-[14px]"
                          />
                          <span className="text-[12px] text-[#646464]">
                            Lagos, Nigeria
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] text-[#646464]">
                            5.0
                          </span>
                          <Icon
                            icon="material-symbols:star"
                            className="text-orange-400 text-[14px]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Vehicle Card 3 */}
                  <motion.div
                    className="min-w-[180px] flex-1 border border-[#F4F4F4] rounded-xl"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.5, duration: 0.4 },
                      },
                    }}
                  >
                    <div className="relative h-[150px] md:h-[130px] rounded-t-[12px] overflow-hidden">
                      <Image
                        src={Highlander}
                        alt="Bentley EXP 10"
                        fill
                        priority
                        className="object-cover"
                      />
                      <button className="absolute top-2 right-2 w-[30px] h-[30px] bg-primary rounded-full flex items-center justify-center">
                        <Icon
                          icon="mdi:heart-outline"
                          className="text-white text-sm"
                        />
                      </button>
                    </div>
                    <div className="p-2">
                      <h4 className="text-[15px] font-[700] text-black mb-1">
                        Bentley EXP 10
                      </h4>
                      <p className="text-[13px] text-[#646464] mb-2">
                        From <span className="font-[700] text-black">N80k</span>
                        /Day
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Icon
                            icon="mdi:navigation-variant"
                            className="text-orange-400 text-[14px]"
                          />
                          <span className="text-[12px] text-[#646464]">
                            Lagos, Nigeria
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] text-[#646464]">
                            4.9
                          </span>
                          <Icon
                            icon="material-symbols:star"
                            className="text-orange-400 text-[14px]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right side - Text content */}
          <motion.div
            className="flex-1 w-full lg:w-auto"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <h2 className="text-[20px] text-left md:text-[40px] font-[700] text-primary leading-[28px] md:leading-[48px] mb-2 md:mb-4">
              Verified Vehicles and Hosts
            </h2>
            <p className="text-[14px] font-[400] text-left md:text-[18px] text-[#646464] leading-[26px]">
              All vehicles, hosts, and drivers on our platform are fully
              verified.
            </p>
          </motion.div>
        </motion.div>

        {/* Trip Tracking Section */}
        <motion.div
          className="mt-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Text content */}
          <motion.div
            className="flex-1 w-full lg:w-auto"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <h2 className="text-[20px] md:text-[40px] font-[700] text-primary leading-[30px] md:leading-[48px] mb-2 md:mb-4">
              Trip Tracking
            </h2>
            <p className="text-[14px] font-[400] md:text-[18px] text-[#535353] md:leading-[26px]">
              Track your vehicle and driver on trip day for a smooth and
              seamless experience.
            </p>
          </motion.div>

          {/* Right side - Phone mockup */}
          <div className="flex-1 w-full lg:w-auto flex items-center justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] h-[300px] bg-[#EEF9FF] rounded-[30px] flex items-start justify-start">
              {/* Phone mockup - only top half visible */}

              {/* Search bar overlay */}
              <motion.div
                className="border border-[#969696] bg-white rounded-[40px] py-3 px-5 z-[10] w-[80%] absolute top-[60%] left-[10%] flex items-center gap-3 shadow-sm"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.4,
                    },
                  },
                }}
              >
                <Icon
                  icon="mdi:magnify"
                  className="text-[#9CA3AF] text-2xl flex-shrink-0"
                />
                <span className="text-[#9CA3AF] font-[400] text-[14px] flex-1">
                  Enter your location
                </span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-[15px] h-[15px] bg-[#FF8B00] rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-[600]">1</span>
                  </div>
                  <Icon
                    icon="mdi:tune-variant"
                    className="text-[#323232] text-2xl"
                  />
                </div>
              </motion.div>

              <motion.div
                className="h-full absolute w-full top-0% overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.2,
                    },
                  },
                }}
              >
                <Image
                  src={Shots}
                  alt="Valor App - Trip Tracking"
                  width={525}
                  height={339}
                  priority
                  className="object-cover w-[525px] h-[339px]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* How it Works Section */}
        <motion.div
          className="mt-24 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Phone mockup placeholder */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] min-h-[600px] bg-[#EEF9FF] rounded-[30px] flex items-center justify-center">
              {/* Phone image placeholder - add your image here */}
              <div className=" flex items-center justify-center text-[#646464]">
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
              How it works
            </h2>
            <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] mb-10">
              Book from a variety of vetted hosts and make payment securely
              using our platform
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
                      Search for car by city
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Book from a variety of vetted hosts and make payment
                      securely using out platform
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
                      Review vendor listing then send itinerary
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Book from a variety of vetted hosts and make payment
                      securely using out platform
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
                      Vendor accepts trip requests
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Book from a variety of vetted hosts and make payment
                      securely using out platform
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
                      Book
                    </h4>
                    <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                      Book from a variety of vetted hosts and make payment
                      securely using out platform
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Rental Options Section */}
        <motion.div
          className="mt-24 flex flex-col lg:flex-row items-center gap-[40px] lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Rental Options content */}
          <motion.div
            className="flex-1"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <h2 className="text-[20px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-2 md:mb-4">
              Rental Options
            </h2>
            <p className="text-[14px] font-[400] md:text-[18px] text-[#535353] leading-[14px] md:leading-[26px] mb-10">
              See a list of out car options that you can pick from.
            </p>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-8 max-w-[500px]">
              {/* Daily Rentals */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.4 },
                  },
                }}
              >
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-[#E0F2FE] border border-[#E0F2FE] flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:hours-24"
                    className="text-[#0EA5E9] text-2xl"
                  />
                </div>
                <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                  Daily Rentals
                </h4>
                <p className="text-[14px] text-[#646464] leading-[20px] md:leading-[22px]">
                  Book ahead and rent a car for a full day
                </p>
              </motion.div>

              {/* Overnight Rentals */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3, duration: 0.4 },
                  },
                }}
              >
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-[#FEF9C3] border border-[#FEF9C3] flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:clock-outline"
                    className="text-[#EAB308] text-2xl"
                  />
                </div>
                <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                  Overnight Rentals
                </h4>
                <p className="text-[14px] text-[#646464] leading-[20px] md:leading-[22px]">
                  Rent a car overnight
                </p>
              </motion.div>

              {/* Airport Pickup/Drop off */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4, duration: 0.4 },
                  },
                }}
              >
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-[#FECACA] border border-[#FECACA] flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:airplane"
                    className="text-[#EF4444] text-2xl"
                  />
                </div>
                <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                  Airport Pickup/Drop off
                </h4>
                <p className="text-[14px] text-[#646464] leading-[20px] md:leading-[22px]">
                  Hire a vehicle for airport pickup and drip off services
                </p>
              </motion.div>

              {/* Long/Short term leasing */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5, duration: 0.4 },
                  },
                }}
              >
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-[#D1FAE5] border border-[#D1FAE5] flex items-center justify-center mb-4">
                  <Icon
                    icon="mdi:car-outline"
                    className="text-[#10B981] text-2xl"
                  />
                </div>
                <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                  Long/Short term leasing
                </h4>
                <p className="text-[14px] text-[#646464] leading-[20px] md:leading-[22px]">
                  Cars are available to be rented for short term and long term
                  leasing
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Phone mockup placeholder */}
          <div className="flex-1 flex items-center justify-center lg:justify-start">
            <div className="relative w-full flex items-center justify-center">
              {/* Phone image placeholder - add your image here */}
              <Image
                src={RentalOptions}
                alt="Rental Options"
                width={482}
                // height={760}
                priority
                className="w-[482px] h-auto object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* How the Valor App can be used Section */}
        <motion.div
          className="mt-24 lg:block hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Dark header section */}
          <div className=" bg-gradient-to-l h-[600px] from-[#023047] to-[#034a6b] rounded-[30px] pt-12 pb-48 px-8 md:px-12">
            <motion.h2
              className="text-[32px] md:text-[40px] font-[700] text-white leading-[40px] md:leading-[48px]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
            >
              How the Valor App can be used
            </motion.h2>
          </div>

          {/* Cards overlapping the header */}
          <div className="relative -mt-[480px] px-5 md:px-10">
            <div className="flex flex-col lg:flex-row gap-10 max-w-[95%] mx-auto">
              {/* Individual Card */}
              <motion.div
                className="flex-1 bg-[#D2F0FF] rounded-[24px] pt-6 md:pt-8 px-6 md:px-8 h-[610px] flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.2,
                    },
                  },
                }}
              >
                <h3 className="text-[24px] font-[700] text-primary mb-4">
                  Individual
                </h3>
                <p className="text-[15px] text-[#646464] leading-[24px] mb-6">
                  Rent any car you want from the list of vetted hosts. Rental
                  options include Daily rentals, hourly rentals, Airport Pickup
                  and drop off services.
                </p>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="bg-primary text-white px-8 py-3 rounded-full text-[15px] font-[500] w-fit mb-3 hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </button>

                {/* Phone mockup placeholder */}
                <div className="flex-1 overflow-hidden relative flex items-end justify-center">
                  <Image
                    src={HowItWorks}
                    alt="How it works"
                    width={687.175537109375}
                    height={858.375}
                    priority
                    className="object-cover top-[0%] left-[0%] lg:left-[5%] absolute w-[687.175537109375px] h-[858.375px]"
                  />
                </div>
              </motion.div>

              {/* Valor for Business Card */}
              <motion.div
                className="flex-1 bg-[#FEFFEE] rounded-[24px] pt-6 md:pt-8 px-6 md:px-8 h-[610px] flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.3,
                    },
                  },
                }}
              >
                <h3 className="text-[24px] font-[700] text-primary mb-4">
                  Valor for Business
                </h3>
                <p className="text-[15px] text-[#646464] leading-[24px] mb-4">
                  Rent available cars for long term and short term leasing. We
                  facilitate Vehicle outsourcing, provide car tracking and fleet
                  management for rented vehicles.
                </p>
                <p className="text-[15px] text-[#646464] leading-[24px] mb-6">
                  Reach out to us via whatsapp to get started
                </p>
                <button className="bg-white border border-[#C3C3C3] p-[10px_20px] rounded-[8px] text-[15px] font-[600] w-fit mb-8 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Image
                    src={Whatsapp}
                    alt="WhatsApp"
                    className="w-[80px]"
                    width={80}
                    priority
                  />
                </button>

                {/* Phone mockup placeholder */}
                <div className="flex-1 overflow-hidden relative flex items-end justify-center">
                  <Image
                    src={ReportBug}
                    alt="Report Bug"
                    width={687.175537109375}
                    height={858.375}
                    className="object-cover top-[0%] left-[0%] lg:left-[5%] absolute w-[687.175537109375px] h-[858.375px]"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* How the Valor App can be used Section mobile */}
      <div className="lg:hidden block mt-24 pb-10 bg-gradient-to-l from-[#023047] to-[#034a6b]">
        {/* Dark header section */}
        <div className="pt-8 px-8 md:px-12">
          <motion.h2
            className="text-[24px] md:text-[40px] font-[700] text-white leading-[40px] md:leading-[48px]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            How the Valor App can be used
          </motion.h2>
        </div>

        {/* Cards overlapping the header */}
        <div className="relative mt-5 px-5 md:px-10">
          <div className="flex flex-col lg:flex-row gap-10 max-w-[95%] mx-auto">
            {/* Individual Card */}
            <motion.div
              className="flex-1 bg-[#D2F0FF] rounded-[24px] pt-6 md:pt-8 px-6 md:px-8 flex flex-col"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: 0.2,
                  },
                },
              }}
            >
              <h3 className="text-[24px] font-[700] text-primary mb-4">
                Individual
              </h3>
              <p className="text-[15px] text-[#646464] leading-[24px] mb-6">
                Rent any car you want from the list of vetted hosts. Rental
                options include Daily rentals, hourly rentals, Airport Pickup
                and drop off services.
              </p>
              <button
                onClick={() => router.push("/sign-up")}
                className="bg-primary text-white px-8 py-3 rounded-full text-[15px] font-[500] w-fit hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </button>

              {/* Phone mockup placeholder */}
              <div className="flex-1 h-[300px] overflow-hidden relative flex items-end justify-center">
                <Image
                  src={HowItWorks}
                  alt="How it works"
                  width={687.175537109375}
                  height={858.375}
                  priority
                  className="object-cover w-[90%] h-auto"
                />
              </div>
            </motion.div>

            {/* Valor for Business Card */}
            <motion.div
              className="flex-1 bg-[#FEFFEE] rounded-[24px] pt-6 md:pt-8 px-6 md:px-8 flex flex-col"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: 0.3,
                  },
                },
              }}
            >
              <h3 className="text-[24px] font-[700] text-primary mb-4">
                Valor for Business
              </h3>
              <p className="text-[15px] text-[#646464] leading-[24px] mb-4">
                Rent available cars for long term and short term leasing. We
                facilitate Vehicle outsourcing, provide car tracking and fleet
                management for rented vehicles.
              </p>
              <p className="text-[15px] text-[#646464] leading-[24px] mb-6">
                Reach out to us via whatsapp to get started
              </p>
              <button className="bg-white border border-[#C3C3C3] p-[10px_20px] rounded-[8px] text-[15px] font-[600] w-fit mb-0 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Image
                  src={Whatsapp}
                  alt="WhatsApp"
                  className="w-[80px]"
                  width={80}
                  priority
                />
              </button>

              {/* Phone mockup placeholder */}
              <div className="flex-1 h-[300px] overflow-hidden relative flex items-end justify-center">
                <Image
                  src={ReportBug}
                  alt="Report Bug"
                  width={687.175537109375}
                  height={858.375}
                  priority
                  className="w-[90%] h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Container className="mb-8 px-5">
        <Faqs />

        {/* Become a Host Section */}
        <motion.div
          className="mt-24 hidden lg:block bg-[#D2F0FF] rounded-[24px] py-12 px-8 md:px-12 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center">
            <motion.h2
              className="text-[32px] md:text-[48px] font-[700] text-primary leading-[40px] md:leading-[56px] mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
            >
              Become a Host
            </motion.h2>
            <motion.p
              className="text-[16px] md:text-[18px] text-[#323232] leading-[24px] mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.1 },
                },
              }}
            >
              Register for free and generate revenue by renting your car via our
              platform.
            </motion.p>
            <motion.button
              onClick={() => {
                resetStore();
                router.push("/sign-up?accountType=host");
              }}
              className="bg-primary text-white font-[500] text-[16px] px-10 py-3 rounded-full hover:bg-primary/90 transition-colors"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2 },
                },
              }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Car illustration */}
          <motion.div
            className="mt-10 flex items-center justify-center"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.3,
                },
              },
            }}
          >
            <Image
              src={Rafiki}
              alt="Become a Host - Car Illustration"
              width={800}
              priority
              height={400}
              className="w-full max-w-[600px] h-auto object-contain"
            />
          </motion.div>
        </motion.div>

        <div className="hidden lg:block">
          <ExperienceValor />
        </div>
      </Container>

      {/* Become a Host Section mobile section */}
      <motion.div
        className="mt-0 lg:mt-24 lg:hidden block bg-[#D2F0FF] py-12 px-8 md:px-12 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-[24px] md:text-[48px] font-[700] text-primary leading-[32px] md:leading-[56px] mb-2 md:mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            Become a Host
          </motion.h2>
          <motion.p
            className="text-[16px] md:text-[18px] text-[#373737] leading-[24px] mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 },
              },
            }}
          >
            Register for free and generate revenue by renting your car via our
            platform.
          </motion.p>
          <motion.button
            onClick={() => {
              resetStore();
              router.push("/sign-up?accountType=host");
            }}
            className="bg-primary text-white font-[400] text-[14px] w-[163px] p-[14px_10px] h-[47px] rounded-[36px] hover:bg-primary/90 transition-colors"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 },
              },
            }}
          >
            Sign Up
          </motion.button>
        </div>

        {/* Car illustration */}
        <motion.div
          className="mt-10 flex items-center justify-center"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.3,
              },
            },
          }}
        >
          <Image
            src={Rafiki}
            alt="Become a Host - Car Illustration"
            width={800}
            height={400}
            priority
            className="w-full max-w-[600px] h-auto object-contain"
          />
        </motion.div>
      </motion.div>

      <div className="lg:hidden block">
        <ExperienceValor />
      </div>
    </div>
  );
};

export default AppFeatures;
