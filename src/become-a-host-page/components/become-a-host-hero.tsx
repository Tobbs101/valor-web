"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "@/components/layout/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import EarnExtraImage from "@/assets/earn-extra-income.svg";
import FlexibleSchedulingImage from "@/assets/schedule-1.svg";
import ContractImage from "@/assets/contract-1.svg";
import SecurePayments from "@/assets/secure-payments.svg";
import SimpleManagement from "@/assets/simple-management.svg";
import Image from "next/image";

const benefits = [
  {
    title: "Earn Extra Income",
    desc: "Monetize your idle car by renting it out to trusted customers.",
    img: (
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
    img: (
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
    img: (
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
    img: (
      <div className="w-full flex items-center justify-end">
        <Image
          src={SecurePayments}
          alt="Long term contracts"
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
    img: (
      <div className="w-full flex items-center justify-end">
        <Image
          src={SimpleManagement}
          alt="Long term contracts"
          width={200}
          priority
          className="w-[200px] mr-10 object-contain"
        />
      </div>
    ),
    imageLocation: "bottom",
  },
];

const BecomeAHostHero = () => {
  const topBenefits = benefits.slice(0, 3);
  const bottomBenefits = benefits.slice(3);

  // Animation hooks
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className=" bg-white">
      <Container className="pt-[30px] px-5 sm:pt-[70px]">
        <div className="flex flex-col items-center justify-center w-full">
          <motion.h1
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full text-[24px] leading-[24px] md:leading-[64px] md:text-[64px] font-[700] text-primary text-left mb-2"
          >
            Turn Your Vehicle into Extra
            <br /> Income with Valor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full font-[400] text-left text-[16px] md:text-[20px] text-[#646464] mb-8"
          >
            Join the Valor community and start earning by renting out your
            vehicle.
          </motion.p>
        </div>
      </Container>

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
                Become a Host
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-[#F0F0F0] z-[1] text-[14px] md:text-[18px] text-center mb-8 max-w-2xl mx-auto"
              >
                Valor offers an easy and secure way for you to make money by
                sharing your vehicle. Here are just a few benefits of becoming a
                host with us:
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
    </div>
  );
};

export default BecomeAHostHero;
