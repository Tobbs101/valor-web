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
import { ArrowLeft, ArrowRight, Star, User } from "lucide-react";
import ExperienceValor from "@/components/shared/experience-valor";
import {
  KeyTextField,
  RichTextField,
  ImageField,
  isFilled,
} from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

// Fallback images
import EarnExtraImage from "@/assets/earn-extra-income.svg";
import FlexibleSchedulingImage from "@/assets/schedule-1.svg";
import ContractImage from "@/assets/contract-1.svg";
import SecurePayments from "@/assets/secure-payments.svg";
import SimpleManagement from "@/assets/simple-management.svg";
import HowItWorksImage from "@/assets/report-bug.png";
import OnboardImage from "@/assets/327shots.png";

// ─── Types ──────────────────────────────────────────────────────────────────

interface BenefitItem {
  benefit_title?: KeyTextField;
  benefit_description?: KeyTextField;
  benefit_image?: ImageField;
  image_location?: KeyTextField;
}

interface HostStepItem {
  step_title?: KeyTextField;
  step_description?: KeyTextField;
}

interface OnboardStepItem {
  step_title?: KeyTextField;
  step_description?: KeyTextField;
}

interface TestimonialItem {
  testimonial_name?: KeyTextField;
  testimonial_quote?: KeyTextField;
}

interface TopHostItem {
  host_name?: KeyTextField;
  host_trips?: number;
  host_since?: number;
  host_rating?: number;
}

interface BecomeAHostPageData {
  // Hero
  hero_title?: RichTextField;
  hero_subtitle?: KeyTextField;

  // Benefits section
  benefits_title?: KeyTextField;
  benefits_subtitle?: KeyTextField;
  benefits?: BenefitItem[];

  // How to become a host
  how_to_title?: KeyTextField;
  how_to_subtitle?: KeyTextField;
  how_to_image?: ImageField;
  how_to_steps?: HostStepItem[];

  // Onboard your driver
  onboard_title?: KeyTextField;
  onboard_subtitle?: KeyTextField;
  onboard_image?: ImageField;
  onboard_steps?: OnboardStepItem[];
  driver_app_title?: KeyTextField;
  app_store_url?: KeyTextField;
  play_store_url?: KeyTextField;

  // What hosts are saying
  testimonials_title?: KeyTextField;
  testimonials?: TestimonialItem[];

  // Meet the host
  meet_host_title?: KeyTextField;
  meet_host_subtitle?: KeyTextField;
  top_hosts?: TopHostItem[];

  // SEO
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_keywords?: KeyTextField;
  og_image?: ImageField;
}

interface PrismicBecomeAHostPageProps {
  data: BecomeAHostPageData;
}

// ─── Default data ───────────────────────────────────────────────────────────

const defaultBenefits: {
  title: string;
  desc: string;
  fallbackImg: React.ReactNode;
  imageLocation: string;
}[] = [
  {
    title: "Earn Extra Income",
    desc: "Monetize your idle car by renting it out to trusted customers.",
    fallbackImg: (
      <div className="w-full flex items-center justify-left">
        <Image
          src={EarnExtraImage}
          alt="Earn Extra Income"
          priority
          width={200}
          className="w-[200px] object-contain"
        />
      </div>
    ),
    imageLocation: "bottom",
  },
  {
    title: "Flexible Scheduling",
    desc: "Decide when and for how long your car is available for rent.",
    fallbackImg: (
      <div className="w-full flex items-center justify-center">
        <Image
          src={FlexibleSchedulingImage}
          alt="Flexible Scheduling"
          width={200}
          priority
          className="w-[200px] h-full mt-6 object-contain"
        />
      </div>
    ),
    imageLocation: "top",
  },
  {
    title: "Long term contracts",
    desc: "Top performing hosts get long term contracts.",
    fallbackImg: (
      <div className="w-full flex items-center justify-end">
        <Image
          src={ContractImage}
          alt="Long term contracts"
          width={200}
          priority
          className="w-[200px] h-full mr-5 object-contain"
        />
      </div>
    ),
    imageLocation: "bottom",
  },
  {
    title: "Secure Payments",
    desc: "Receive your earnings directly into your bank account without any hassle.",
    fallbackImg: (
      <div className="w-full flex items-center justify-end">
        <Image
          src={SecurePayments}
          alt="Secure Payments"
          width={200}
          priority
          className="w-[200px] mr-10 mb-3 object-contain"
        />
      </div>
    ),
    imageLocation: "bottom",
  },
  {
    title: "Simple Management",
    desc: "Use our user-friendly app to manage bookings, communicate with renters, and track earnings.",
    fallbackImg: (
      <div className="w-full flex items-center justify-end">
        <Image
          src={SimpleManagement}
          alt="Simple Management"
          width={200}
          priority
          className="w-[200px] mr-10 object-contain"
        />
      </div>
    ),
    imageLocation: "bottom",
  },
];

