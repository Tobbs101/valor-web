"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import Highlander from "@/assets/highlander.png";
import { useRouter } from "next/navigation";

const CarDetailsPageBody = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [currentMonth, setCurrentMonth] = useState("August");
  const [currentYear, setCurrentYear] = useState(2025);

  const router = useRouter();

  // Mock data
  const carData = {
    name: "Toyota Highlander",
    location: "Lagos",
    dateTaken: "July 14th, 2022",
    price: "N50,000",
    rating: 4.8,
    photoCount: 14,
    specs: {
      make: "Toyota",
      model: "Highlander",
      yearManufactured: "2020",
      upgraded: "Yes",
      glassThin: "Yes",
      color: "Sky Blue",
      transmission: "Automatic",
      capacity: "Six seater",
    },
    features: [
      { name: "Air Conditioner", icon: "mdi:air-conditioner" },
      { name: "Radio", icon: "mdi:radio" },
      { name: "Bluetooth Connection", icon: "mdi:bluetooth" },
    ],
    rentalTerms: [
      "No refund cancellation policy",
      "Comes with a driver",
      "Comes with full tank",
      "Customer refuels when the fuel level is low",
    ],
    services: [
      { name: "Full day", icon: "mdi:weather-sunny", active: true },
      { name: "Airport drop-off", icon: "mdi:airplane-landing", active: false },
      { name: "Airport pick-up", icon: "mdi:airplane-takeoff", active: false },
      { name: "Working overnight", icon: "mdi:weather-night", active: false },
    ],
  };

  // Calendar days for August 2025
  const calendarDays = [
    { day: "", disabled: true },
    { day: "", disabled: true },
    { day: "", disabled: true },
    { day: "", disabled: true },
    { day: "", disabled: true },
    { day: 1, disabled: false },
    { day: 2, disabled: false },
    { day: 3, disabled: false },
    { day: 4, disabled: false },
    { day: 5, disabled: false },
    { day: 6, disabled: false },
    { day: 7, disabled: false },
    { day: 8, disabled: false },
    { day: 9, disabled: false },
    { day: 10, disabled: false },
    { day: 11, disabled: false },
    { day: 12, disabled: false },
    { day: 13, disabled: false },
    { day: 14, disabled: false },
    { day: 15, disabled: false },
    { day: 16, disabled: false },
    { day: 17, disabled: false },
    { day: 18, disabled: true },
    { day: 19, disabled: true },
    { day: 20, disabled: false },
    { day: 21, disabled: false },
    { day: 22, disabled: true },
    { day: 23, disabled: false },
    { day: 24, disabled: true },
    { day: 25, disabled: true },
    { day: 26, disabled: true },
    { day: 27, disabled: false },
    { day: 28, disabled: false },
    { day: 29, disabled: false },
    { day: 30, disabled: false },
    { day: 31, disabled: false },
  ];

  return (
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
              src={Highlander}
              alt={carData.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Side Images */}
          <div className="w-full md:w-[280px] flex flex-row md:flex-col gap-4">
            {/* Top Image with Rating */}
            <div className="relative flex-1 h-[140px] md:h-[190px] rounded-2xl overflow-hidden">
              <Image
                src={Highlander}
                alt={carData.name}
                fill
                className="object-cover"
              />
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-white rounded-2xl px-3 py-1.5 flex items-center gap-1">
                <Icon
                  icon="mdi:star"
                  className="text-orange-400 mb-[1px] text-sm"
                />
                <span className="text-[13px] font-[600] text-primary">
                  {carData.rating}
                </span>
              </div>
            </div>

            {/* Bottom Image with Photo Count */}
            <div className="relative flex-1 h-[140px] md:h-[190px] rounded-2xl overflow-hidden">
              <Image
                src={Highlander}
                alt={carData.name}
                fill
                className="object-cover"
              />
              {/* Photo Count Button */}
              <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white transition-colors">
                <Icon icon="mdi:image-multiple" className="text-primary" />
                <span className="text-[13px] font-[500] text-primary">
                  View {carData.photoCount} photos
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
                {carData.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[13px] md:text-[14px] text-[#646464]">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:map-marker-outline"
                    className="text-orange-400"
                  />
                  <span>{carData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:calendar-outline"
                    className="text-[#9CA3AF]"
                  />
                  <span>Date picture taken: {carData.dateTaken}</span>
                </div>
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
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.make}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Model
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.model}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Year Manufactured
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.yearManufactured}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Upgraded
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.upgraded}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Glass Thin
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.glassThin}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Color
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.color}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Transmission
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.transmission}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Capacity
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    {carData.specs.capacity}
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
                {carData.features.map((feature, idx) => (
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
                ))}
              </div>
            </div>

            {/* Rental Terms */}
            <div className="border border-gray-200 rounded-xl p-4 md:p-6 mb-6">
              <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-5">
                Rental Terms
              </h2>
              <div className="space-y-3">
                {carData.rentalTerms.map((term, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                      <Icon
                        icon="mdi:check"
                        className="text-orange-500 text-sm"
                      />
                    </div>
                    <span className="text-[14px] text-[#646464]">{term}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service */}
            <div className="border border-gray-200 rounded-xl p-4 md:p-6">
              <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-5">
                Service
              </h2>
              <div className="flex flex-wrap gap-3">
                {carData.services.map((service, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 ${
                      service.active
                        ? "bg-orange-100 text-orange-600"
                        : "bg-[#F8F9FA] text-[#646464]"
                    }`}
                  >
                    <Icon
                      icon={service.icon}
                      className={`text-lg ${
                        service.active ? "text-orange-500" : "text-[#9CA3AF]"
                      }`}
                    />
                    <span className="text-[13px]">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ratings and Review */}
            <div className="border border-gray-200 rounded-xl p-4 md:p-6 mt-6">
              <h2 className="text-[16px] md:text-[20px] font-[600] text-primary mb-2">
                Ratings and Review
              </h2>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[28px] font-[700] text-primary">4.8</span>
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
                      It was an amazing experience. I got a letter grade than I
                      initially thought I&apos;d get, then I got an amazing free
                      fuel. Thanks for the nice support of the host. I think
                      I&apos;ll recommend you guys to anyone who needs a good
                      service.
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
                    Fleet rentals and logistics
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Host
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    Company
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Location
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    Lagos, Nigeria
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Delivery Rate
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    90%
                  </p>
                </div>
                <div>
                  <p className="text-[12px] md:text-[14px] text-[#9CA3AF] mb-1">
                    Rating
                  </p>
                  <p className="text-[14px] md:text-[16px] font-[600] text-primary">
                    4.7
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
                    {carData.price}
                  </span>
                  <span className="text-[13px] md:text-[14px] text-[#646464]">
                    /day
                  </span>
                </div>
              </div>

              {/* Inquiry Button */}
              <button className="w-full flex h-[50px] md:h-[55px] items-center justify-center gap-2 bg-gradient-to-l from-[#023047] to-[#034a6b] text-white rounded-[36px] p-[22px_10px] mb-4 md:mb-6 transition-colors">
                <span className="text-[14px] font-[400]">Send an Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Date Available */}
              <div>
                <h3 className="text-[14px] md:text-[20px] font-[600] text-primary mb-4">
                  Date Available
                </h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <ChevronLeft className="w-4 h-4 text-[#9CA3AF]" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-[500] text-primary">
                        {currentMonth}
                      </span>
                      <Icon
                        icon="mdi:chevron-down"
                        className="text-[#9CA3AF]"
                      />
                      <span className="text-[14px] font-[500] text-primary">
                        {currentYear}
                      </span>
                      <Icon
                        icon="mdi:chevron-down"
                        className="text-[#9CA3AF]"
                      />
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                    </button>
                  </div>

                  {/* Calendar Days Header */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] mb-2">
                    <span className="text-[#9CA3AF]">Aa</span>
                    <span className="text-[#9CA3AF]">Aa</span>
                    <span className="text-[#9CA3AF]">Aa</span>
                    <span className="text-[#9CA3AF]">Aa</span>
                    <span className="text-[#9CA3AF]">Aa</span>
                    <span className="text-[#9CA3AF]">Aa</span>
                    <span className="text-[#9CA3AF]">Aa</span>
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
                              ? "text-[#D1D5DB] line-through cursor-not-allowed"
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
        <div className="mt-10 md:mt-16">
          <h2 className="text-[22px] md:text-[28px] font-[700] text-primary mb-6 md:mb-8">
            More Recommendations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="group cursor-pointer">
                {/* Car Image */}
                <div className="relative h-[200px] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={Highlander}
                    alt="Toyota Highlander"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                    <Icon icon="mdi:star" className="text-orange-400 text-sm" />
                    <span className="text-[12px] font-[600] text-primary">
                      4.8
                    </span>
                  </div>
                </div>

                {/* Car Info */}
                <h3 className="text-[16px] font-[700] text-primary mb-1">
                  Toyota Highlander
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <Icon
                    icon="mdi:navigation-variant"
                    className="text-orange-400 text-[14px]"
                  />
                  <span className="text-[13px] text-[#646464]">
                    Lagos, Nigeria
                  </span>
                </div>
                <p className="text-[13px] text-[#646464]">
                  From{" "}
                  <span className="text-[18px] font-[700] text-primary">
                    N57,000
                  </span>{" "}
                  /Day
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPageBody;
