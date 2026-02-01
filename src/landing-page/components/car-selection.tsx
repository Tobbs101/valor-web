"use client";

import Container from "@/components/layout/container";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image, { StaticImageData } from "next/image";
import { Icon } from "@iconify/react";
import Sedan from "@/assets/sedan.svg";
import Suv from "@/assets/suv.svg";
import Luxury from "@/assets/luxury.svg";
import Bus from "@/assets/bus.svg";
import Vintage from "@/assets/vintage.svg";
import Pickup from "@/assets/pickup.svg";
import Highlander from "@/assets/highlander.png";

// Car categories - replace placeholder images with actual images
// Example: import SedanImg from "@/assets/sedan.png";
const carCategories = [
  { id: 1, name: "Sedan", image: Sedan },
  { id: 2, name: "SUV", image: Suv },
  { id: 3, name: "Luxury", image: Luxury },
  { id: 4, name: "Bus", image: Bus },
  { id: 5, name: "Vintage", image: Vintage },
  { id: 6, name: "Pick Up", image: Pickup },
];

const CategoryCard = ({
  category,
}: {
  category: { id: number; name: string; image: StaticImageData | null };
}) => {
  return (
    <div className="flex-shrink-0 w-[200px] md:w-[260px]">
      <div className="bg-[#EEF9FF] border border-[#C9D3D8] rounded-[30px] h-[180px] md:h-[220px] w-full flex items-center justify-center overflow-hidden">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            width={180}
            height={120}
            className="object-contain"
          />
        ) : (
          <div className="w-[140px] h-[80px] md:w-[180px] md:h-[100px] border-2 border-dashed border-[#023047]/30 rounded-lg flex items-center justify-center">
            <span className="text-[#023047]/40 text-sm">Add Image</span>
          </div>
        )}
      </div>
      <h3 className="mt-3 text-[16px] md:text-[18px] font-[700] text-[#323232]">
        {category.name}
      </h3>
    </div>
  );
};

