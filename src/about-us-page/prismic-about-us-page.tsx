"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "@/components/layout/container";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import ExperienceValor from "@/components/shared/experience-valor";
import {
  KeyTextField,
  RichTextField,
  ImageField,
  isFilled,
} from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

// Fallback images (used when Prismic images are not set)
import HeroBgFallback from "@/assets/stylish-black-woman-car-salon-2.jpg";
import MissionFallback from "@/assets/mission.jpg";
import VisionFallback from "@/assets/vision.png";
import WhyValorFallback from "@/assets/why-valor-3.png";
import OurStoryFallback from "@/assets/our-story-2.png";
import OurValuesFallback from "@/assets/our-values-2.png";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ValueItem {
  value_title?: KeyTextField;
  value_description?: KeyTextField;
}

interface TestimonialItem {
  testimonial_name?: KeyTextField;
  testimonial_quote?: KeyTextField;
}

interface AboutUsPageData {
  // Hero
  hero_title?: RichTextField;
  hero_subtitle?: KeyTextField;
  hero_image?: ImageField;

  // Mission & Vision
  mission_vision_title?: KeyTextField;
  mission_title?: KeyTextField;
  mission_description?: KeyTextField;
  mission_image?: ImageField;
  vision_title?: KeyTextField;
  vision_description?: KeyTextField;
  vision_image?: ImageField;

  // Why Valor
  why_valor_title?: KeyTextField;
  why_valor_description?: KeyTextField;
  why_valor_image?: ImageField;

  // Our Story
  our_story_title?: KeyTextField;
  our_story_description?: KeyTextField;
  our_story_image?: ImageField;

  // Our Values
  our_values_title?: KeyTextField;
  our_values_image?: ImageField;
  values?: ValueItem[];

  // Testimonials
  testimonials_title?: KeyTextField;
  testimonials?: TestimonialItem[];

  // SEO
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_keywords?: KeyTextField;
  og_image?: ImageField;
}

interface PrismicAboutUsPageProps {
  data: AboutUsPageData;
}

// ─── Default data ───────────────────────────────────────────────────────────

