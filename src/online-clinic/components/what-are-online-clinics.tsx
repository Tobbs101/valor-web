"use client";

import Container from "@/components/layout/container";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import LaptopBg from "@/assets/online_clinic_bg.jpg";
import Image from "next/image";
import Link from "next/link";
import CountdownToSaturday from "./countdown";
import { Button } from "@/components/ui/button";

const OnlineClinicInfoSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.4, // Trigger when 20% of the element is visible
  });

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and 50px below
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Animate into view
  };
  return (
    <Container className="px-5 py-10 md:py-[100px] bg-[#fff]">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        <div className="px-5 pt-5">
          <h1 className="text-3xl mb-7 md:text-5xl font-bold text-center md:text-left">
            What Are Online Clinics?
          </h1>
          <p className="text-gray-600 text-[14px] text-center md:text-left md:text-base">
            Our Online Clinics provide personalized support for students
            preparing for their exams. Whether you need help with tricky topics,
            advice on exam strategies, or confidence-boosting tips, our expert
            tutors are here to guide you. <br />
            <br />
            Each session is tailored to your specific needs, ensuring you get
            the most out of your time. From exam paper reviews to targeted
            coaching, we’ve got you covered.
            <br />
            <br />
            Our Online Clinic is included in the{" "}
            <Link className="text-blue-600 hover:underline" href="/lb-online">
              LB Online subscription
            </Link>{" "}
            at no additional cost.
          </p>
          <Button
            onClick={() =>
              window.open(
                "https://courses.limitbreakers.co.uk/order?ct=072fef60-e503-4a94-8f68-1c6d3b172b7b",
                "_blank"
              )
            }
            className="w-full md:w-fit px-7 h-[50px] mt-5"
          >
            SIgn Up Today
          </Button>
          <div className="w-full mt-9">
            <p className="text-gray-600 text-[14px] md:text-left md:text-base">
              Countdown to the next Online Clinic
            </p>
            <CountdownToSaturday
              // innerClassName="w-fit md:w-fit"
              className="mt-3 py-7 md:px-5 text-3xl md:text-4xl w-full overflow-x-auto md:w-fit border bg-[#F6F6F6] rounded-md border-[#D4D4D4] text-gray-800"
            />
          </div>
        </div>
        <div className="h-[300px] md:h-full flex items-start justify-center">
          <Image
            src={LaptopBg}
            alt=""
            className="object-cover rounded-md w-full h-full"
          />
        </div>
      </motion.div>
    </Container>
  );
};

export default OnlineClinicInfoSection;
