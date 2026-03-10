"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Container from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Icon } from "@iconify/react";
import Image from "next/image";

import LGA from "@/assets/lga.png";
import Prembly from "@/assets/prembly.png";
import Paystack from "@/assets/paystack.png";
import Fleet from "@/assets/fleet.png";
import { useRouter } from "next/navigation";
import PopularRidesCarousel from "./popular-rides-carousel";
import { fleet } from "@/apis/fleet";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";

// Partner logos
const partners = [
  {
    id: 1,
    name: "Lagos State Government",
    logo: LGA,
    className: "h-[40px] md:h-[50px] w-[60px] md:w-[60px]",
  },
  {
    id: 2,
    name: "Prembly",
    logo: Prembly,
    className: "h-[40px] md:h-[100px] w-[100px] md:w-[150px]",
  },
  {
    id: 3,
    name: "Paystack",
    logo: Paystack,
    className: "h-[40px] md:h-[100px] w-[100px] md:w-[150px]",
  },
  {
    id: 4,
    name: "Fleet",
    logo: Fleet,
    className: "h-[40px] md:h-[50px] w-[100px] md:w-[120px]",
  },
];

// Mapped ride shape for cards
export interface PopularRide {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapSpecialDeals = (data: any[]): PopularRide[] =>
  data.map((deal) => {
    const { carMake, carModel, yearString, city } = deal.carDetails;
    const capitalize = (s: string) =>
      s
        .split("-")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("-");
    return {
      id: deal._id,
      name: `${capitalize(carMake)} ${capitalize(carModel)} ${yearString}`,
      location: city ? `${city}, Nigeria` : "Nigeria",
      price: deal.pricing?.minPrice ?? 0,
      rating: deal.vehicleRating ?? 0,
      image: deal.carImages?.frontView?.url ?? "",
    };
  });

const CarCardSkeleton = () => (
  <div className="rounded-[16px] overflow-hidden bg-white shadow-sm border border-gray-100">
    <Skeleton className="h-[250px] sm:h-[200px] w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-2/3" />
    </div>
  </div>
);

const CarCard = ({ car, index }: { car: PopularRide; index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const router = useRouter();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => router.push(`/search/${car.id}`)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="rounded-[16px] overflow-hidden bg-white shadow-sm border border-gray-100 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-[250px] sm:h-[200px] w-full bg-gray-200">
        {car.image && (
          <Image
            src={car.image}
            alt={car.name}
            priority
            fill
            className="object-cover"
          />
        )}
        {/* Rating Badge */}
        {car.rating > 0 && (
          <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-500 text-sm"
            />
            <span className="text-sm font-medium">{car.rating}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-[18px] md:text-[24px] font-[700] text-gray-900 mb-2 capitalize">
          {car.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Icon
            icon="mdi:navigation-variant"
            className="text-orange-400 text-[16px] md:text-[18px]"
          />
          <span className="text-[14px] md:text-[16px] text-[#646464]">
            {car.location}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[12px] md:text-[14px] text-[#646464]">
            From
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[20px] md:text-[28px] font-[700] text-primary">
            ₦{car.price.toLocaleString()}
          </span>
          <span className="text-[14px] md:text-[16px] text-[#646464]">
            /Day
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Welcome = ({
  headerClass,
  sectionTitle,
  ctaText,
}: {
  headerClass?: string;
  sectionTitle?: string;
  ctaText?: string;
}) => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: partnersRef, inView: partnersInView } = useInView({
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

  const buttonVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
    },
  };

  const router = useRouter();

  const { data: specialDeals, isLoading: isDealsLoading } = useQuery(
    "specialDeals",
    () => fleet.getSpecialDeals(),
    {
      staleTime: 1000 * 60 * 30, // Cache for 30 minutes
      refetchOnWindowFocus: false,
    },
  );

  const popularRides: PopularRide[] = specialDeals?.data
    ? mapSpecialDeals(specialDeals.data)
    : [];

  return (
    <div className="px-5 bg-white">
      <Container className="py-[30px] sm:py-[70px]">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full">
            <div className="sm:flex hidden items-start justify-between flex-col md:flex-row gap-3 md:gap-10">
              {/* <motion.p
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={descriptionVariants}
                className="w-full  md:w-[60%] text-[14px] text-[#323232] leading-[20px] md:leading-[28px] md:text-[20px] font-[400] md:text-base"
              >
                Handpicked premium vehicles from trusted hosts across
                Nigeria—&gt;Explore our Popular Rides, handpicked from the
                vehicles most trusted and chosen by Valor users.
              </motion.p> */}
              <motion.h1
                ref={headerRef}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={headerVariants}
                className={cn(
                  "w-full sm:block hidden text-[24px] text-primary leading-[56px] md:mb-3 md:text-[48px] font-[700] text-left",
                  headerClass,
                )}
              >
                {sectionTitle || "Popular Rides"}
              </motion.h1>
              <motion.div
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                variants={buttonVariants}
              >
                <Button
                  onClick={() => router.push("/search")}
                  className="rounded-[36px] w-[139px] h-[49px] sm:flex hidden text-[14px] text-center font-[400] p-[14px_40px] bg-primary text-white hover:bg-primary/90 duration-200"
                >
                  {ctaText || "View All"}
                </Button>
              </motion.div>
            </div>
            <div className="mt-7 sm:grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isDealsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <CarCardSkeleton key={i} />
                  ))
                : popularRides.map((car, index) => (
                    <CarCard key={car.id} car={car} index={index} />
                  ))}
            </div>

            {/*carousel for mobile */}
            {/* <div className="mt-[15px] sm:hidden block">
              <Carousel className="w-full">
                <div className=" w-full flex items-center justify-between">
                  <motion.h1
                    ref={headerRef}
                    initial="hidden"
                    animate={headerInView ? "visible" : "hidden"}
                    variants={headerVariants}
                    className={cn(
                      "w-full text-[24px] text-primary leading-[56px] md:mb-3 md:text-[48px] font-[700] text-left",
                      headerClass,
                    )}
                  >
                    Popular Rides
                  </motion.h1>

                  <div className="flex items-center justify-end gap-7">
                    <div className="relative rounded-full">
                      <CarouselPrevious className="absolute top-0 right-0 z-10 bg-white rounded-full p-2 shadow-md" />
                    </div>

                    <div className="relative rounded-full">
                      <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white rounded-full p-2 shadow-md" />
                    </div>
                  </div>
                </div>
                <CarouselContent className="mt-10">
                  {popularRides.map((car, index) => (
                    <CarouselItem key={car.id}>
                      <CarCard car={car} index={index} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div> */}
            <PopularRidesCarousel
              popularRides={popularRides}
              isLoading={isDealsLoading}
            />

            {/* Partners Section */}
            <motion.div
              ref={partnersRef}
              initial={{ opacity: 0, y: 40 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-16 pt-10 border-t border-gray-100"
            >
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-24">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={partnersInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className={`relative flex items-center justify-center hover:grayscale-0 transition-all duration-300 ${partner.className}`}
                  >
                    <Image
                      priority
                      src={partner.logo}
                      alt={partner.name}
                      className={`object-contain`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Welcome;
