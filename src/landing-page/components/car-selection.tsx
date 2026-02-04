"use client";

import Container from "@/components/layout/container";
import React, { useState, useEffect } from "react";
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
import SecurePayment from "@/assets/secure-payment.svg";
import PaymentShield from "@/assets/security-padlock.png";

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
    <div className="flex-shrink-0 w-[150px] md:w-[260px]">
      <div className="bg-[#EEF9FF] px-4 border border-[#C9D3D8] rounded-[12px] md:rounded-[30px] h-[150px] md:h-[220px] w-full flex items-center justify-center overflow-hidden">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            width={180}
            height={220}
            priority
            className="object-contain"
          />
        ) : (
          <div className="w-[150px] h-[150px] md:w-[260px] md:h-[220px] border-2 border-dashed border-[#023047]/30 rounded-lg flex items-center justify-center">
            <span className="text-[#023047]/40 text-sm">Add Image</span>
          </div>
        )}
      </div>
      <h3 className="mt-1 md:mt-3 text-[12px] md:text-[18px] font-[500] md:font-[700] text-[#323232]">
        {category.name}
      </h3>
    </div>
  );
};

const CarSelection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Responsive visible cards count
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // Mobile: 1 card
      } else if (window.innerWidth < 768) {
        setVisibleCards(2); // Small screens: 2 cards
      } else {
        setVisibleCards(3); // Desktop: 3 cards
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

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
        <motion.div
          className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-4 md:p-6 shadow-lg h-[350px] md:min-h-[420px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <h3 className="text-[20px] md:text-[26px] font-[700] text-primary mb-2">
              Variety
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] mb-6 leading-[22px]">
              Search for any vehicle from a deep pool of car owners in your area
            </p>
          </motion.div>
          <motion.div
            className="grid border border-gray-200 p-3 rounded-2xl bg-white w-full grid-cols-3 gap-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, delay: 0.5 },
              },
            }}
          >
            {[
              { name: "SUVs", icon: "mdi:car-suv" },
              { name: "Sedan", icon: "mdi:car-saloon" },
              { name: "Luxury", icon: "mdi:car-sports" },
              { name: "Mini-van", icon: "mdi:van-passenger" },
              { name: "Bus", icon: "mdi:bus" },
              { name: "Pickup", icon: "mdi:car-pickup" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-[12px] p-3 flex flex-col items-center justify-center gap-2 hover:border-primary/30 transition-colors cursor-pointer"
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: 0.3 + idx * 0.08,
                    },
                  },
                }}
              >
                <Icon icon={item.icon} className="text-[28px] text-primary" />
                <span className="text-[12px] text-[#323232] font-[500]">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    {
      id: 2,
      content: (
        <motion.div
          className="bg-[#C5EBFF] rounded-[24px] p-4 md:p-6 shadow-lg h-[350px] md:min-h-[420px] flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.5,
                  },
                },
              }}
            >
              <Image
                src={SecurePayment}
                alt="Secure Payment"
                width={200}
                height={200}
                priority
              />
            </motion.div>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
          >
            <h3 className="text-[20px] md:text-[26px] font-[700] text-primary mb-2">
              Secure Payment
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] leading-[22px]">
              Payment is made via our platform eliminating the risk of being
              defrauded
            </p>
          </motion.div>
        </motion.div>
      ),
    },
    {
      id: 3,
      content: (
        <motion.div
          className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-4 md:p-6 shadow-lg h-[350px] md:min-h-[420px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <h3 className="text-[20px] md:text-[26px] font-[700] text-primary mb-2">
              Best Price
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] mb-5 leading-[22px]">
              Compare cost of vehicles and select the rental best for you.
            </p>
          </motion.div>
          <div className="space-y-3 relative">
            {/* First car card - slightly rotated with drop-in bounce */}
            <motion.div
              className="bg-[#023047] rounded-[14px] p-3 flex items-center gap-3 relative z-10"
              variants={{
                hidden: { opacity: 0, y: -80, scale: 0.9, rotate: 0 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: -6.5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.5,
                    mass: 0.8,
                  },
                },
              }}
            >
              <motion.div
                className="w-[90px] h-[70px] bg-gray-400 rounded-[8px] overflow-hidden relative"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.7, duration: 0.3 },
                  },
                }}
              >
                <Image
                  src={Highlander}
                  alt="Car"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                className="flex-1"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.9, duration: 0.3 },
                  },
                }}
              >
                <h4 className="text-white font-[600] text-[14px]">
                  Lexus M360
                </h4>
                <p className="text-[#F4F4F4] text-[12px]">Driver: John Doe</p>
                <p className="text-[#F4F4F4] text-[12px]">
                  Reg No: MKV-234-TGH
                </p>
                <p className="text-white text-[13px] mt-1">
                  From <span className="text-[#4ADE80] font-[700]">N57k</span>{" "}
                  /Day
                </p>
              </motion.div>
              <Icon
                icon="mdi:dots-vertical"
                className="text-white/60 text-xl"
              />
            </motion.div>

            {/* Second car card with drop-in bounce */}
            <motion.div
              className="bg-white border border-primary rounded-[14px] p-3 flex items-center gap-3"
              variants={{
                hidden: { opacity: 0, y: -100, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 280,
                    damping: 14,
                    delay: 1,
                    mass: 0.8,
                  },
                },
              }}
            >
              <motion.div
                className="w-[90px] h-[80px] bg-gray-400 rounded-[8px] overflow-hidden relative"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 1.2, duration: 0.3 },
                  },
                }}
              >
                <Image
                  src={Highlander}
                  alt="Car"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                className="flex-1"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: 1.4, duration: 0.3 },
                  },
                }}
              >
                <h4 className="text-primary font-[600] text-[14px]">
                  Swirl C4D
                </h4>
                <p className="text-[#646464] text-[12px]">Driver: John Doe</p>
                <p className="text-[#646464] text-[12px]">
                  Reg No: MKV-234-TGH
                </p>
                <p className="text-primary text-[13px] mt-1">
                  From <span className="text-black font-[700]">N80k</span> /Day
                </p>
              </motion.div>
              <Icon icon="mdi:dots-vertical" className="text-primary text-xl" />
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-4 md:p-6 shadow-lg h-[350px] md:min-h-[420px]">
          <div>
            <h3 className="text-[20px] md:text-[26px] font-[700] text-primary mb-2">
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
                    priority
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
                    priority
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
        <div className="bg-[#EEF9FF] flex flex-col justify-between rounded-[24px] p-4 md:p-6 shadow-lg h-[350px] md:min-h-[420px]">
          <div>
            <h3 className="text-[20px] md:text-[26px] font-[700] text-primary mb-2">
              Security
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#646464] mb-5 leading-[22px]">
              Hosts and Drivers on our platform are vetted and all cars are
              tracked
            </p>
          </div>
          {/* Shield Illustration */}
          <div className="h-full flex items-center justify-center w-full">
            <Image
              priority
              className="w-[125px] md:w-[150px]"
              src={PaymentShield}
              alt="Secure Payment"
              width={150}
            />
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
          className="w-full text-[24px] text-primary leading-[56px] md:mb-3 md:text-[48px] font-[700] text-left"
        >
          Car Selection
        </motion.h1>
        <motion.p
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={descriptionVariants}
          className="text-[14px] text-[#323232] leading-[20px] md:leading-[24px] md:text-[20px] font-[400] md:text-base"
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
        <div className="mt-[70px] hidden lg:block md:mt-[150px] relative">
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
                <div className="flex items-center gap-3">
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
                        Math.min(featureCards.length - visibleCards, prev + 1),
                      )
                    }
                    disabled={
                      currentIndex >= featureCards.length - visibleCards
                    }
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
                className="flex gap-4 sm:gap-5 md:gap-6"
                animate={{
                  x:
                    -currentIndex *
                      (100 / visibleCards +
                        (visibleCards === 1
                          ? 5
                          : visibleCards === 2
                            ? 3
                            : 1.5)) +
                    "%",
                }}
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
                      className="flex-shrink-0 w-[90%] min-w-[380px] sm:w-[48%] md:w-[calc(33.333%-16px)]"
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

      {/* Feature Cards - Mobile & Tablet (below lg) */}
      <div className="w-full bg-gradient-to-l from-[#023047] to-[#034a6b] lg:hidden px-5 py-[50px] mt-[30px] relative">
        <div className="max-w-[1400px] mx-auto">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[24px] md:text-[48px] text-white font-[700] leading-[40px] md:leading-[56px] mb-4"
            >
              What Valor Gives You
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[14px] md:text-[18px] text-white/80 max-w-[500px] leading-[24px]"
            >
              Book from a variety of vetted hosts and make payment securely
              using our platform
            </motion.p>
          </div>
          <motion.div
            className="flex mt-5 gap-4"
            animate={{
              x:
                -currentIndex *
                  (100 / visibleCards + (visibleCards === 1 ? 4 : 2)) +
                "%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {featureCards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex-shrink-0 w-[calc(100%-0px)] sm:w-[350px]"
              >
                {card.content}
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile/Tablet Navigation Arrows */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="w-[50px] h-[50px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:arrow-left" className="text-white text-xl" />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(featureCards.length - visibleCards, prev + 1),
                )
              }
              disabled={currentIndex >= featureCards.length - visibleCards}
              className="w-[50px] h-[50px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:arrow-right" className="text-white text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSelection;
