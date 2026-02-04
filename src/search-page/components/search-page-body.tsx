"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Highlander from "@/assets/highlander.png";
import FilterPanel from "./filter-panel";
import { useRouter } from "next/navigation";

const sortOptions = [
  "Relevance",
  "Price: low to high",
  "Price: high to low",
  "Ratings: low to high",
  "Ratings: high to low",
];

// Mock car data
const carResults = Array(6).fill({
  id: 1,
  name: "Toyota Highlander",
  location: "Lagos, Nigeria",
  price: "N57,000",
  rating: 4.8,
  image: Highlander,
});

const SearchPageBody = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto py-20 px-5 ">
        {/* Header */}
        <div className="flex items-center flex-col gap-5 md:flex-row justify-between mb-8">
          <h1 className="text-[32px] w-full md:w-fit text-left md:text-[40px] font-[700] text-primary">
            Search Result
          </h1>
          <div className="flex md:justify-end w-full md:w-fit items-center flex-wrap gap-4">
            {/* Get Bids Button */}
            <button className="flex items-center gap-2 border border-[#F4F4F4] rounded-full px-5 py-2.5 hover:bg-gray-[#EEF9FF]/90 bg-[#EEF9FF] transition-colors">
              <span className="text-[14px] font-[500] text-primary">
                Get Bids From Hosts
              </span>
              <span className="text-[12px] h-[28px] rounded-[17px] p-[6px_10px] px-3 bg-[#FFEED5] text-[#A95C00]">
                Recommended
              </span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors min-w-[150px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:sort" className="text-primary" />
                  <span className="text-[14px] text-primary">
                    {selectedSort}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-primary transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[14px] hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedSort === option
                          ? "text-primary font-[500]"
                          : "text-[#646464]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Filter Button - visible on sm and md screens */}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="flex lg:hidden items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
            >
              <Icon
                icon="mdi:filter-variant"
                className="text-primary text-lg"
              />
              <span className="text-[14px] text-primary">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <FilterPanel
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            isMobile={false}
          />

          {/* Mobile Filter (fullscreen) */}
          <FilterPanel
            isOpen={showMobileFilter}
            onClose={() => setShowMobileFilter(false)}
            isMobile={true}
            onApplyFilters={() => {
              // Handle apply filters logic here
              console.log("Filters applied");
            }}
          />

          {/* Car Results Grid */}
          <div className="flex-1">
            {!showFilter && (
              <button
                onClick={() => setShowFilter(true)}
                className="mb-4 hidden lg:flex items-center gap-2 text-primary hover:underline"
              >
                <Icon icon="mdi:filter-variant" className="text-xl" />
                <span className="text-[14px] font-[500]">Show Filters</span>
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {carResults.map((car, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => router.push(`/search/${car.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group cursor-pointer"
                >
                  {/* Car Image */}
                  <div className="relative h-[180px] rounded-[16px] overflow-hidden mb-3">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                      <Icon
                        icon="mdi:star"
                        className="text-orange-400 text-sm"
                      />
                      <span className="text-[12px] font-[600] text-primary">
                        {car.rating}
                      </span>
                    </div>
                  </div>

                  {/* Car Info */}
                  <h3 className="text-[16px] font-[700] text-primary mb-1">
                    {car.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon
                      icon="mdi:navigation-variant"
                      className="text-orange-400 text-[14px]"
                    />
                    <span className="text-[13px] text-[#646464]">
                      {car.location}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#646464]">
                    From{" "}
                    <span className="font-[700] text-primary">{car.price}</span>{" "}
                    /Day
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageBody;