const defaultValues: ValueItem[] = [
  {
    value_title: "Customer Satisfaction:",
    value_description:
      "We prioritize delivering exceptional service and experiences that exceed expectations.",
  },
  {
    value_title: "Affordability",
    value_description:
      "We believe in offering fair and competitive pricing, making car rentals accessible to all.",
  },
  {
    value_title: "Safety & Security",
    value_description:
      "We ensure peace of mind by vetting drivers and maintaining high safety standards for our customers.",
  },
  {
    value_title: "Innovation",
    value_description:
      "We continuously seek new ways to improve the car rental and ridesharing experience, challenging traditional methods for a better future.",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    testimonial_name: "Jane A.",
    testimonial_quote:
      "Valor made my trip stress-free and comfortable! The car was pristine, and the service was outstanding!",
  },
  {
    testimonial_name: "David K.",
    testimonial_quote:
      "I've used many car rental services, but Valor stands out for their professionalism and quality vehicles.",
  },
  {
    testimonial_name: "Chioma N.",
    testimonial_quote:
      "Excellent service from start to finish. The booking process was seamless and the car exceeded my expectations.",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

const PrismicAboutUsPage = ({ data }: PrismicAboutUsPageProps) => {
  // Hero animations
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Testimonials carousel
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

  // Resolve data with fallbacks
  const heroImage = data.hero_image?.url || HeroBgFallback;
  const missionImage = data.mission_image?.url || null;
  const visionImage = data.vision_image?.url || null;
  const whyValorImage = data.why_valor_image?.url || null;
  const ourStoryImage = data.our_story_image?.url || null;
  const ourValuesImage = data.our_values_image?.url || null;
  const values =
    data.values && data.values.length > 0 ? data.values : defaultValues;
  const testimonials =
    data.testimonials && data.testimonials.length > 0
      ? data.testimonials
      : defaultTestimonials;

  const benefits = [
    {
      title: data.mission_title || "Mission",
      desc:
        data.mission_description ||
        "To become the Airbnb of car rentals by simplifying and automating the process of renting a car.",
      img: missionImage ? (
        <div className="w-full pb-5 flex items-center justify-center">
          <Image
            src={missionImage}
            alt="Mission"
            width={200}
            height={200}
            priority
            className="w-[200px] object-contain"
          />
        </div>
      ) : (
        <div className="w-full pb-5 flex items-center justify-center">
          <Image
            src={MissionFallback}
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
      title: data.vision_title || "Vision",
      desc:
        data.vision_description ||
        "To dominate the car rental space by providing user-friendly cutting-edge technology. Starting operations in Nigeria then expanding to the rest of the world.",
      img: visionImage ? (
        <div className="w-full pb-5 flex items-center justify-center">
          <Image
            src={visionImage}
            alt="Vision"
            width={200}
            height={200}
            priority
            className="w-[200px] mt-3 object-contain"
          />
        </div>
      ) : (
        <div className="w-full pb-5 flex items-center justify-center">
          <Image
            src={VisionFallback}
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
    <div className="bg-white">
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <Container className="pt-[30px] px-0 sm:px-5 sm:pt-[70px]">
        <div className="flex px-5 sm:px-0 flex-col items-center justify-center w-full">
          <motion.h1
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full text-[24px] leading-[24px] md:leading-[64px] md:text-[64px] font-[700] text-primary text-left mb-2 [&>p]:m-0"
          >
            {isFilled.richText(data.hero_title) ? (
              <PrismicRichText field={data.hero_title} />
            ) : (
              <>
                Experience Luxury and
                <br /> Simplicity with Valor
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full font-[400] text-left text-[16px] md:text-[20px] text-[#646464] mb-5 sm:mb-8"
          >
            {data.hero_subtitle ||
              "Your ultimate destination for premium car rentals in Nigeria."}
          </motion.p>
        </div>

        <div className="relative w-full">
          {typeof heroImage === "string" ? (
            <Image
              src={heroImage}
              height={500}
              width={1440}
              priority
              alt="About Us Hero"
              className="w-full h-[300px] md:rounded-[32px] md:h-[500px] object-cover"
            />
          ) : (
            <Image
              src={heroImage}
              height={500}
              width={1440}
              priority
              alt="About Us Hero"
              className="w-full h-[300px] md:rounded-[32px] md:h-[500px] object-cover"
            />
          )}
        </div>
      </Container>

      {/* ─── Mission & Vision ─────────────────────────────────────────── */}
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
                {data.mission_vision_title || "Company Mission & Vision:"}
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

      {/* ─── Why Valor Section ────────────────────────────────────────── */}
      <div className="bg-white pt-[10px] md:pt-[80px] overflow-hidden">
        <Container className="px-0 sm:px-5">
          <motion.div
            className="sm:mt-24 flex flex-col lg:flex-row items-start gap-0 sm:gap-10 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex-1 px-5 sm:px-0 pt-5 sm:pt-0">
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
                {data.why_valor_title || "Why Valor"}
              </h2>
              <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] sm:mb-10">
                {data.why_valor_description ||
                  "At Valor, we've streamlined the car rental process across Africa, offering a seamless experience and the best prices. Our app goes beyond just rentals—by vetting drivers, we ensure safety and security for all users."}
              </p>
            </div>

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
              <div className="flex items-start sm:items-center justify-center sm:justify-start">
                {whyValorImage ? (
                  <Image
                    src={whyValorImage}
                    alt="Why Valor"
                    width={500}
                    height={400}
                    className="object-contain sm:rounded-[36px] w-fit h-[400px]"
                  />
                ) : (
                  <Image
                    src={WhyValorFallback}
                    alt="Why Valor"
                    width={500}
                    className="object-contain sm:rounded-[36px] w-fit h-[400px]"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* ─── Our Story Section ────────────────────────────────────────── */}
      <div className="bg-white pt-[10px] md:pt-[80px] overflow-hidden">
        <Container className="px-0 sm:px-5">
          <motion.div
            className="sm:mt-24 flex flex-col-reverse lg:flex-row items-start sm:gap-10 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
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
              <div className="flex items-center justify-center sm:justify-end">
                {ourStoryImage ? (
                  <Image
                    src={ourStoryImage}
                    alt="Our Story"
                    width={500}
                    height={400}
                    className="object-contain sm:rounded-[36px] w-fit h-[400px]"
                  />
                ) : (
                  <Image
                    src={OurStoryFallback}
                    alt="Our Story"
                    width={500}
                    className="object-contain sm:rounded-[36px] w-fit h-[400px]"
                  />
                )}
              </div>
            </motion.div>

            <div className="flex-1 px-5 sm:px-0 pt-5 sm:pt-0">
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
                {data.our_story_title || "Our Story"}
              </h2>
              <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] sm:mb-10">
                {data.our_story_description ||
                  "Founded in 2021, Valor was born from our drive to challenge the status quo and create a better way for car rentals and ridesharing in Nigeria. As customer satisfaction declined and prices soared, we developed a platform designed to address these challenges, offering a more reliable, affordable, and user-friendly solution."}
              </p>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* ─── Our Values Section ───────────────────────────────────────── */}
      <div className="bg-white pt-[10px] md:pt-[80px] overflow-hidden">
        <Container className="px-0 sm:px-5">
          <motion.div
            className="sm:mt-24 flex flex-col lg:flex-row items-start sm:gap-10 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex-1 px-5 sm:px-0 pt-5 sm:pt-0">
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-8">
                {data.our_values_title || "Our Values"}
              </h2>
              <div className="space-y-8">
                {values.map((value, i) => (
                  <div key={i}>
                    <h4 className="text-[18px] md:text-[20px] font-[700] text-primary mb-2">
                      {value.value_title}
                    </h4>
                    <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px]">
                      {value.value_description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

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
                {ourValuesImage ? (
                  <Image
                    src={ourValuesImage}
                    alt="Our Values"
                    width={500}
                    height={400}
                    className="object-contain sm:rounded-[36px] w-fit h-[400px]"
                  />
                ) : (
                  <Image
                    src={OurValuesFallback}
                    alt="Our Values"
                    width={500}
                    className="object-contain sm:rounded-[36px] w-fit h-[400px]"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Customer Testimonials ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="px-5 sm:px-0 md:mt-24 pb-16"
          >
            <div className="flex flex-col items-start lg:items-center gap-8 lg:gap-16 px-5 sm:px-0">
              <h2 className="text-[28px] text-center md:text-[36px] font-[700] text-primary whitespace-nowrap">
                {data.testimonials_title || "Customer Testimonials"}
              </h2>

              <div className="flex-1 w-full">
                <Carousel
                  setApi={setTestimonialApi}
                  opts={{ align: "center", loop: true }}
                  className="w-full"
                >
                  <CarouselContent>
                    {testimonials.map((testimonial, i) => (
                      <CarouselItem key={i}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-center py-8 px-4"
                        >
                          <p className="text-[18px] md:text-[24px] font-[500] text-primary leading-[28px] md:leading-[36px] max-w-2xl mx-auto mb-8">
                            {testimonial.testimonial_quote}
                          </p>
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#88CAEE] flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-[16px] md:text-[18px] font-[500] text-primary">
                              {testimonial.testimonial_name}
                            </span>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

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

        {/* ─── Experience Valor (static, not from Prismic) ─────────────── */}
        <Container className="mb-8 px-5">
          <div className="hidden lg:block">
            <ExperienceValor />
          </div>
        </Container>

        <div className="lg:hidden block">
          <ExperienceValor />
        </div>
      </div>
    </div>
  );
};

export default PrismicAboutUsPage;
