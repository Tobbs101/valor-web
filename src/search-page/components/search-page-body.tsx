"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Highlander from "@/assets/highlander.png";
import FilterPanel from "./filter-panel";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { fleet } from "@/apis/fleet";
import { useSearchStore } from "@/store/search-store";
import JobListingModal from "@/src/landing-page/components/job-listing-modal";

const sortOptions = [
  "Relevance",
  "Price: low to high",
  "Price: high to low",
  "Ratings: low to high",
  "Ratings: high to low",
];

const SearchPageBody = () => {
  const [showFilter, setShowFilter] = useState(true);
  // Zustand store for filters
  const { filters, setFilters } = useSearchStore();

  // Calculate active filter count from store
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.cost) count++;
    if (filters.carType?.length) count++;
    if (filters.state) count++;
    if (filters.availableDates?.length) count++;
    if (filters.capacity) count++;
    if (filters.makeYear) count++;
    if (filters.availableFullDay) count++;
    return count;
  };
  const activeFilterCount = getActiveFilterCount();

  // console.log(activeFilterCount, "activeFilterCount");

  // Fetch vehicles with filters
  const {
    data: vehicles,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    ["vehicles", filters],
    () => fleet.getVehicles({ payload: filters }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [isJobListingModalOpen, setIsJobListingModalOpen] = useState(false);

  const router = useRouter();

  // console.log(vehicles, "vehicles");

  // console.log(fleets, "fleets");

  return (
    <div className="min-h-screen bg-white">
      <JobListingModal
        isOpen={isJobListingModalOpen}
        onClose={() => setIsJobListingModalOpen(false)}
      />

      <div className="max-w-[1440px] mx-auto py-20 px-5 ">
        {/* Header */}
        <div className="flex items-center flex-col gap-5 md:flex-row justify-between mb-8">
          <h1 className="text-[32px] w-full md:w-fit text-left md:text-[40px] font-[700] text-primary">
            Search Result
          </h1>
          <div className="flex md:justify-end w-full md:w-fit items-center flex-wrap gap-4">
            {/* Get Bids Button */}
            <button
              onClick={() => setIsJobListingModalOpen(true)}
              className="flex items-center gap-2 border border-[#F4F4F4] rounded-full px-5 py-2.5 hover:bg-gray-[#EEF9FF]/90 bg-[#EEF9FF] transition-colors"
            >
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
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[12px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}

          <FilterPanel
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            isMobile={false}
            onApplyFilters={refetch}
          />

          {/* Mobile Filter (fullscreen) */}
          <FilterPanel
            isOpen={showMobileFilter}
            onClose={() => setShowMobileFilter(false)}
            isMobile={true}
            onApplyFilters={refetch}
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
            {isLoading && (
              <div className="text-center py-10 text-primary font-bold">
                Loading vehicles...
              </div>
            )}
            {isError && (
              <div className="text-center py-10 text-red-500 font-bold">
                Error loading vehicles:{" "}
                {"Unknown error, please try again later."}
              </div>
            )}
            {!isLoading && !isError && vehicles && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {vehicles?.data?.length === 0 && (
                  <div className="col-span-full text-center py-10 text-[#646464]">
                    No vehicles found.
                  </div>
                )}
                {vehicles?.data?.map((car: any, idx: number) => (
                  <motion.div
                    key={car._id || idx}
                    onClick={() => router.push(`/search/${car._id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group overflow-hidden hover:shadow-sm rounded-[16px] cursor-pointer"
                  >
                    {/* Car Image */}
                    <div className="relative h-[180px] rounded-t-[16px] overflow-hidden">
                      <Image
                        src={
                          car.carImages?.frontView?.url ||
                          car.carImages?.rearView?.url ||
                          Highlander
                        }
                        alt={
                          car.carDetails?.carMake && car.carDetails?.carModel
                            ? `${car.carDetails.carMake} ${car.carDetails.carModel}`
                            : "Car image"
                        }
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
                          {car.vehicleRating || 0}
                        </span>
                      </div>
                    </div>

                    {/* Car Info */}
                    <div className="border border-gray-100 p-4 rounded-b-[16px]">
                      <h3 className="text-[16px] capitalize font-[700] text-black/90 mb-1">
                        {car.carDetails?.carMake && car.carDetails?.carModel
                          ? `${car.carDetails.carMake} ${car.carDetails.carModel}`
                          : "Car Name"}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        <Icon
                          icon="mdi:navigation-variant"
                          className="text-orange-400 text-[14px]"
                        />
                        <span className="text-[13px] text-[#646464]">
                          {car.carDetails?.city || "-"}
                        </span>
                      </div>
                      <p className="text-[14px] text-[#646464]">
                        From{" "}
                        <span className="font-[700] text-[14px] md:text-[18px] text-primary">
                          ₦{car.pricing?.minPrice?.toLocaleString?.() || "-"}
                        </span>{" "}
                        /Day
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageBody;
