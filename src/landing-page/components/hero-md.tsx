"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/container";
import background from "@/assets/valor-hero.jpg";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import JobListingModal from "./job-listing-modal";
import GooglePlacesAutocomplete from "@/components/custom/google-places-autocomplete";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const lines = ["Hire any car with ease"];

const HeroMd = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [isJobListingModalOpen, setIsJobListingModalOpen] = useState(false);

  return (
    <div className="px-5 bg-white">
      <JobListingModal
        isOpen={isJobListingModalOpen}
        onClose={() => setIsJobListingModalOpen(false)}
      />
      <Container className="pt-[30px] sm:pt-[70px]">
        <div className="w-full relative rounded-2xl py-5 overflow-hidden flex items-center justify-center flex-col gap-2">
          <div className="gap-5 w-full z-[5] flex items-center justify-center flex-col">
            <Container className="px-6 md:px-10 w-full">
              {/* <AnimatedText /> */}

              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                className=" text-white mb-1 w-full text-center max-w-[98%] mx-auto text-[32px] md:text-[64px] md:font-[500] font-[700]"
              >
                Hire any car with ease
              </motion.p>

              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
                className=" text-white w-full leading-[20px] md:leading-[30px] text-center max-w-[98%] mx-auto text-[16px] md:text-[24px] font-[400]"
              >
                Book from a variety of vetted hosts and make payment securely
                using our platform.
              </motion.p>

              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
                className="mt-5 lg:mt-7 w-[90%] max-w-[900px] mx-auto z-[1] p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-3 rounded-3xl md:rounded-full shadow-xl bg-white"
              >
                <div className="flex items-center gap-2 md:gap-3 flex-1 w-full">
                  {/* Location Search */}
                  <GooglePlacesAutocomplete
                    value={location}
                    onChange={(value) => setLocation(value)}
                    placeholder="Search location"
                    className="w-full sm:flex-1"
                  />

                  {/* Date Select */}
                  <Select>
                    <SelectTrigger className="w-full sm:flex-1 h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-5 pr-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today" className="text-sm">
                        Today
                      </SelectItem>
                      <SelectItem value="tomorrow" className="text-sm">
                        Tomorrow
                      </SelectItem>
                      <SelectItem value="this-week" className="text-sm">
                        This Week
                      </SelectItem>
                      <SelectItem value="next-week" className="text-sm">
                        Next Week
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => {
                    if (searchType === "schools")
                      return router.push(`schools?search=${search}`);

                    if (searchType === "county")
                      return router.push(
                        `local-education-authority?search=${search}`,
                      );
                  }}
                  className="h-[50px] rounded-full px-[50px] bg-primary text-white hover:bg-primary/90 duration-200 w-full sm:w-auto"
                >
                  Search
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
                className="max-w-[90%] mb-3 w-full flex items-center justify-center mx-auto mt-[50px]"
              >
                <button
                  onClick={() => setIsJobListingModalOpen(true)}
                  className={cn(
                    "duration-300 text-[14px] gap-1 font-[700] flex items-center justify-center outline-none bg-white rounded-[300px] text-primary focus:ring-0 focus-visible:ring-0 cursor-pointer px-10 py-4",
                  )}
                >
                  Get Bids From Hosts <ArrowRight className="mt-[2px]" />
                </button>
              </motion.div>
            </Container>
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              priority
              src={background}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 bg-[#0B112A]/70 lg:bg-[#0B112A]/60 z-[1] w-full h-full" />
        </div>
      </Container>
    </div>
  );
};

export default HeroMd;
