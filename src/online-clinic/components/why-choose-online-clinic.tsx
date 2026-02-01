"use client";

import Each from "@/components/helpers/each";
import Container from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import customized_lessons from "@/assets/customized_lessons.svg";
import group_sessions from "@/assets/group_sessions.svg";
import flexible_scheduling from "@/assets/flexible_scheduling.svg";
import interactive from "@/assets/interactive.svg";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    id: 1,
    heading: "Group Sessions",
    subText: "Get direct access to expert tutors for personalized attention.",
    containerClass: "bg-[#E5F8FF]",
    bodyClass: "bg-[#E5F8FF]",
    icon: <Image src={group_sessions} alt="" />,
  },
  {
    id: 2,
    heading: "Customized Lessons",
    subText: "Focus on the areas where you need the most help.",
    containerClass: "bg-[#D2FFF3]",
    bodyClass: "bg-[#D2FFF3]",
    icon: <Image src={customized_lessons} alt="" />,
  },
  {
    id: 3,
    heading: "Flexible Scheduling",
    subText: "Book sessions at times that work best for you.",
    containerClass: "bg-[#FFEBF7]",
    bodyClass: "bg-[#FFEBF7]",
    icon: <Image src={flexible_scheduling} alt="" />,
  },
  {
    id: 4,
    heading: "Interactive and Engaging",
    subText:
      "Use live video, screen sharing, and collaborative tools for an effective learning experience.",
    containerClass: "bg-[#F9FFEC]",
    bodyClass: "bg-[#F9FFEC]",
    icon: <Image src={interactive} alt="" />,
  },
];

const WhyChooseOnlineClinic = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.4, // Trigger when 20% of the element is visible
  });

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and 50px below
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Animate into view
  };

  const router = useRouter();

  return (
    <Container className="bg-[#F9F9F9] px-5 py-5 md:py-[100px]">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        className="flex items-center flex-col justify-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">
          Why Choose Our Online Clinics?
        </h1>
        <p className="text-gray-600 text-[14px] text-center font-[400] md:text-base">
          Our platform is packed with features to make your learning experience
          seamless and effective.
        </p>
        <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 mt-10">
          <Each
            of={CATEGORIES}
            render={(item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-5 justify-start p-5",
                  item.bodyClass
                )}
              >
                <div
                  className={cn(
                    "h-[100px] flex items-center border border-[#DCDCDC] rounded-md justify-center w-[100px]",
                    item.containerClass
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-lg font-medium text-left mb-1">
                    {item.heading}
                  </h1>
                  <p className="text-gray-600 text-[14px] text-left font-[400]">
                    {item.subText}
                  </p>
                </div>
              </div>
            )}
          />
        </div>

        <Link
          href={`https://courses.limitbreakers.co.uk/users/sign_in`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="font-normal mt-10 h-[45px] px-7">
            Register Now
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
};

export default WhyChooseOnlineClinic;
