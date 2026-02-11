"use client";

import React, { useState, useCallback } from "react";
import Container from "@/components/layout/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight, Star, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ExperienceValor from "@/components/shared/experience-valor";

// Mock data for host testimonials
const testimonials = [
  {
    id: 1,
    name: "John A.",
    quote:
      "It is an amazing experience working as a Valor host. I have been able to monetize my driving skills, and it has provided a better opportunity for me",
  },
  {
    id: 2,
    name: "Sarah M.",
    quote:
      "Valor has transformed how I manage my fleet. The platform is easy to use and the support team is always available to help.",
  },
  {
    id: 3,
    name: "Michael O.",
    quote:
      "Being a Valor host has given me financial freedom. I can set my own schedule and work on my terms.",
  },
];

// Mock data for top hosts
const topHosts = [
  {
    id: 1,
    name: "SanueL James",
    trips: 10,
    hostSince: 2025,
    rating: 5,
  },
  {
    id: 2,
    name: "Oluwaseun Adeyemi",
    trips: 12,
    hostSince: 2025,
    rating: 5,
  },
  {
    id: 3,
    name: "Daniel Osondu",
    trips: 20,
    hostSince: 2025,
    rating: 5,
  },
  {
    id: 4,
    name: "Emeka Johnson",
    trips: 15,
    hostSince: 2024,
    rating: 5,
  },
  {
    id: 5,
    name: "Fatima Bello",
    trips: 18,
    hostSince: 2024,
    rating: 5,
  },
];

const WhatHostAreSaying = () => {
  const [testimonialApi, setTestimonialApi] = useState<CarouselApi>();
  const [hostApi, setHostApi] = useState<CarouselApi>();
  const [canScrollTestimonialPrev, setCanScrollTestimonialPrev] =
    useState(false);
  const [canScrollTestimonialNext, setCanScrollTestimonialNext] =
    useState(true);
  const [canScrollHostPrev, setCanScrollHostPrev] = useState(false);
  const [canScrollHostNext, setCanScrollHostNext] = useState(true);

  const onTestimonialSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollTestimonialPrev(api.canScrollPrev());
    setCanScrollTestimonialNext(api.canScrollNext());
  }, []);

  const onHostSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollHostPrev(api.canScrollPrev());
    setCanScrollHostNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!testimonialApi) return;
    onTestimonialSelect(testimonialApi);
    testimonialApi.on("select", onTestimonialSelect);
    testimonialApi.on("reInit", onTestimonialSelect);
    return () => {
      testimonialApi.off("select", onTestimonialSelect);
    };
  }, [testimonialApi, onTestimonialSelect]);

  React.useEffect(() => {
    if (!hostApi) return;
    onHostSelect(hostApi);
    hostApi.on("select", onHostSelect);
    hostApi.on("reInit", onHostSelect);
    return () => {
      hostApi.off("select", onHostSelect);
    };
  }, [hostApi, onHostSelect]);

  return (
    <div className="bg-white pt-[50px] md:pt-[80px] overflow-hidden">
      <Container className="px-5">
        {/* What our Hosts are Saying Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-[28px] md:text-[36px] font-[700] text-primary text-center mb-10">
            What our Hosts are Saying
          </h2>

          <div className="max-w-4xl mx-auto">
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
                    <div className="relative bg-[#EEF9FF] rounded-[20px] p-8 md:p-12 mx-4">
                      {/* Navigation Arrows */}
                      <button
                        onClick={() => testimonialApi?.scrollPrev()}
                        disabled={!canScrollTestimonialPrev}
                        className={cn(
                          "absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300  flex items-center justify-center transition-opacity",
                          !canScrollTestimonialPrev && "opacity-50",
                        )}
                      >
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                      </button>

                      <button
                        onClick={() => testimonialApi?.scrollNext()}
                        disabled={!canScrollTestimonialNext}
                        className={cn(
                          "absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300  flex items-center justify-center transition-opacity",
                          !canScrollTestimonialNext && "opacity-50",
                        )}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-600" />
                      </button>

                      {/* Testimonial Content */}
                      <div className="text-center px-12 md:px-16">
                        {/* Avatar Icon */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[#88CAEE] flex items-center justify-center mx-auto mb-3">
                          <User className="w-7 h-7 text-white" />
                        </div>

                        {/* Name */}
                        <p className="text-[16px] md:text-[18px] font-[600] text-primary mb-4">
                          {testimonial.name}
                        </p>

                        {/* Quote */}
                        <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px] md:leading-[28px]">
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </motion.div>

        {/* Meet the Host Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-[28px] md:text-[36px] font-[700] text-primary mb-2">
              Meet the Host
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#646464]">
              Top hosts on Valor
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel
              setApi={setHostApi}
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {topHosts.map((host) => (
                  <CarouselItem
                    key={host.id}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                      {/* Avatar Icon */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#646464] to-[#888888] flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>

                      {/* Host Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] md:text-[16px] font-[600] text-primary truncate">
                          {host.name}
                        </h4>
                        <p className="text-[12px] text-[#646464] mb-1">
                          {host.trips} trips • Host since {host.hostSince}
                        </p>
                        {/* Star Rating */}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3.5 h-3.5",
                                i < host.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation Arrows for Hosts */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => hostApi?.scrollPrev()}
                disabled={!canScrollHostPrev}
                className={cn(
                  "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-opacity",
                  !canScrollHostPrev && "opacity-50",
                )}
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => hostApi?.scrollNext()}
                disabled={!canScrollHostNext}
                className={cn(
                  "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-opacity",
                  !canScrollHostNext && "opacity-50",
                )}
              >
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </button>
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

export default WhatHostAreSaying;
