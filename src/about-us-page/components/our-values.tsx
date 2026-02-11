"use client";

import Container from "@/components/layout/container";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import WhyValorImage from "@/assets/our-values-2.png";
import Image from "next/image";
import ExperienceValor from "@/components/shared/experience-valor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for customer testimonials
const testimonials = [
  {
    id: 1,
    name: "Jane A.",
    quote:
      "Valor made my trip stress-free and comfortable! The car was pristine, and the service was outstanding!",
  },
  {
    id: 2,
    name: "David K.",
    quote:
      "I've used many car rental services, but Valor stands out for their professionalism and quality vehicles.",
  },
  {
    id: 3,
    name: "Chioma N.",
    quote:
      "Excellent service from start to finish. The booking process was seamless and the car exceeded my expectations.",
  },
];

const OurValues = () => {
  const [testimonialApi, setTestimonialApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!testimonialApi) return;
    onSelect(testimonialApi);
    testimonialApi.on("select", onSelect);
    testimonialApi.on("reInit", onSelect);
    return () => {
      testimonialApi.off("select", onSelect);
    };
  }, [testimonialApi, onSelect]);

  return (
    <div className="bg-white pt-[10px] md:pt-[80px] overflow-hidden">
      <Container className="px-0 sm:px-5">
        <motion.div
          className="sm:mt-24 flex flex-col lg:flex-row items-start sm:gap-10 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Phone mockup placeholder */}
          <div className="flex-1 px-5 sm:px-0 pt-5 sm:pt-0">
            <div className="">
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-8">
                Our Values
              </h2>
              <div className="space-y-8">
                {/* Customer Satisfaction */}
                <div>
                  <h4 className="text-[18px] md:text-[20px] font-[700] text-primary mb-2">
                    Customer Satisfaction:
                  </h4>
                  <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px]">
                    We prioritize delivering exceptional service and experiences
                    that exceed expectations.
                  </p>
                </div>

                {/* Affordability */}
                <div>
                  <h4 className="text-[18px] md:text-[20px] font-[700] text-primary mb-2">
                    Affordability
                  </h4>
                  <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px]">
                    We believe in offering fair and competitive pricing, making
                    car rentals accessible to all.
                  </p>
                </div>

                {/* Safety & Security */}
                <div>
                  <h4 className="text-[18px] md:text-[20px] font-[700] text-primary mb-2">
                    Safety & Security
                  </h4>
                  <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px]">
                    We ensure peace of mind by vetting drivers and maintaining
                    high safety standards for our customers.
                  </p>
                </div>

                {/* Innovation */}
                <div>
                  <h4 className="text-[18px] md:text-[20px] font-[700] text-primary mb-2">
                    Innovation
                  </h4>
                  <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px]">
                    We continuously seek new ways to improve the car rental and
                    ridesharing experience, challenging traditional methods for
                    a better future.
                  </p>
                </div>
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
            <div className="flex p-0 items-center h-[400px] justify-center sm:justify-start">
              <Image
                src={WhyValorImage}
                alt="Why Valor"
                width={500}
                className="object-contain sm:rounded-[36px] w-fit h-[400px]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Customer testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="px-5 sm:px-0 md:mt-24 pb-16"
        >
          <div className="flex flex-col items-start lg:items-center gap-8 lg:gap-16 px-5 sm:px-0">
            {/* Title */}
            <h2 className="text-[28px] text-center md:text-[36px] font-[700] text-primary whitespace-nowrap">
              Customer Testimonials
            </h2>

            {/* Carousel */}
            <div className="flex-1 w-full">
              <Carousel
                setApi={setTestimonialApi}
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-center py-8 px-4"
                      >
                        {/* Quote */}
                        <p className="text-[18px] md:text-[24px] font-[500] text-primary leading-[28px] md:leading-[36px] max-w-2xl mx-auto mb-8">
                          {testimonial.quote}
                        </p>

                        {/* Avatar and Name */}
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#88CAEE] flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-[16px] md:text-[18px] font-[500] text-primary">
                            {testimonial.name}
                          </span>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={() => testimonialApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className={cn(
                    "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-all hover:bg-gray-50",
                    !canScrollPrev && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => testimonialApi?.scrollNext()}
                  disabled={!canScrollNext}
                  className={cn(
                    "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-all hover:bg-gray-50",
                    !canScrollNext && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      <Container className="mb-8 px-5">
        <div className="hidden lg:block">
          <ExperienceValor />
        </div>
      </Container>

      <div className="lg:hidden block">
        <ExperienceValor />
      </div>
    </div>
  );
};

export default OurValues;
