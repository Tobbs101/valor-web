"use client";

import Container from "@/components/layout/container";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Practice_Papers from "@/assets/products/practice_papers.svg";
import Doctor from "@/assets/doctor.svg";
import Unity from "@/assets/unity-is-power.svg";
import Pediatric from "@/assets/doctor-giving-virus-injection-to-kid.svg";
import Orthodontics from "@/assets/doctor-doing-teeth-treatment-to-patient.svg";
import Hospital from "@/assets/hospital.svg";
import Location from "@/assets/navigation.svg";
import LB_Online from "@/assets/products/lb_online.svg";
import Online_Clinic from "@/assets/products/online_clinic.svg";
import Initial_Assessment from "@/assets/products/initial_assessment.svg";
import Free_Resources from "@/assets/products/free_resources.svg";
import Secondary from "@/assets/products/secondary.svg";
import Each from "@/components/helpers/each";
import Image, { StaticImageData } from "next/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

type ProductProp = {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  route: string;
};

const PRODUCTS: ProductProp[] = [
  {
    id: 1,
    title: "Meet the Doctors",
    description:
      "Get to know our experienced, compassionate dental professionals.",
    image: Doctor,
    route: "/meet-dr-sylvester-awagu",
  },
  {
    id: 2,
    title: "What Sets Us Apart",
    description:
      "Discover how our kid-friendly environment make every visit a positive experience.",
    image: Unity,
    route: "/what-sets-us-apart",
  },
  {
    id: 3,
    title: "Pediatric Dentistry",
    description: "Comprehensive dental care tailored to children.",
    image: Pediatric,
    route: "/pediatric-dentistry",
  },
  {
    id: 4,
    title: "About Orthodontics",
    description:
      "Learn how early orthodontic care can support dental health for your child.",
    image: Orthodontics,
    route: "/about-orthodontics",
  },
  {
    id: 5,
    title: "Visiting the Jungle",
    description:
      "A playful environment where comfort, care, and smiles grow together.",
    image: Hospital,
    route: "/visiting-the-jungle",
  },
  {
    id: 6,
    title: "Contact Us",
    description:
      "We’re happy to answer your questions and help you get started with a healthy smile.",
    image: Location,
    route: "/contact-us",
  },
];

const Product = ({ item }: { item: ProductProp }) => {
  const router = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.4, // Trigger when 20% of the element is visible
  });

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and 50px below
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Animate into view
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="shadow-sm bg-white overflow-hidden rounded-2xl"
    >
      <Image
        src={item.image}
        className="w-full object-contain h-[270px]"
        alt=""
      />
      <div className="py-2 min-h-[120px] flex items-center justify-between px-5 gap-10">
        <div>
          <Text>{item.title}</Text>
          <Text size={"xs"} className="text-gray-500">
            {item.description}
          </Text>
        </div>
        <Button
          onClick={() => router.push(item.route)}
          className="text-xs flex gap-1 px-5 items-center justify-center bg-[#E5F8FF] font-medium hover:font-semibold transition-all duration-300 hover:bg-[#d4f0fa] border border-[#E5F8FF] text-[#0F39B8] shadow-none"
        >
          Learn More
          <Icon icon="cuida:caret-right-outline" className="text-[#0F39B8]" />
        </Button>
      </div>
    </motion.div>
  );
};

const ProductList = () => {
  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-10">
      <Each of={PRODUCTS} render={(item) => <Product item={item} />} />
    </div>
  );
};

const ExploreProducts = () => {
  return (
    <div className="px-5 bg-[#F9F9F9]">
      <Container className="py-[50px] sm:py-[100px]">
        <div className="flex flex-col items-center justify-center">
          <div>
            {" "}
            <div className="border text-center border-[#E5F8FF] bg-[#E5F8FF] text-[#0F39B8] text-sm mx-auto w-[100px] py-1 rounded-[100px] font-bold">
              Explore
            </div>
            {/* <h1 className="mt-5 w-full text-[36px] md:text-[48px] font-[700] text-center">
              Products
            </h1>
            <p className="mt-5 text-gray-600 text-sm">
              Discover our range of educational resources for success.
            </p> */}
          </div>
          <ProductList />
        </div>
      </Container>
    </div>
  );
};

export default ExploreProducts;
