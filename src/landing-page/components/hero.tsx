"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import background from "@/assets/valor-hero.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowRight, CalendarIcon, X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useLayoutContext } from "@/app/client-layout";
import { useSearchStore } from "@/store/search-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";

// Nigerian States
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const lines = ["Hire any car with ease"];

// const lines = ["Windcrest Pediatric", "Dentistry"];

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// const secondLetterVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.05 + 1.5,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   }),
// };

const AnimatedText = () => {
  return (
    <div className="text-center z-[2] max-w-[90%] w-full mx-auto mb-5">
      {lines.map((line, lineIndex) => (
        <motion.div key={lineIndex} className="">
          {line.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-white font-[500]"
              style={{
                fontSize: "clamp(2rem, 5vw, 5rem)", // Increased minimum size from 1.5rem to 2rem
                lineHeight: "clamp(2.2rem, 5vw, 8rem)", // Increased minimum line height for better proportion
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const Hero = () => {
  const router = useRouter();
  const { setFilters } = useSearchStore();

  const [selectedState, setSelectedState] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
  });

  const { setIsHeroVisible } = useLayoutContext();

  console.log(heroInView);

  useEffect(() => {
    if (window.innerWidth < 1440) return setIsHeroVisible(false);

    setIsHeroVisible(heroInView);
  }, [heroInView, setIsHeroVisible]);

  const handleSearch = () => {
    const filters: { state?: string; availableDates?: string[] } = {};

    if (selectedState) {
      filters.state = selectedState;
    }

    if (selectedDates.length > 0) {
      filters.availableDates = selectedDates.map((date) =>
        format(date, "yyyy-MM-dd"),
      );
    }

    setFilters(filters);
    router.push("/search");
  };

  const handleDateSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates || []);
  };

  const removeDate = (dateToRemove: Date) => {
    setSelectedDates(
      selectedDates.filter((date) => date.getTime() !== dateToRemove.getTime()),
    );
  };

  return (
    <div className="w-full relative lg:h-screen-minus-82 py-5 lg:py-0 overflow-hidden flex items-center justify-center flex-col gap-2">
      <div
        ref={heroRef}
        className=" relative py-[50px] flex items-center justify-center flex-col rounded-[30px] h-[600px] lg:h-[94%] w-[95%] md:w-[97.5%] mx-auto bg-cover"
        style={{
          backgroundImage: `url(${(background as any).src ?? background})`,
        }}
      >
        <AnimatedText />

        <motion.p
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
          className=" text-white w-full leading-[20px] md:leading-[30px] text-center max-w-[98%] mx-auto text-sm md:text-[24px] font-[400]"
        >
          Book from a variety of vetted hosts and make payment securely using
          our platform.
        </motion.p>

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
          className="mt-5 lg:mt-7 w-[90%] max-w-[900px] mx-auto z-[1] p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-3 rounded-3xl md:rounded-full shadow-xl bg-white"
        >
          <div className="flex items-center gap-2 md:gap-3 flex-1 w-full">
            {/* State Select */}
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full sm:flex-1 h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-5 pr-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {nigerianStates.map((state) => (
                  <SelectItem key={state} value={state} className="text-sm">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Picker */}
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <button className="w-full sm:flex-1 h-[50px] rounded-full border border-gray-200 bg-gray-50/50 px-5 text-sm font-medium flex items-center justify-between gap-2 hover:bg-gray-100/50 transition-colors">
                  <span
                    className={cn(
                      "truncate",
                      selectedDates.length === 0 && "text-muted-foreground",
                    )}
                  >
                    {selectedDates.length === 0
                      ? "Select Dates"
                      : selectedDates.length === 1
                        ? format(selectedDates[0], "MMM d, yyyy")
                        : `${selectedDates.length} dates selected`}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3">
                  <DayPicker
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={handleDateSelect}
                    disabled={{ before: new Date() }}
                    className="rounded-md"
                  />
                  {selectedDates.length > 0 && (
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs text-gray-500 mb-2">
                        Selected dates:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedDates.map((date, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                          >
                            {format(date, "MMM d, yyyy")}
                            <button
                              onClick={() => removeDate(date)}
                              className="hover:bg-primary/20 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button
            onClick={handleSearch}
            className="h-[50px] rounded-full px-[50px] bg-primary text-white hover:bg-primary/90 duration-200 w-full sm:w-auto"
          >
            Search
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          className="max-w-[90%] w-full flex items-center justify-center mx-auto mt-[50px]"
        >
          <button
            className={cn(
              "duration-300 text-[14px] gap-1 font-[700] flex items-center justify-center outline-none bg-white rounded-[300px] text-primary focus:ring-0 focus-visible:ring-0 cursor-pointer px-10 py-4",
            )}
          >
            Get Bids From Hosts <ArrowRight className="mt-[2px]" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
