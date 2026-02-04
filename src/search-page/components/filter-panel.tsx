"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const vehicleTypes = [
  { id: "suvs", name: "SUVs", icon: "mdi:car-suv" },
  { id: "sedan", name: "Sedan", icon: "mdi:car-saloon" },
  { id: "luxury", name: "Luxury", icon: "mdi:car-sports" },
  { id: "minivan", name: "Mini-van", icon: "mdi:van-passenger" },
  { id: "bus", name: "Bus", icon: "mdi:bus" },
  { id: "pickup", name: "Pickup", icon: "mdi:car-pickup" },
];

const servicesOptions = [
  "All services",
  "Full day",
  "Airport pick-up",
  "Airport drop-off",
  "Overnight",
];

const vehicleGlassOptions = ["All", "Tinted", "Not tinted"];

const vehicleConditionOptions = ["All", "Upgraded", "Not Upgraded"];

const vehicleColors = [
  "All",
  "Black",
  "White",
  "Silver",
  "Red",
  "Blue",
  "Grey",
  "Green",
];

const seatOptions = [
  "All seats",
  "2 Seats",
  "4 Seats",
  "5 Seats",
  "7 Seats",
  "8+ Seats",
];

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  onApplyFilters?: () => void;
}

// Collapsible Filter Section Component
const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn("border-b border-gray-200 pb-2 mb-5", { "pb-5": isOpen })}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h3 className="text-[14px] font-[600] text-primary">{title}</h3>
        <ChevronDown
          className={`w-4 h-4 text-primary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterPanel = ({
  isOpen,
  onClose,
  isMobile = false,
  onApplyFilters,
}: FilterPanelProps) => {
  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(
    null,
  );
  const [selectedMake, setSelectedMake] = useState("All makes");
  const [selectedModel, setSelectedModel] = useState("All models");
  const [selectedTransmission, setSelectedTransmission] =
    useState("All transmissions");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedService, setSelectedService] = useState("All services");
  const [selectedVehicleGlass, setSelectedVehicleGlass] = useState("All");
  const [selectedVehicleCondition, setSelectedVehicleCondition] =
    useState("All");
  const [selectedVehicleColor, setSelectedVehicleColor] = useState("All");
  const [selectedSeats, setSelectedSeats] = useState("All seats");
  const [selectedDate, setSelectedDate] = useState("All dates");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<
    number | null
  >(null);

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (minPrice || maxPrice) count++;
    if (selectedVehicleType) count++;
    if (selectedMake !== "All makes") count++;
    if (selectedModel !== "All models") count++;
    if (selectedTransmission !== "All transmissions") count++;
    if (selectedYear !== "All Years") count++;
    if (selectedService !== "All services") count++;
    if (selectedVehicleGlass !== "All") count++;
    if (selectedVehicleCondition !== "All") count++;
    if (selectedVehicleColor !== "All") count++;
    if (selectedSeats !== "All seats") count++;
    if (selectedCalendarDate !== null) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const handleApply = () => {
    onApplyFilters?.();
    onClose();
  };

  // Mobile fullscreen filter
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Filter Title with count */}
            <div className="flex items-center justify-center gap-2 py-4 border-b-2 border-primary">
              <span className="text-[18px] font-[600] text-primary">
                Filters
              </span>
              {activeFilterCount > 0 && (
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[12px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </div>

            {/* Scrollable Filter Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Price Filter */}
              <FilterSection title="Price">
                <div className="flex flex-col flex-wrap gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary"
                  />
                </div>
              </FilterSection>

              {/* Vehicle Type Filter */}
              <FilterSection title="Vehicle type">
                <div className="grid grid-cols-3 gap-3">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() =>
                        setSelectedVehicleType(
                          selectedVehicleType === type.id ? null : type.id,
                        )
                      }
                      className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-xl transition-colors ${
                        selectedVehicleType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/30"
                      }`}
                    >
                      <Icon
                        icon={type.icon}
                        className="text-[28px] text-primary"
                      />
                      <span className="text-[12px] text-[#646464]">
                        {type.name}
                      </span>
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Services Filter */}
              <FilterSection title="Services">
                <div className="space-y-3">
                  {servicesOptions.map((option) => (
                    <label
                      key={option}
                      onClick={() => setSelectedService(option)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedService === option
                            ? "border-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedService === option && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className="text-[14px] text-[#646464]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Vehicle Glass Filter */}
              <FilterSection title="Vehicle Glass">
                <div className="space-y-3">
                  {vehicleGlassOptions.map((option) => (
                    <label
                      key={option}
                      onClick={() => setSelectedVehicleGlass(option)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedVehicleGlass === option
                            ? "border-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedVehicleGlass === option && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className="text-[14px] text-[#646464]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Vehicle Condition Filter */}
              <FilterSection title="Vehicle Condition">
                <div className="space-y-3">
                  {vehicleConditionOptions.map((option) => (
                    <label
                      key={option}
                      onClick={() => setSelectedVehicleCondition(option)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedVehicleCondition === option
                            ? "border-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedVehicleCondition === option && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className="text-[14px] text-[#646464]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Vehicle Color Filter */}
              <FilterSection title="Vehicle Color">
                <div className="relative">
                  <select
                    value={selectedVehicleColor}
                    onChange={(e) => setSelectedVehicleColor(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary appearance-none bg-white cursor-pointer"
                  >
                    {vehicleColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                </div>
              </FilterSection>

              {/* Number of Seats Filter */}
              <FilterSection title="Number of Seats">
                <div className="relative">
                  <select
                    value={selectedSeats}
                    onChange={(e) => setSelectedSeats(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary appearance-none bg-white cursor-pointer"
                  >
                    {seatOptions.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                </div>
              </FilterSection>

              {/* Available Dates Filter */}
              <FilterSection title="Available Dates">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-[14px] font-[500] text-primary mb-3">
                    July
                  </p>
                  <div className="grid grid-cols-7 gap-1 text-center text-[12px] mb-2">
                    <span className="text-[#9CA3AF]">Mon</span>
                    <span className="text-[#9CA3AF]">Tu</span>
                    <span className="text-[#9CA3AF]">Wed</span>
                    <span className="text-[#9CA3AF]">Thu</span>
                    <span className="text-[#9CA3AF]">Fri</span>
                    <span className="text-[#9CA3AF]">Sat</span>
                    <span className="text-[#9CA3AF]">Sun</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      1
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      2
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      3
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      4
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      5
                    </span>
                    <span className="py-2 text-[#9CA3AF]">6</span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      7
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      8
                    </span>
                    <button
                      onClick={() =>
                        setSelectedCalendarDate(
                          selectedCalendarDate === 9 ? null : 9,
                        )
                      }
                      className={`py-2 rounded-full ${
                        selectedCalendarDate === 9
                          ? "bg-primary text-white"
                          : "text-[#646464] hover:bg-gray-100"
                      }`}
                    >
                      9
                    </button>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      10
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      11
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      12
                    </span>
                    <span className="py-2 text-[#9CA3AF]">13</span>
                    <span className="py-2 text-[#9CA3AF]">14</span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      15
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      16
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      17
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      18
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      19
                    </span>
                    <span className="py-2 text-[#9CA3AF]">20</span>
                    <span className="py-2 text-[#9CA3AF]">21</span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      22
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      23
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      24
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      25
                    </span>
                    <span className="py-2 text-[#9CA3AF]">26</span>
                    <span className="py-2 text-[#9CA3AF]">27</span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      28
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      29
                    </span>
                    <span className="py-2 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
                      30
                    </span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </FilterSection>
            </div>

            {/* Apply Button - Fixed at bottom */}
            <div className="p-5 border-t border-gray-200">
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full py-4 transition-colors"
              >
                <span className="text-[16px] font-[500]">Apply filters</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar filter (existing implementation)
  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-[350px] sticky top-[100px] h-fit border border-gray-200 rounded-lg p-5 flex-shrink-0 hidden lg:block"
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-200">
        <h2 className="text-[18px] font-[600] text-primary">Filter</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Price Filter */}
      <FilterSection title="Price">
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
          />
        </div>
      </FilterSection>

      {/* Vehicle Type Filter */}
      <FilterSection title="Vehicle type">
        <div className="grid grid-cols-3 gap-2">
          {vehicleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() =>
                setSelectedVehicleType(
                  selectedVehicleType === type.id ? null : type.id,
                )
              }
              className={`flex flex-col items-center justify-center gap-1 p-3 border rounded-lg transition-colors ${
                selectedVehicleType === type.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/30"
              }`}
            >
              <Icon icon={type.icon} className="text-[24px] text-primary" />
              <span className="text-[11px] text-[#646464]">{type.name}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Services Filter */}
      <FilterSection title="Services">
        <div className="space-y-2">
          {servicesOptions.map((option) => (
            <label
              key={option}
              onClick={() => setSelectedService(option)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedService === option
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {selectedService === option && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-[14px] text-[#646464]">{option}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Vehicle Glass Filter */}
      <FilterSection title="Vehicle Glass">
        <div className="space-y-2">
          {vehicleGlassOptions.map((option) => (
            <label
              key={option}
              onClick={() => setSelectedVehicleGlass(option)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedVehicleGlass === option
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {selectedVehicleGlass === option && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-[14px] text-[#646464]">{option}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Vehicle Condition Filter */}
      <FilterSection title="Vehicle Condition">
        <div className="space-y-2">
          {vehicleConditionOptions.map((option) => (
            <label
              key={option}
              onClick={() => setSelectedVehicleCondition(option)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedVehicleCondition === option
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {selectedVehicleCondition === option && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-[14px] text-[#646464]">{option}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Vehicle Color Filter */}
      <FilterSection title="Vehicle Color">
        <div className="relative">
          <select
            value={selectedVehicleColor}
            onChange={(e) => setSelectedVehicleColor(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-primary appearance-none bg-white cursor-pointer"
          >
            {vehicleColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
        </div>
      </FilterSection>

      {/* Number of Seats Filter */}
      <FilterSection title="Number of Seats">
        <div className="relative">
          <select
            value={selectedSeats}
            onChange={(e) => setSelectedSeats(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-primary appearance-none bg-white cursor-pointer"
          >
            {seatOptions.map((seat) => (
              <option key={seat} value={seat}>
                {seat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
        </div>
      </FilterSection>

      {/* Available Dates Filter */}
      <FilterSection title="Available Dates">
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-[14px] font-[500] text-primary mb-3">July</p>
          <div className="grid grid-cols-7 gap-1 text-center text-[12px] mb-2">
            <span className="text-[#9CA3AF]">Mon</span>
            <span className="text-[#9CA3AF]">Tu</span>
            <span className="text-[#9CA3AF]">Wed</span>
            <span className="text-[#9CA3AF]">Thu</span>
            <span className="text-[#9CA3AF]">Fri</span>
            <span className="text-[#9CA3AF]">Sat</span>
            <span className="text-[#9CA3AF]">Sun</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              1
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              2
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              3
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              4
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              5
            </span>
            <span className="py-1.5 text-[#9CA3AF]">6</span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              7
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              8
            </span>
            <button
              onClick={() =>
                setSelectedCalendarDate(selectedCalendarDate === 9 ? null : 9)
              }
              className={`py-1.5 rounded-full ${
                selectedCalendarDate === 9
                  ? "bg-primary text-white"
                  : "text-[#646464] hover:bg-gray-100"
              }`}
            >
              9
            </button>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              10
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              11
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              12
            </span>
            <span className="py-1.5 text-[#9CA3AF]">13</span>
            <span className="py-1.5 text-[#9CA3AF]">14</span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              15
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              16
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              17
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              18
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              19
            </span>
            <span className="py-1.5 text-[#9CA3AF]">20</span>
            <span className="py-1.5 text-[#9CA3AF]">21</span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              22
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              23
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              24
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              25
            </span>
            <span className="py-1.5 text-[#9CA3AF]">26</span>
            <span className="py-1.5 text-[#9CA3AF]">27</span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              28
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              29
            </span>
            <span className="py-1.5 text-[#646464] cursor-pointer hover:bg-gray-100 rounded">
              30
            </span>
            <span></span>
            <span></span>
          </div>
        </div>
      </FilterSection>

      <div className="p-5">
        <button
          onClick={handleApply}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full py-3 transition-colors"
        >
          <span className="text-[16px] font-[500]">Apply filters</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.aside>
  );
};

export default FilterPanel;