const CarSelection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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

  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [
    ...carCategories,
    ...carCategories,
    ...carCategories,
  ];

  // Feature cards for the carousel - Order: Variety, Secure Payment, Best Price, Simplicity, Security
  const featureCards = [
    {
      id: 1,
      content: (
        <div className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-6 shadow-lg min-h-[420px]">
          <div>
            <h3 className="text-[22px] md:text-[26px] font-[700] text-primary mb-2">
              Variety
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] mb-6 leading-[22px]">
              Search for any vehicle from a deep pool of car owners in your area
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-3">
            {[
              { name: "SUVs", icon: "mdi:car-suv" },
              { name: "Sedan", icon: "mdi:car-saloon" },
              { name: "Luxury", icon: "mdi:car-sports" },
              { name: "Mini-van", icon: "mdi:van-passenger" },
              { name: "Bus", icon: "mdi:bus" },
              { name: "Pickup", icon: "mdi:car-pickup" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-[12px] p-3 flex flex-col items-center justify-center gap-2 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <Icon icon={item.icon} className="text-[28px] text-primary" />
                <span className="text-[12px] text-[#323232] font-[500]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="bg-[#C5EBFF] rounded-[24px] p-6 shadow-lg min-h-[420px] flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Credit Card Illustration */}
              <div className="w-[180px] h-[110px] bg-[#4A9FD4] rounded-[12px] relative overflow-hidden shadow-lg">
                <div className="absolute top-4 left-4 right-4">
                  <div className="w-[60%] h-[8px] bg-white/80 rounded-full mb-2"></div>
                  <div className="w-[40%] h-[8px] bg-white/80 rounded-full"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-[20px] bg-[#D4A84A]"></div>
              </div>
              {/* Lock Icon */}
              <div className="absolute -bottom-2 -right-2 w-[50px] h-[50px] bg-[#023047] rounded-[10px] flex items-center justify-center shadow-lg">
                <Icon icon="mdi:lock" className="text-white text-2xl" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[22px] md:text-[26px] font-[700] text-primary mb-2">
              Secure Payment
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] leading-[22px]">
              Payment is made via our platform eliminating the risk of being
              defrauded
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-6 shadow-lg min-h-[420px]">
          <div>
            <h3 className="text-[22px] md:text-[26px] font-[700] text-primary mb-2">
              Best Price
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] mb-5 leading-[22px]">
              Compare cost of vehicles and select the rental best for you.
            </p>
          </div>
          <div className="space-y-3 relative">
            {/* First car card - slightly rotated */}
            <div className="bg-[#023047] rounded-[14px] p-3 flex items-center gap-3 transform -rotate-[7deg] relative z-10">
              <div className="w-[70px] h-[50px] bg-gray-400 rounded-[8px] overflow-hidden relative">
                <Image
                  src={Highlander}
                  alt="Car"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-[600] text-[14px]">
                  Lexus M360
                </h4>
                <p className="text-white/60 text-[11px]">Driver: John Doe</p>
                <p className="text-white/60 text-[11px]">Reg No: MKV-234-TGH</p>
                <p className="text-white text-[13px] mt-1">
                  From <span className="text-[#4ADE80] font-[700]">N57k</span>{" "}
                  /Day
                </p>
              </div>
              <Icon
                icon="mdi:dots-vertical"
                className="text-white/60 text-xl"
              />
            </div>

            {/* Second car card */}
            <div className="bg-white border border-primary rounded-[14px] p-3 flex items-center gap-3">
              <div className="w-[70px] h-[50px] bg-gray-400 rounded-[8px] overflow-hidden relative">
                <Image
                  src={Highlander}
                  alt="Car"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-primary font-[600] text-[14px]">
                  Swirl C4D
                </h4>
                <p className="text-primary/60 text-[11px]">Driver: John Doe</p>
                <p className="text-primary/60 text-[11px]">
                  Reg No: MKV-234-TGH
                </p>
                <p className="text-primary text-[13px] mt-1">
                  From <span className="text-black font-[700]">N80k</span> /Day
                </p>
              </div>
              <Icon icon="mdi:dots-vertical" className="text-primary text-xl" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-6 shadow-lg min-h-[420px]">
          <div>
            <h3 className="text-[22px] md:text-[26px] font-[700] text-primary mb-2">
              Simplicity
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] mb-5 leading-[22px]">
              Our app is very simple to use. Hassle free to hire any car.
            </p>
          </div>
          {/* Car Cards Preview */}
          <div className="bg-white rounded-[16px] p-4 shadow-sm">
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="relative h-[100px] bg-gray-200 rounded-[12px] overflow-hidden mb-2">
                  <Image
                    src={Highlander}
                    alt="Toyota Highlander"
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-2 right-2 w-[28px] h-[28px] bg-white/90 rounded-full flex items-center justify-center">
                    <Icon
                      icon="mdi:heart-outline"
                      className="text-gray-500 text-sm"
                    />
                  </button>
                </div>
                <h4 className="text-[13px] font-[600] text-primary">
                  Toyota Highlander
                </h4>
                <p className="text-[11px] text-[#646464]">
                  From <span className="font-[700]">N57k</span> /Day
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon
                    icon="mdi:navigation-variant"
                    className="text-orange-400 text-[12px]"
                  />
                  <span className="text-[10px] text-[#646464]">
                    Lagos, Nigeria
                  </span>
                  <span className="text-[10px] text-[#646464] ml-auto">
                    4.8
                  </span>
                  <Icon
                    icon="material-symbols:star"
                    className="text-yellow-500 text-[10px]"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-[100px] bg-gray-200 rounded-[12px] overflow-hidden mb-2">
                  <Image
                    src={Highlander}
                    alt="Toyota Camry"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-[13px] font-[600] text-primary">
                  Toyota Camry 2023
                </h4>
                <p className="text-[11px] text-[#646464]">
                  From <span className="font-[700]">N60k</span>/Day
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon
                    icon="mdi:navigation-variant"
                    className="text-orange-400 text-[12px]"
                  />
                  <span className="text-[10px] text-[#646464]">
                    Lagos, Nigeria
                  </span>
                  <span className="text-[10px] text-[#646464] ml-auto">4.</span>
                  <Icon
                    icon="material-symbols:star"
                    className="text-yellow-500 text-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      content: (
        <div className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-6 shadow-lg min-h-[420px]">
          <div>
            <h3 className="text-[22px] md:text-[26px] font-[700] text-primary mb-2">
              Security
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] mb-5 leading-[22px]">
              Hosts and Drivers on our platform are vetted and all cars are
              tracked
            </p>
          </div>
          {/* Shield Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Shield shape */}
              <div className="w-[140px] h-[160px] bg-gradient-to-b from-[#8B7FE8] to-[#6B5DD3] rounded-t-[70px] rounded-b-[20px] flex items-center justify-center relative overflow-hidden">
                {/* Shield inner glow */}
                <div className="absolute inset-2 bg-gradient-to-b from-[#A599F2] to-[#8B7FE8] rounded-t-[60px] rounded-b-[16px] opacity-50"></div>
                {/* Checkmark */}
                <div className="relative z-10 w-[50px] h-[50px] bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Icon icon="mdi:check-bold" className="text-white text-3xl" />
                </div>
              </div>
              {/* Lock icon */}
              <div className="absolute -bottom-3 -right-3 w-[55px] h-[55px] bg-[#87CEEB] rounded-[12px] flex items-center justify-center shadow-lg">
                <Icon
                  icon="mdi:lock-outline"
                  className="text-[#023047] text-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white py-[50px] md:py-[80px] overflow-hidden">
      <Container className="mb-8 px-5">
        <motion.h1
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="w-full text-[48px] text-primary leading-[56px] mb-3 md:text-[48px] font-[700] text-left"
        >
          Car Selection
        </motion.h1>
        <motion.p
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={descriptionVariants}
          className=" text-[16px] text-[#323232] leading-[20px] md:leading-[24px] md:text-[20px] font-[400] md:text-base"
        >
          From small cars to premium rides, the Valor Hire platform offers a
          wide range of vehicles. <br />
          Whatever you need, we've got you covered.
        </motion.p>

        {/* Continuous Slider */}
        <div className="relative overflow-hidden mt-5 w-full pl-5">
          <motion.div
            className="flex gap-5 md:gap-8"
            animate={{
              x: [0, -(268 * carCategories.length)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedCategories.map((category, index) => (
              <CategoryCard
                key={`${category.id}-${index}`}
                category={category}
              />
            ))}
          </motion.div>
        </div>

        {/* What Valor Gives You Section - Wrapper for overlap effect */}
        <div className="mt-[150px] relative">
          {/* Dark header section */}
          <div className="rounded-[30px] bg-gradient-to-l from-[#023047] to-[#034a6b] pt-[50px] pb-[200px] md:pb-[250px] px-5 md:px-10">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-start justify-between">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[32px] md:text-[48px] text-white font-[700] leading-[40px] md:leading-[56px] mb-4"
                  >
                    What Valor Gives You
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-[16px] md:text-[18px] text-white/80 max-w-[500px] leading-[24px]"
                  >
                    Book from a variety of vetted hosts and make payment
                    securely using our platform
                  </motion.p>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentIndex === 0}
                    className="w-[50px] h-[50px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Icon
                      icon="mdi:arrow-left"
                      className="text-white text-xl"
                    />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(featureCards.length - 3, prev + 1),
                      )
                    }
                    disabled={currentIndex >= featureCards.length - 3}
                    className="w-[50px] h-[50px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Icon
                      icon="mdi:arrow-right"
                      className="text-white text-xl"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Overlapping section */}
          <div className="relative -mt-[140px] md:-mt-[180px] pb-[50px] px-5 md:px-10 overflow-x-clip">
            <div className="max-w-[1400px] mx-auto">
              <motion.div
                className="flex gap-6"
                animate={{ x: -currentIndex * (100 / 3 + 1.5) + "%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <AnimatePresence mode="popLayout">
                  {featureCards.map((card, idx) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex-shrink-0 w-[85%] sm:w-[60%] md:w-[calc(33.333%-16px)]"
                    >
                      {card.content}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CarSelection;
