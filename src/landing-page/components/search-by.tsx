"use client";

import React from "react";
import Each from "@/components/helpers/each";
import Container from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import LaptopBg from "@/assets/laptop-bg.svg";
import Image from "next/image";

const CATEGORIES = [
  {
    id: 1,
    title: "11+ Exam Papers",
    link: "/practice-papers",
    containerClass: "bg-[#E5F8FF] border border-[#E5F8FF]",
    icon: (
      <Icon
        className="text-[#0F39B8] text-[50px] xl:text-[130px]"
        icon="healthicons:i-exam-multiple-choice2x-outline"
      />
    ),
  },
  {
    id: 2,
    title: "County / Region",
    link: "/local-education-authority",
    containerClass: "bg-[#F9FFEC] border border-[#F9FFEC]",
    icon: (
      <Icon
        className="text-[#81B807] text-[50px] xl:text-[120px]"
        icon="flowbite:school-check-outline"
      />
    ),
  },
  {
    id: 3,
    title: "Schools",
    link: "/schools",
    containerClass: "bg-[#D2FFF3] border border-[#D2FFF3]",
    icon: (
      <Icon
        className="text-[50px] xl:text-[110px] text-[#04684E]"
        icon="teenyicons:school-outline"
      />
    ),
  },
  {
    id: 4,
    title: "Free Resources",
    link: "/free-resources",
    containerClass: "bg-[#FFEBF7] border border-[#FFEBF7]",
    icon: (
      <Icon
        className="text-[#90095A] text-[50px] xl:text-[110px]"
        icon="hugeicons:books-02"
      />
    ),
  },
];

const Header = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.4, // Trigger when 20% of the element is visible
  });

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and 50px below
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Animate into view
  };
  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="w-full text-center my-5 text-[36px] md:text-[48px] font-[700]"
    >
      Search By
    </motion.h1>
  );
};

const CategoryList = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Trigger when 20% of the element is visible
  });

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and 50px below
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Animate into view
  };

  const router = useRouter();

  return (
    <div className="mt-10 w-full grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
      <Each
        of={CATEGORIES}
        render={(item) => (
          <motion.div
            ref={ref}
            initial="hidden"
            animate="visible"
            variants={variants}
            onClick={() => {
              sessionStorage.removeItem("selected_county");
              router.push(item.link);
            }}
            key={item.id}
            className="border cursor-pointer duration-300 hover:border-gray-50 hover:shadow-lg border-gray-100 shadow-sm rounded-xl p-6 md:p-8 h-[200px] sm:h-[280px] xl:h-[320px] flex flex-col justify-between"
          >
            <div
              className={cn(
                "h-[150px] xl:h-[200px] flex items-center justify-center rounded-2xl w-full bg-gray-50",
                item.containerClass
              )}
            >
              {item.icon}
            </div>
            <p className="mt-4 font-medium text-center text-xs sm:text-base">
              {item.title}
            </p>
          </motion.div>
        )}
      />
    </div>
  );
};

const VideoTutorial = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.4, // Trigger when 20% of the element is visible
  });

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and 50px below
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Animate into view
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="w-full grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="p-5">
        <h1 className="text-3xl mb-5 md:text-5xl font-bold text-center md:text-left">
          Try Limit Breakers Tutoring, watch this video to learn more
        </h1>
        <p className="text-gray-600 text-[14px] text-center md:text-left md:text-base">
          We offer opportunities to those who have a desire to be achievers and
          cultivate greatness in young people, empowering them to fulfil their
          potential. We are particularly keen that our students lern to make an
          impact in the world they live in. Watch our video to learn more about
          our 5 core principles.
        </p>
      </div>
      <div className=" h-fit md:h-[500px] relative flex items-start justify-center">
        <video
          src="videos/LIMIT-BREAKERS-TUTORING-rev-6-1.mp4"
          controls
          className="max-h-auto z-[50] w-full mx-auto"
        />
      </div>
    </motion.div>
  );
};

const SearchBy = () => {
  return (
    <>
      {/* <div className="px-5 bg-white">
        <Container className="py-[30px] sm:py-[50px]">
          <Header />
          <CategoryList />
        </Container>
      </div> */}
      <Container className=" px-5 py-5 md:py-[100px] bg-[#FFEBF7]">
        <VideoTutorial />
      </Container>
    </>
  );
};

export default React.memo(SearchBy);