const defaultHostSteps: HostStepItem[] = [
  {
    step_title: "Sign Up",
    step_description:
      "Create an account and register as a host on the Valor app.",
  },
  {
    step_title: "List Your Car",
    step_description:
      "Provide details about your vehicle, upload photos, and set your rental rates and availability.",
  },
  {
    step_title: "Get Verified",
    step_description:
      "Complete the verification process to ensure a safe and secure platform for all users.",
  },
  {
    step_title: "Accept Bookings",
    step_description:
      "Review and accept booking requests from potential customers.",
  },
  {
    step_title: "Earn Money",
    step_description:
      "Once the car is rented out, sit back, relax, and watch your earnings grow.",
  },
];

const defaultOnboardSteps: OnboardStepItem[] = [
  {
    step_title: "Navigate to the fleet page",
    step_description:
      "While on the app, navigate to the fleet page, then select the drivers tab.",
  },
  {
    step_title: "Click on the Add(+) button",
    step_description:
      "When on the drivers tab, click on the add button to input driver's info, and valid ID card.",
  },
  {
    step_title: "Assign a Vehicle to driver",
    step_description:
      "Once the driver has been created and approved, you can assign a driver to a vehicle, and to a booked job.",
  },
  {
    step_title: "Driver downloads mobile app",
    step_description:
      "After account creation, the driver must download the Valor Driver mobile app to complete trips. The driver should log in using the email address and phone number added by the host during onboarding.",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    testimonial_name: "John A.",
    testimonial_quote:
      "It is an amazing experience working as a Valor host. I have been able to monetize my driving skills, and it has provided a better opportunity for me",
  },
  {
    testimonial_name: "Sarah M.",
    testimonial_quote:
      "Valor has transformed how I manage my fleet. The platform is easy to use and the support team is always available to help.",
  },
  {
    testimonial_name: "Michael O.",
    testimonial_quote:
      "Being a Valor host has given me financial freedom. I can set my own schedule and work on my terms.",
  },
];

