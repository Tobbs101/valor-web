"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Container from "@/components/layout/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Each from "@/components/helpers/each";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameToColor } from "@/lib/utils";

type TestimonialItem = {
  id: number;
  content: string;
  user: string;
  date: string;
  rating: number;
};

const Ratings = ({ value }: { value: number }) => {
  const ArrayFill = Array.from({ length: 5 }, () => "");

  return (
    <div className="w-full flex items-center justify-start">
      <Each
        of={ArrayFill}
        render={(_, index) => (
          <Icon
            key={index}
            icon="material-symbols:star-rounded"
            className={cn("text-[#C0F333] text-[24px]", {
              "text-gray-300": index + 1 > value,
            })}
          />
        )}
      />
    </div>
  );
};

const Testimonial = ({ item }: { item: TestimonialItem }) => {
  return (
    <div className="border border-gray-100 bg-white shadow-sm rounded-lg p-5">
      <Ratings value={item.rating} />
      <p className="scrollbar-visible border border-gray-100 text-sm p-3 rounded-md shadow-inner overflow-hidden overflow-y-scroll h-[170px] my-3">
        {item.content}
      </p>
      <div className="mt-7 flex items-center justify-start gap-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={``} />
          <AvatarFallback
            className={`text-white text-[16px]`}
            style={{
              backgroundColor: nameToColor(item.user),
            }}
          >
            {item.user.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div>
          <Text size={"sm"} weight={"semibold"}>
            {item.user}
          </Text>
          <Text size={"xs"} weight={"medium"} className="text-gray-500">
            {item.date}
          </Text>
        </div>
      </div>
    </div>
  );
};

const TestimonialList = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const items: TestimonialItem[] = [
    {
      id: 1,
      content:
        "I don't usually leave reviews but I just had to do this. My son had less than a year to prepare for his 11+ when I contacted Mr. Tola of Limit breakers and I have to say I was quite impressed by the learning programme and the tutor's level of professionalism. Even when I expressed some doubt about my son's preparedness for the test, the tutor was quite confident of the end result and he was so right. Timi took the Bexley and Kent test with so much confidence and passed both.Thank You, Limit Breakers!!!",
      user: "Ade",
      date: "21 October, 2024",
      rating: 5,
    },
    {
      id: 2,
      content:
        "Limit Breakers has been an absolute game-changer for my daughter’s 11+ exam preparation. Thanks to their structured and thorough program, she passed both the Kent and Medway 11+ exams with flying colors! From the very beginning, the team at Limit Breakers showed exceptional dedication, tailoring the learning experience to suit my daughter’s unique strengths and weaknesses. The materials provided were incredibly comprehensive, covering everything from verbal and non-verbal reasoning to math and English. What really stood out to us was their focus on strategy and exam techniques, which helped my daughter approach each section with confidence. The mix of live online sessions, practice papers, and detailed feedback meant that she was constantly improving. The tutors are not only highly knowledgeable but also incredibly supportive, always pushing her to aim higher while keeping her motivated. If you’re looking for an 11+ preparation program that genuinely cares about your child’s success, I can’t recommend Limit Breakers enough. It gave my daughter the edge she needed to excel, and I’m beyond grateful for their support. Trust me, this program works!",
      user: "Mona",
      date: "16 October, 2024",
      rating: 5,
    },

    {
      id: 3,
      content:
        "My child excelled in her Kent and Medway 11+ exams thanks to the structured weekly online 11+ program provided by Limit Breakers. Her outstanding scores are a testament to the effectiveness of the program. Thank you so much! We are truly grateful for your support.",
      user: "Ola Dms",
      date: "18 October, 2024",
      rating: 5,
    },
    {
      id: 4,
      content:
        "My experience at Limit Breakers Tutoring was excellent. Last year, they prepared my daughter for the 11+ exam, leading to her admission into one of Kent's top grammar schools. I'd like to express my gratitude to Mr. Tola Adewunmi for the one-on-one tutoring, moral support, and encouragement my daughter received. If you need help preparing your son or daughter for the 11+ exam, look no further than Limit Breaker UK. ",
      user: "Adewale Omolere",
      date: "05 September, 2024",
      rating: 5,
    },
    {
      id: 5,
      content:
        "Our tutor was absolutely outstanding. They provided easy to understand lessons, difficult exam questions for practice, and was always willing to help my daughter with any questions she had. Before this tutoring my daughter was working at a grade 7 level, but after Limit Breakers , she received grade 9 in her final GCSE exams, with a very high score.Thank you to this amazing tutoring service.",
      user: "Solape Keshi",
      date: "28 May, 2024",
      rating: 5,
    },
    {
      id: 6,
      content:
        "They are very professional. Always on time. My son had excellent results in his exams and I will recommend this company for educational development of students. They go the extra mile to helping their students achieve great results.",
      user: "Olufemi",
      date: "05 September, 2024",
      rating: 5,
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="w-full mt-10"
    >
      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent>
            <Each
              of={items || []}
              render={(item, index) => (
                <CarouselItem
                  className="md:basis-1/2 cursor-pointer lg:basis-1/3"
                  key={index}
                >
                  <Testimonial item={item} />
                </CarouselItem>
              )}
            />
          </CarouselContent>
          <div className="flex items-center justify-end gap-3 mt-5">
            <CarouselPrevious className="relative text-black dark:text-white translate-y-0 top-0 left-0 right-0 bottom-0 border border-black" />
            <CarouselNext className="relative text-black dark:text-white translate-y-0 top-0 left-0 right-0 bottom-0 border border-black" />
          </div>
        </Carousel>
      </div>
    </motion.div>
  );
};

const CustomerTestimonials = ({ headerClass }: { headerClass?: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  return (
    <div className="px-5 bg-white">
      <Container className="py-[50px] sm:py-[70px]">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
          >
            <h1
              className={cn(
                "w-full text-[36px] md:text-[48px] font-[700] text-center",
                headerClass
              )}
            >
              Customer Testimonials
            </h1>
            <p className="text-gray-600 text-[14px] text-center font-[400] md:text-base">
              What Our Users Are Saying
            </p>
          </motion.div>
          <TestimonialList />
        </div>
      </Container>
    </div>
  );
};

export default CustomerTestimonials;
