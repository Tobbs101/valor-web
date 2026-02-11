"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "@/components/layout/container";
import HeroBg from "@/assets/stylish-black-woman-car-salon-2.jpg";
import Image from "next/image";
import Mission from "@/assets/mission.jpg";
import Vision from "@/assets/vision.png";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const AboutUsHero = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const benefits = [
    {
      title: "Mission",
      desc: "To become the Airbnb of car rentals by simplifying and automating the process of renting a car.",
      img: (
        <div className="w-full pb-5 flex items-center justify-center">
          <Image
            src={Mission}
            alt="Mission"
            width={200}
            priority
            className="w-[200px] object-contain"
          />
        </div>
      ),
      imageLocation: "bottom",
    },
    {
      title: "Vision",
      desc: "To dominate the car rental space by providing user-friendly cutting-edge technology. Starting operations in Nigeria then expanding to the rest of the world.",
      img: (
        <div className="w-full pb-5 flex items-center justify-center">
          <Image
            src={Vision}
            alt="Vision"
            width={200}
            priority
            className="w-[200px] mt-3 object-contain"
          />
        </div>
      ),
      imageLocation: "bottom",
    },
  ];

  return (
    <div className=" bg-white">
      <Container className="pt-[30px] px-0 sm:px-5 sm:pt-[70px]">
        <div className="flex px-5 sm:px-0 flex-col items-center justify-center w-full">
          <motion.h1
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full text-[24px] leading-[24px] md:leading-[64px] md:text-[64px] font-[700] text-primary text-left mb-2"
          >
            Experience Luxury and
            <br /> Simplicity with Valor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full font-[400] text-left text-[16px] md:text-[20px] text-[#646464] mb-5 sm:mb-8"
          >
            Your ultimate destination for premium car rentals in Nigeria.
          </motion.p>
        </div>

        <div className="relative w-full">
          <Image
            src={HeroBg}
            height={500}
            width={1440}
            priority
            alt="About Us Hero Background"
            className="w-full h-[300px] md:rounded-[32px] md:h-[500px] object-cover"
          />
        </div>
      </Container>

      <div className="bg-primary md:bg-transparent mt-[0px] sm:mt-[70px]">
        <Container className="px-5">
          <div>
            <div className="w-full relative py-10 px-4 md:px-12 flex flex-col items-center">
              <div className="absolute hidden sm:block top-0 left-0 w-full rounded-[32px] h-[80%] bg-primary"></div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-white w-full z-[1] text-[24px] md:text-[48px] font-[500] md:font-[700] text-center sm:text-left mb-7"
              >
                Company Mission & Vision:
              </motion.h2>

              {/* Desktop grid */}
              <div
                ref={gridRef}
                className="hidden z-[1] md:grid grid-cols-2 gap-6 w-full"
              >
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 * i,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "bg-[#F6F8FF] justify-between rounded-2xl gap-0 flex flex-col items-center shadow-sm min-h-[260px]",
                      { "flex-col-reverse": b.imageLocation === "bottom" },
                      { "bg-white": i === 0 },
                    )}
                  >
                    {b.img}
                    <div className="w-full p-6">
                      <h3 className="text-[18px] font-[700] text-primary mb-2 text-left w-full">
                        {b.title}
                      </h3>
                      <p className="text-[14px] text-[#3E3E3E] text-left w-full">
                        {b.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile carousel */}
              <div className="md:hidden w-full mt-2">
                <Carousel className="w-full">
                  <div className="flex items-center justify-start gap-4">
                    <CarouselPrevious className="relative left-0" />
                    <CarouselNext className="relative right-0" />
                  </div>
                  <CarouselContent className="mt-4">
                    {benefits.map((b, i) => (
                      <CarouselItem key={i}>
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: "easeOut",
                          }}
                          className={cn(
                            "bg-[#F6F8FF] justify-between rounded-2xl gap-0 flex flex-col items-center shadow-sm min-h-[260px]",
                            {
                              "flex-col-reverse": b.imageLocation === "bottom",
                            },
                            { "bg-white": i === 0 },
                          )}
                        >
                          {b.img}
                          <div className="w-full p-6">
                            <h3 className="text-[18px] font-[700] text-primary mb-2 text-left w-full">
                              {b.title}
                            </h3>
                            <p className="text-[14px] text-[#3E3E3E] text-left w-full">
                              {b.desc}
                            </p>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUsHero;