const defaultTopHosts: TopHostItem[] = [
  {
    host_name: "Samuel James",
    host_trips: 10,
    host_since: 2025,
    host_rating: 5,
  },
  {
    host_name: "Oluwaseun Adeyemi",
    host_trips: 12,
    host_since: 2025,
    host_rating: 5,
  },
  {
    host_name: "Daniel Osondu",
    host_trips: 20,
    host_since: 2025,
    host_rating: 5,
  },
  {
    host_name: "Emeka Johnson",
    host_trips: 15,
    host_since: 2024,
    host_rating: 5,
  },
  {
    host_name: "Fatima Bello",
    host_trips: 18,
    host_since: 2024,
    host_rating: 5,
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

const PrismicBecomeAHostPage = ({ data }: PrismicBecomeAHostPageProps) => {
  // Animation hooks
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
  const [canScrollTestimonialPrev, setCanScrollTestimonialPrev] =
    useState(false);
  const [canScrollTestimonialNext, setCanScrollTestimonialNext] =
    useState(true);

  // Hosts carousel
  const [hostApi, setHostApi] = useState<CarouselApi>();
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

  // Resolve data with fallbacks
  const prismicBenefits =
    data.benefits && data.benefits.length > 0 ? data.benefits : null;
  const howToSteps =
    data.how_to_steps && data.how_to_steps.length > 0
      ? data.how_to_steps
      : defaultHostSteps;
  const onboardSteps =
    data.onboard_steps && data.onboard_steps.length > 0
      ? data.onboard_steps
      : defaultOnboardSteps;
  const testimonials =
    data.testimonials && data.testimonials.length > 0
      ? data.testimonials
      : defaultTestimonials;
  const topHosts =
    data.top_hosts && data.top_hosts.length > 0
      ? data.top_hosts
      : defaultTopHosts;
  const howToImage = data.how_to_image?.url || null;
  const onboardImageUrl = data.onboard_image?.url || null;

  // Build benefits with images
  const benefits = prismicBenefits
    ? prismicBenefits.map((b, i) => ({
        title: b.benefit_title || defaultBenefits[i]?.title || "",
        desc: b.benefit_description || defaultBenefits[i]?.desc || "",
        img: b.benefit_image?.url ? (
          <div className="w-full flex items-center justify-center">
            <Image
              src={b.benefit_image.url}
              alt={b.benefit_title || "Benefit"}
              width={200}
              height={200}
              priority
              className="w-[200px] object-contain"
            />
          </div>
        ) : (
          defaultBenefits[i]?.fallbackImg || null
        ),
        imageLocation:
          b.image_location || defaultBenefits[i]?.imageLocation || "bottom",
      }))
    : defaultBenefits.map((b) => ({
        title: b.title,
        desc: b.desc,
        img: b.fallbackImg,
        imageLocation: b.imageLocation,
      }));

  const topBenefits = benefits.slice(0, 3);
  const bottomBenefits = benefits.slice(3);

  return (
    <div className="bg-white">
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <Container className="pt-[30px] px-5 sm:pt-[70px]">
        <div className="flex flex-col items-center justify-center w-full">
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
                Turn Your Vehicle into Extra
                <br /> Income with Valor
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full font-[400] text-left text-[16px] md:text-[20px] text-[#646464] mb-8"
          >
            {data.hero_subtitle ||
              "Join the Valor community and start earning by renting out your vehicle."}
          </motion.p>
        </div>
      </Container>

      {/* ─── Benefits Section ─────────────────────────────────────────── */}
      <div className="bg-primary md:bg-transparent mt-[10px] sm:mt-[70px]">
        <Container className="px-5">
          <div>
            <div className="w-full relative py-10 px-4 md:px-12 flex flex-col items-center">
              <div className="absolute hidden sm:block top-0 left-0 w-full rounded-[32px] h-[50%] bg-primary"></div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-white z-[1] text-[24px] md:text-[48px] font-[500] md:font-[700] text-center mb-2"
              >
                {data.benefits_title || "Become a Host"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-[#F0F0F0] z-[1] text-[14px] md:text-[18px] text-center mb-8 max-w-2xl mx-auto"
              >
                {data.benefits_subtitle ||
                  "Valor offers an easy and secure way for you to make money by sharing your vehicle. Here are just a few benefits of becoming a host with us:"}
              </motion.p>

              {/* Desktop grid */}
              <div
                ref={gridRef}
                className="hidden z-[1] md:grid grid-cols-3 gap-6 w-full"
              >
                {topBenefits.map((b, i) => (
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
              <div className="hidden z-[1] md:grid grid-cols-2 mt-6 gap-6 w-full">
                {bottomBenefits.map((b, i) => (
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
                  <div className="flex items-center justify-center gap-7">
                    <CarouselPrevious className="relative left-0" />
                    <CarouselNext className="relative right-0" />
                  </div>
                  <CarouselContent className="mt-8">
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

      {/* ─── How To Become A Host ─────────────────────────────────────── */}
      <div className="bg-white pt-[50px] md:pt-[80px] overflow-hidden">
        <Container className="px-5">
          <motion.div
            className="mt-24 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Left side - Phone mockup */}
            <div className="flex-1 flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[450px] overflow-hidden min-h-[600px] bg-[#EEF9FF] rounded-[30px] flex items-center justify-center">
                <div className="flex items-center justify-center text-[#646464]">
                  {howToImage ? (
                    <Image
                      priority
                      src={howToImage}
                      alt="How to become a host"
                      width={687}
                      height={858}
                      className="object-cover w-[687px] h-[858px]"
                    />
                  ) : (
                    <Image
                      priority
                      src={HowItWorksImage}
                      alt="How to become a host"
                      width={687}
                      height={858}
                      className="object-cover w-[687px] h-[858px]"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Steps */}
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
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
                {data.how_to_title || "How To Become A Valor Host"}
              </h2>
              <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] mb-10">
                {data.how_to_subtitle ||
                  "Listing your car on Valor is easy! Follow these steps to get started:"}
              </p>

              {/* Steps Timeline */}
              <div className="relative">
                <div className="absolute left-[5px] top-[12px] bottom-[12px] w-[2px] border-l-2 border-dashed border-[#88CAEE]"></div>
                <div className="space-y-10">
                  {howToSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-6 relative"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.2 + i * 0.1, duration: 0.4 },
                        },
                      }}
                    >
                      <div className="flex-shrink-0 mt-1 z-10">
                        <div className="w-[12px] h-[12px] bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                          {step.step_title}
                        </h4>
                        <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                          {step.step_description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* ─── Onboard Your Driver ──────────────────────────────────────── */}
      <div className="bg-white pt-[50px] md:pt-[80px] overflow-hidden">
        <Container className="px-5">
          <motion.div
            className="mt-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Left side - Steps */}
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
              <h2 className="text-[32px] md:text-[40px] font-[700] text-primary leading-[40px] md:leading-[48px] mb-4">
                {data.onboard_title || "How To Onboard Your Driver"}
              </h2>
              <p className="text-[14px] font-[400] md:text-[18px] text-[#646464] leading-[26px] mb-10">
                {data.onboard_subtitle ||
                  "Onboard your drivers on the Valor platform so they can complete trips on your behalf."}
              </p>

              {/* Steps Timeline */}
              <div className="relative">
                <div className="absolute left-[5px] top-[12px] bottom-[12px] w-[2px] border-l-2 border-dashed border-[#88CAEE]"></div>
                <div className="space-y-10">
                  {onboardSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-6 relative"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.2 + i * 0.1, duration: 0.4 },
                        },
                      }}
                    >
                      <div className="flex-shrink-0 mt-1 z-10">
                        <div className="w-[12px] h-[12px] bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
                          {step.step_title}
                        </h4>
                        <p className="text-[14px] text-[#535353] leading-[20px] md:leading-[22px]">
                          {step.step_description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Get the Driver's App */}
              <div className="mt-10">
                <h4 className="text-[16px] md:text-[18px] font-[600] text-primary mb-4">
                  {data.driver_app_title || "Get the Driver's App"}
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href={data.app_store_url || "https://apps.apple.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      className="h-[44px]"
                    />
                  </a>
                  <a
                    href={data.play_store_url || "https://play.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-[44px]"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right side - Phone mockup */}
            <div className="flex-1 flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[450px] overflow-hidden min-h-[600px] bg-[#EEF9FF] rounded-[30px] flex items-center justify-center">
                <div className="flex items-center justify-center text-[#646464]">
                  {onboardImageUrl ? (
                    <Image
                      priority
                      src={onboardImageUrl}
                      alt="Onboard your driver"
                      width={687}
                      height={858}
                      className="object-cover w-[687px] h-[858px]"
                    />
                  ) : (
                    <Image
                      priority
                      src={OnboardImage}
                      alt="Onboard your driver"
                      width={687}
                      height={858}
                      className="object-cover w-[687px] h-[858px]"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* ─── What Our Hosts Are Saying ────────────────────────────────── */}
      <div className="bg-white pt-[50px] md:pt-[80px] overflow-hidden">
        <Container className="px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-[28px] md:text-[36px] font-[700] text-primary text-center mb-10">
              {data.testimonials_title || "What our Hosts are Saying"}
            </h2>

            <div className="max-w-4xl mx-auto">
              <Carousel
                setApi={setTestimonialApi}
                opts={{ align: "center", loop: true }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, i) => (
                    <CarouselItem key={i}>
                      <div className="relative bg-[#EEF9FF] rounded-[20px] p-8 md:p-12 mx-4">
                        {/* Navigation Arrows */}
                        <button
                          onClick={() => testimonialApi?.scrollPrev()}
                          disabled={!canScrollTestimonialPrev}
                          className={cn(
                            "absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-opacity",
                            !canScrollTestimonialPrev && "opacity-50",
                          )}
                        >
                          <ArrowLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => testimonialApi?.scrollNext()}
                          disabled={!canScrollTestimonialNext}
                          className={cn(
                            "absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-opacity",
                            !canScrollTestimonialNext && "opacity-50",
                          )}
                        >
                          <ArrowRight className="w-4 h-4 text-gray-600" />
                        </button>

                        {/* Content */}
                        <div className="text-center px-12 md:px-16">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[#88CAEE] flex items-center justify-center mx-auto mb-3">
                            <User className="w-7 h-7 text-white" />
                          </div>
                          <p className="text-[16px] md:text-[18px] font-[600] text-primary mb-4">
                            {testimonial.testimonial_name}
                          </p>
                          <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px] md:leading-[28px]">
                            {testimonial.testimonial_quote}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </motion.div>

          {/* ─── Meet the Host ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-[28px] md:text-[36px] font-[700] text-primary mb-2">
                {data.meet_host_title || "Meet the Host"}
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#646464]">
                {data.meet_host_subtitle || "Top hosts on Valor"}
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Carousel
                setApi={setHostApi}
                opts={{ align: "start", loop: false }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {topHosts.map((host, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#646464] to-[#888888] flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[14px] md:text-[16px] font-[600] text-primary truncate">
                            {host.host_name}
                          </h4>
                          <p className="text-[12px] text-[#646464] mb-1">
                            {host.host_trips || 0} trips • Host since{" "}
                            {host.host_since || 2025}
                          </p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={cn(
                                  "w-3.5 h-3.5",
                                  j < (host.host_rating || 5)
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

        {/* ─── Experience Valor (static) ───────────────────────────────── */}
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

export default PrismicBecomeAHostPage;
