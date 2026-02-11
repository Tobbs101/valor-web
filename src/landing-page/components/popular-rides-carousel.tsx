import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Car } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const CarCard = ({
  car,
  index,
}: {
  car: {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: StaticImageData;
  };
  index: number;
}) => {
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
      onClick={() => router.push(`/search/${index + 1}`)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="rounded-[16px] overflow-hidden bg-white shadow-sm border border-gray-100 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-[250px] sm:h-[200px] w-full bg-gray-200">
        <Image
          src={car.image}
          alt={car.name}
          priority
          fill
          className="object-cover"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
          <Icon
            icon="material-symbols:star"
            className="text-yellow-500 text-sm"
          />
          <span className="text-sm font-medium">{car.rating}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-[18px] md:text-[24px] font-[700] text-gray-900 mb-2">
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

const PopularRidesCarousel = ({ popularRides }: { popularRides: any[] }) => {
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

  const router = useRouter();

  return (
    <div className="mt-[15px] sm:hidden block">
      <Carousel className="w-full">
        <div className="w-full flex items-center justify-between">
          <motion.h1
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={headerVariants}
            className={cn(
              "w-full text-[24px] text-primary leading-[56px] md:mb-3 md:text-[48px] font-[700] text-left",
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

        <CarouselContent className="mt-5">
          {popularRides.map((car, index) => (
            <CarouselItem key={car.id}>
              <CarCard car={car} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="w-full mt-5">
          <Button
            onClick={() => router.push("/search")}
            className="rounded-[36px] w-[139px] h-[49px] flex text-[14px] text-center font-[400] p-[14px_40px] bg-primary text-white hover:bg-primary/90 duration-200"
          >
            View All
          </Button>
        </div>
      </Carousel>
    </div>
  );
};

export default PopularRidesCarousel;
