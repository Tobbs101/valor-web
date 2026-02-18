"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import Highlander from "@/assets/highlander.png";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { fleet } from "@/apis/fleet";
import { format, getDaysInMonth, startOfMonth, getDay } from "date-fns";

// Skeleton component for loading state
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Photo Gallery Modal Component
const PhotoGalleryModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; name: string }[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  if (!isOpen) return null;

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-8 h-8 text-white" />
      </button>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-6 z-10 p-3 hover:bg-white/10 rounded-full transition-colors"
      >
        <ChevronLeft className="w-10 h-10 text-white" />
      </button>

      {/* Image */}
      <div className="relative w-full max-w-4xl h-[80vh] mx-4">
        <Image
          src={images[currentIndex]?.url || Highlander}
          alt={images[currentIndex]?.name || "Car image"}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-6 z-10 p-3 hover:bg-white/10 rounded-full transition-colors"
      >
        <ChevronRight className="w-10 h-10 text-white" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

const CarDetailsPageBody = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target as Node)
      ) {
        setShowMonthDropdown(false);
      }
      if (
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(event.target as Node)
      ) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const {
    data: currentCarData,
    isLoading: loadingCarData,
    isError,
  } = useQuery(
    ["vehicle data", params?.car_id],
    () => fleet.getVehicleDetails({ carId: (params?.car_id as string) || "" }),
    {
      enabled: !!params?.car_id,
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: currentCarReviews,
    isLoading: loadingCarReviews,
    isError: reviewsError,
  } = useQuery(
    ["vehicle reviews", params?.car_id],
    () => fleet.getVehicleReviews({ carId: (params?.car_id as string) || "" }),
    {
      enabled: !!params?.car_id,
      refetchOnWindowFocus: false,
    },
  );

  // console.log(currentCarReviews);

  const vehicleData = currentCarData?.data;

  // Extract car images for gallery
  const carImages = useMemo(() => {
    if (!vehicleData?.carImages) return [];
    const images: { url: string; name: string }[] = [];
    const imageKeys = [
      "frontView",
      "rearView",
      "driverSide",
      "passengerSide",
      "frontSeat",
      "rearSeat",
    ];
    imageKeys.forEach((key) => {
      const img = vehicleData.carImages[key];
      if (img?.url) {
        images.push({ url: img.url, name: key });
      }
    });
    return images;
  }, [vehicleData?.carImages]);

  // Parse unavailable dates from API format "2026-03-06:2026-03-10"
  const unavailableDates = useMemo(() => {
    if (!vehicleData?.unAvailableDates) return new Set<string>();
    const dates = new Set<string>();
    vehicleData.unAvailableDates.forEach((range: string) => {
      const [start, end] = range.split(":");
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const current = new Date(startDate);
        while (current <= endDate) {
          dates.add(format(current, "yyyy-MM-dd"));
          current.setDate(current.getDate() + 1);
        }
      } else if (start) {
        dates.add(start);
      }
    });
    return dates;
  }, [vehicleData?.unAvailableDates]);

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentYear;
    const month = currentMonth;
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const firstDayOfMonth = getDay(startOfMonth(new Date(year, month)));
    const days: { day: number | ""; disabled: boolean }[] = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", disabled: true });
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = format(new Date(year, month, day), "yyyy-MM-dd");
      const isUnavailable = unavailableDates.has(dateStr);
      days.push({ day, disabled: isUnavailable });
    }

    return days;
  }, [currentMonth, currentYear, unavailableDates]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i,
  );

  // Build features array from API data
  const features = useMemo(() => {
    if (!vehicleData?.carDetails) return [];
    const feats: { name: string; icon: string }[] = [];
    if (vehicleData.carDetails.airConditioner === "yes") {
      feats.push({ name: "Air Conditioner", icon: "mdi:air-conditioner" });
    }
    if (vehicleData.carDetails.radio === "yes") {
      feats.push({ name: "Radio", icon: "mdi:radio" });
    }
    if (vehicleData.carDetails.music === "yes") {
      feats.push({ name: "Music/Bluetooth", icon: "mdi:bluetooth" });
    }
    return feats;
  }, [vehicleData?.carDetails]);

  // Build services array from pricing data
  const services = useMemo(() => {
    if (!vehicleData?.pricing) return [];
    const servs: {
      name: string;
      icon: string;
      active: boolean;
      cost: number;
    }[] = [];
    if (vehicleData.pricing.fullDay?.available === "yes") {
      servs.push({
        name: "Full day",
        icon: "mdi:weather-sunny",
        active: true,
        cost: vehicleData.pricing.fullDay.cost,
      });
    }
    if (vehicleData.pricing.airportDrop?.available === "yes") {
      servs.push({
        name: "Airport drop-off",
        icon: "mdi:airplane-landing",
        active: false,
        cost: vehicleData.pricing.airportDrop.cost,
      });
    }
    if (vehicleData.pricing.airportPickUp?.available === "yes") {
      servs.push({
        name: "Airport pick-up",
        icon: "mdi:airplane-takeoff",
        active: false,
        cost: vehicleData.pricing.airportPickUp.cost,
      });
    }
    if (vehicleData.pricing.overNight?.available === "yes") {
      servs.push({
        name: "Overnight",
        icon: "mdi:weather-night",
        active: false,
        cost: vehicleData.pricing.overNight.cost,
      });
    }
    return servs;
  }, [vehicleData?.pricing]);

  // Build rental terms from API data
  const rentalTerms = useMemo(() => {
    if (!vehicleData?.rentalTerms) return [];
    const terms: string[] = [];
    if (vehicleData.rentalTerms.comesWithDriver === "yes") {
      terms.push("Comes with a driver");
    }
    if (vehicleData.rentalTerms.whenFuelLow) {
      terms.push(
        vehicleData.rentalTerms.whenFuelLow === "host top up"
          ? "Host tops up fuel when low"
          : "Customer refuels when the fuel level is low",
      );
    }
    if (vehicleData.rentalTerms.freeHoursAfterClosing) {
      terms.push(
        `${vehicleData.rentalTerms.freeHoursAfterClosing} free hours after closing`,
      );
    }
    if (vehicleData.rentalTerms.costPerHourAfterClosing) {
      terms.push(
        `₦${vehicleData.rentalTerms.costPerHourAfterClosing.toLocaleString()} per hour after free hours`,
      );
    }
    return terms;
  }, [vehicleData?.rentalTerms]);

  // Get similar vehicles
  const similarVehicles = useMemo(() => {
    return vehicleData?.similarVehicles || [];
  }, [vehicleData?.similarVehicles]);

  // Loading skeleton
  if (loadingCarData) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto py-20 px-5">
          <Skeleton className="w-40 h-8 mb-6" />
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Skeleton className="flex-1 h-[250px] md:h-[400px] rounded-2xl" />
            <div className="w-full md:w-[280px] flex flex-row md:flex-col gap-4">
              <Skeleton className="flex-1 h-[140px] md:h-[190px] rounded-2xl" />
              <Skeleton className="flex-1 h-[140px] md:h-[190px] rounded-2xl" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <Skeleton className="w-64 h-8 mb-4" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-48 h-4 mb-8" />
              <Skeleton className="w-full h-[200px] rounded-xl mb-6" />
              <Skeleton className="w-full h-[150px] rounded-xl mb-6" />
              <Skeleton className="w-full h-[150px] rounded-xl" />
            </div>
            <div className="w-full lg:w-[320px]">
              <Skeleton className="w-full h-[400px] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !vehicleData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Icon
            icon="mdi:alert-circle-outline"
            className="text-6xl text-red-500 mb-4 mx-auto"
          />
          <h2 className="text-xl font-semibold text-primary mb-2">
            Vehicle Not Found
          </h2>
          <p className="text-gray-500 mb-4">Unable to load vehicle details.</p>
          <button
            onClick={() => router.push("/search")}
            className="bg-primary text-white px-6 py-2 rounded-full"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const carName =
    `${vehicleData.carDetails?.carMake || ""} ${vehicleData.carDetails?.carModel || ""}`.trim();
  const capitalizedCarName = carName
    .split(" ")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const minPrice =
    vehicleData.pricing?.minPrice || vehicleData.pricing?.fullDay?.cost || 0;

  return (
    <>
      <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={carImages}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto py-20 px-5">
          {/* Image Gallery */}

          <button
            onClick={() => router.push("/search")}
            className="flex items-center gap-2 border border-transparent rounded-full py-3 bg-transparent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
            <span className="text-[14px] hover:underline font-[500] text-primary">
              Return to Search
            </span>
          </button>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Main Image */}
            <div className="flex-1 relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={carImages[0]?.url || Highlander}
                alt={capitalizedCarName}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Side Images */}
            <div className="w-full md:w-[280px] flex flex-row md:flex-col gap-4">
              {/* Top Image with Rating */}
              <div className="relative flex-1 h-[140px] md:h-[190px] rounded-2xl overflow-hidden">
                <Image
                  src={carImages[1]?.url || Highlander}
                  alt={capitalizedCarName}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white rounded-2xl px-3 py-1.5 flex items-center gap-1">
                  <Icon
                    icon="mdi:star"
                    className="text-orange-400 mb-[1px] text-sm"
                  />
                  <span className="text-[13px] font-[600] text-primary">
                    {vehicleData.vehicleRating || 0}
                  </span>
                </div>
              </div>

              {/* Bottom Image with Photo Count */}
              <div className="relative flex-1 h-[140px] md:h-[190px] rounded-2xl overflow-hidden">
                <Image
                  src={carImages[2]?.url || Highlander}
                  alt={capitalizedCarName}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Photo Count Button */}
                <button
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setIsGalleryOpen(true);
                  }}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white transition-colors"
                >
                  <Icon icon="mdi:image-multiple" className="text-primary" />
                  <span className="text-[13px] font-[500] text-primary">
                    View {carImages.length} photos
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content */}
            <div className="flex-1 order-2 lg:order-1">
              {/* Title & Location */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-[22px] md:text-[28px] font-[700] text-primary mb-2 md:mb-3">
                  {capitalizedCarName}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[13px] md:text-[14px] text-[#646464]">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:map-marker-outline"
                      className="text-orange-400"
                    />
                    <span>{vehicleData.carDetails?.city || "Nigeria"}</span>
                  </div>
                  {vehicleData.carImages?.datePictureTaken && (
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:calendar-outline"
                        className="text-[#9CA3AF]"
                      />
                      <span>
                        Date picture taken:{" "}
                        {format(
                          new Date(vehicleData.carImages.datePictureTaken),
                          "MMMM d, yyyy",
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specification */}
              <div className="border border-gray-200 rounded-xl p-4 md:p-6 mb-6">
                <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-4 md:mb-5">
                  Technical Specification
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-6">
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Make
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary capitalize">
                      {vehicleData.carDetails?.carMake || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Model
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary capitalize">
                      {vehicleData.carDetails?.carModel || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Year Manufactured
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                      {vehicleData.carDetails?.yearString || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Upgraded
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary capitalize">
                      {vehicleData.carDetails?.upgrade === "yes" ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Tinted Glass
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary capitalize">
                      {vehicleData.carDetails?.carTint === "yes" ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Color
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary capitalize">
                      {vehicleData.carDetails?.carColor || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Transmission
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary capitalize">
                      {vehicleData.carDetails?.transmission || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Capacity
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                      {vehicleData.carDetails?.capacity || "-"} seater
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="border border-gray-200 rounded-xl p-4 md:p-6 mb-6">
                <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-5">
                  Features
                </h2>
                <div className="flex flex-wrap gap-3">
                  {features.length > 0 ? (
                    features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-[#F8F9FA] rounded-full px-4 py-2.5"
                      >
                        <Icon
                          icon={feature.icon}
                          className="text-[#9CA3AF] text-lg"
                        />
                        <span className="text-[13px] text-[#646464]">
                          {feature.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[13px] text-[#9CA3AF]">
                      No features listed
                    </span>
                  )}
                </div>
              </div>

              {/* Rental Terms */}
              <div className="border border-gray-200 rounded-xl p-4 md:p-6 mb-6">
                <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-5">
                  Rental Terms
                </h2>
                <div className="space-y-3">
                  {rentalTerms.length > 0 ? (
                    rentalTerms.map((term, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                          <Icon
                            icon="mdi:check"
                            className="text-orange-500 text-sm"
                          />
                        </div>
                        <span className="text-[14px] text-[#646464]">
                          {term}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[13px] text-[#9CA3AF]">
                      No rental terms listed
                    </span>
                  )}
                </div>
              </div>

              {/* Service */}
              <div className="border border-gray-200 rounded-xl p-4 md:p-6">
                <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-5">
                  Services Available
                </h2>
                <div className="flex flex-wrap gap-3">
                  {services.length > 0 ? (
                    services.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-full px-4 py-2.5 bg-orange-100 text-orange-600"
                      >
                        <Icon
                          icon={service.icon}
                          className="text-lg text-orange-500"
                        />
                        <span className="text-[13px]">
                          {service.name} - ₦{service.cost.toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[13px] text-[#9CA3AF]">
                      No services available
                    </span>
                  )}
                </div>
              </div>

              {/* Ratings and Review */}
              <div className="border border-gray-200 rounded-xl p-4 md:p-6 mt-6">
                <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-2">
                  Ratings and Review
                </h2>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[28px] font-[700] text-primary">
                    4.8
                  </span>
                  <Icon icon="mdi:star" className="text-orange-400 text-xl" />
                </div>
                <p className="text-[13px] text-[#9CA3AF] mb-5">50 ratings</p>

                {/* Review List */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 mb-2">
                        <Icon
                          icon="mdi:star"
                          className="text-orange-400 text-sm"
                        />
                        <Icon
                          icon="mdi:star"
                          className="text-orange-400 text-sm"
                        />
                        <Icon
                          icon="mdi:star"
                          className="text-orange-400 text-sm"
                        />
                        <Icon
                          icon="mdi:star-outline"
                          className="text-[#D1D5DB] text-sm"
                        />
                        <Icon
                          icon="mdi:star-outline"
                          className="text-[#D1D5DB] text-sm"
                        />
                      </div>

                      {/* User Info */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          <Image
                            src={Highlander}
                            alt="User"
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="text-[13px] font-[600] text-primary">
                          Akintomiwa Odusanya
                        </span>
                        <span className="text-[12px] text-[#9CA3AF]">•</span>
                        <span className="text-[12px] text-[#9CA3AF]">
                          October 13, 2025
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-[13px] text-[#646464] leading-relaxed">
                        It was an amazing experience. I got a letter grade than
                        I initially thought I&apos;d get, then I got an amazing
                        free fuel. Thanks for the nice support of the host. I
                        think I&apos;ll recommend you guys to anyone who needs a
                        good service.
                      </p>
                    </div>
                  ))}
                </div>

                {/* See More Button */}
                <div className="flex justify-center mt-5">
                  <button className="border border-gray-300 rounded-lg px-6 py-2.5 text-[13px] font-[500] text-primary hover:bg-gray-50 transition-colors">
                    See More
                  </button>
                </div>
              </div>

              {/* Hosted By */}
              <div className="border border-gray-200 rounded-xl p-4 md:p-6 mt-6">
                <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-4 md:mb-5">
                  Hosted By
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-5">
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Name
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                      {vehicleData?.host?.fName && vehicleData?.host?.lName
                        ? `${vehicleData.host.fName} ${vehicleData.host.lName}`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Host Type
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary capitalize">
                      {vehicleData?.host?.hostAccountType || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Location
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                      {vehicleData?.host?.address?.address ||
                        vehicleData?.carDetails?.city ||
                        vehicleData?.carDetails?.address ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Delivery Rating
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                      {vehicleData?.host?.deliveryRating ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                      Rating
                    </p>
                    <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                      {vehicleData?.host?.hostRating ??
                        vehicleData?.vehicleRating ??
                        "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Price Card */}
            <div className="w-full lg:w-[320px] order-1 lg:order-2">
              <div className="border border-gray-200 rounded-xl p-4 md:p-6 lg:sticky lg:top-[100px]">
                {/* Price */}
                <div className="mb-4 md:mb-5">
                  <p className="text-[13px] text-[#9CA3AF] mb-1">From</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[26px] md:text-[32px] font-[700] text-primary">
                      ₦{minPrice.toLocaleString()}
                    </span>
                    <span className="text-[13px] md:text-[14px] text-[#646464]">
                      /day
                    </span>
                  </div>
                </div>

                {/* Inquiry Button */}
                <button className="w-full flex h-[50px] md:h-[55px] items-center justify-center gap-2 bg-gradient-to-l from-[#023047] to-[#034a6b] text-white rounded-[36px] p-[22px_10px] mb-4 md:mb-6 transition-colors">
                  <span className="text-[14px] font-[400]">
                    Send an Inquiry
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Date Available */}
                <div>
                  <h3 className="text-[14px] md:text-[20px] font-[600] text-primary mb-4">
                    Date(s) Available
                  </h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => {
                          if (currentMonth === 0) {
                            setCurrentMonth(11);
                            setCurrentYear(currentYear - 1);
                          } else {
                            setCurrentMonth(currentMonth - 1);
                          }
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#9CA3AF]" />
                      </button>
                      <div className="flex items-center gap-2">
                        {/* Month Dropdown */}
                        <div className="relative" ref={monthDropdownRef}>
                          <button
                            onClick={() =>
                              setShowMonthDropdown(!showMonthDropdown)
                            }
                            className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                          >
                            <span className="text-[14px] font-[500] text-primary">
                              {months[currentMonth]}
                            </span>
                            <Icon
                              icon="mdi:chevron-down"
                              className="text-[#9CA3AF]"
                            />
                          </button>
                          {showMonthDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                              {months.map((month, idx) => (
                                <button
                                  key={month}
                                  onClick={() => {
                                    setCurrentMonth(idx);
                                    setShowMonthDropdown(false);
                                  }}
                                  className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-gray-100 ${
                                    currentMonth === idx
                                      ? "bg-orange-50 text-orange-600"
                                      : "text-[#646464]"
                                  }`}
                                >
                                  {month}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Year Dropdown */}
                        <div className="relative" ref={yearDropdownRef}>
                          <button
                            onClick={() =>
                              setShowYearDropdown(!showYearDropdown)
                            }
                            className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                          >
                            <span className="text-[14px] font-[500] text-primary">
                              {currentYear}
                            </span>
                            <Icon
                              icon="mdi:chevron-down"
                              className="text-[#9CA3AF]"
                            />
                          </button>
                          {showYearDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                              {years.map((year) => (
                                <button
                                  key={year}
                                  onClick={() => {
                                    setCurrentYear(year);
                                    setShowYearDropdown(false);
                                  }}
                                  className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-gray-100 ${
                                    currentYear === year
                                      ? "bg-orange-50 text-orange-600"
                                      : "text-[#646464]"
                                  }`}
                                >
                                  {year}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (currentMonth === 11) {
                            setCurrentMonth(0);
                            setCurrentYear(currentYear + 1);
                          } else {
                            setCurrentMonth(currentMonth + 1);
                          }
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                      </button>
                    </div>

                    {/* Calendar Days Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <span
                            key={day}
                            className="text-[#9CA3AF] font-medium"
                          >
                            {day}
                          </span>
                        ),
                      )}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
                      {calendarDays.map((item, idx) => (
                        <button
                          key={idx}
                          disabled={item.disabled || !item.day}
                          onClick={() =>
                            item.day &&
                            !item.disabled &&
                            setSelectedDate(item.day as number)
                          }
                          className={`py-1.5 rounded-full transition-colors ${
                            !item.day
                              ? ""
                              : item.disabled
                                ? "text-[#D1D5DB] bg-gray-50 line-through cursor-not-allowed"
                                : selectedDate === item.day
                                  ? "bg-primary text-white"
                                  : "text-[#646464] hover:bg-gray-100"
                          }`}
                        >
                          {item.day || ""}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Recommendations */}
          {similarVehicles.length > 0 && (
            <div className="mt-10 md:mt-16">
              <h2 className="text-[22px] md:text-[28px] font-[700] text-primary mb-6 md:mb-8">
                More Recommendations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {similarVehicles.slice(0, 3).map((car: any, idx: number) => (
                  <div key={car._id || idx} className="group cursor-pointer">
                    {/* Car Image */}
                    <div className="relative h-[200px] rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={car.carImages?.frontView?.url || Highlander}
                        alt={`${car.carDetails?.carMake || ""} ${car.carDetails?.carModel || ""}`}
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
                          {car.vehicleRating || "0.0"}
                        </span>
                      </div>
                    </div>

                    {/* Car Info */}
                    <h3 className="text-[16px] font-[700] text-primary mb-1 capitalize">
                      {car.carDetails?.carMake} {car.carDetails?.carModel}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Icon
                        icon="mdi:navigation-variant"
                        className="text-orange-400 text-[14px]"
                      />
                      <span className="text-[13px] text-[#646464]">
                        {car.carDetails?.city || "N/A"}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#646464]">
                      From{" "}
                      <span className="text-[18px] font-[700] text-primary">
                        ₦
                        {(
                          car.pricing?.fullDay?.cost ||
                          car.pricing?.airportDrop?.cost ||
                          0
                        ).toLocaleString()}
                      </span>{" "}
                      /Day
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarDetailsPageBody;
