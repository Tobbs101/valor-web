/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { fleet } from "@/apis/fleet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoadingOverlay from "@/components/custom/loading-overlay";
import "react-day-picker/style.css";

// Vehicle type interface
interface VehicleType {
  id: string;
  name: string;
  icon: string;
}

// Fallback vehicle types with icons
const fallbackVehicleTypes: VehicleType[] = [
  { id: "SUV", name: "SUV", icon: "mdi:car-suv" },
  { id: "Sedan", name: "Sedan", icon: "mdi:car-convertible" },
  { id: "Luxury", name: "Luxury", icon: "mdi:car-sports" },
  { id: "Bus", name: "Bus", icon: "mdi:bus" },
  { id: "Pick Up", name: "Pick Up", icon: "mdi:car-pickup" },
  { id: "Mini-van", name: "Mini-van", icon: "mdi:van-passenger" },
  { id: "Vintage", name: "Vintage", icon: "mdi:car-convertible" },
];

// Icon mapping for car types from API
const carTypeIconMap: Record<string, string> = {
  // Sedan: "mdi:car-sedan",
  SUV: "mdi:car-suv",
  Truck: "mdi:truck",
  Van: "mdi:van-utility",
  // Coupe: "mdi:car-coupe",
  Convertible: "mdi:car-convertible",
  Hatchback: "mdi:car-hatchback",
  Wagon: "mdi:car-estate",
  Minivan: "mdi:van-passenger",
  Crossover: "mdi:car-suv",
  Luxury: "mdi:car-sports",
  "Sports Car": "mdi:car-sports",
  Electric: "mdi:car-electric",
  Hybrid: "mdi:car-electric-outline",
  Vintage: "mdi:car-convertible",
  Bus: "mdi:bus",
  "Pick Up": "mdi:car-pickup",
};

const transmissionOptions = ["All transmissions", "Manual", "Automatic"];

const fallbackCarMakeOptions = [
  "Toyota",
  "Mercedez",
  "Lexus",
  "Honda",
  "BMW",
  "Ford",
  "Hyundai",
  "Kia",
  "Nissan",
  "Chevrolet",
];

// const fallbackCarModelOptions = [
//   "Camry",
//   "Corolla",
//   "Highlander",
//   "RAV4",
//   "Land Cruiser",
//   "Accord",
//   "Civic",
//   "CR-V",
//   "RX 350",
//   "ES 350",
//   "GX 460",
// ];

const nigerianStates = [
  "Abia",
  "Abuja",
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

const servicesOptions = [
  "All services",
  "Full day",
  "Airport pick-up",
  "Airport drop-off",
  "Overnight",
];

const serviceTypeMap: Record<
  string,
  "fullDay" | "airportPickUp" | "airportDrop" | "overNight"
> = {
  "Full day": "fullDay",
  "Airport pick-up": "airportPickUp",
  "Airport drop-off": "airportDrop",
  Overnight: "overNight",
};

const serviceTypeReverseMap: Record<
  "fullDay" | "airportPickUp" | "airportDrop" | "overNight",
  string
> = {
  fullDay: "Full day",
  airportPickUp: "Airport pick-up",
  airportDrop: "Airport drop-off",
  overNight: "Overnight",
};

const vehicleGlassOptions = ["All", "Tinted", "Not tinted"];

const vehicleConditionOptions = ["All", "Upgraded", "Not Upgraded"];

const fallbackVehicleColors = [
  "Black",
  "White",
  "Silver",
  "Red",
  "Blue",
  "Grey",
  "Green",
];

const MIN_YEAR = 1990;
const CURRENT_YEAR = new Date().getFullYear();

const allYearOptions = (() => {
  const years: string[] = [];
  for (let year = CURRENT_YEAR; year >= MIN_YEAR; year--) {
    years.push(year.toString());
  }
  return years;
})();

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
  // Zustand filter state
  const { filters, setFilters, resetFilters } =
    require("@/store/search-store").useSearchStore();

  // Local UI state for filters
  const [minPrice, setMinPrice] = useState(filters.cost?.split(",")[0] || "");
  const [maxPrice, setMaxPrice] = useState(filters.cost?.split(",")[1] || "");
  const [selectedVehicleType, setSelectedVehicleType] = useState(
    filters.carType?.[0] || null,
  );
  const [selectedMake, setSelectedMake] = useState(
    filters.carMake || "All makes",
  );
  const [selectedModel, setSelectedModel] = useState(
    filters.carModel || "All models",
  );
  const [selectedTransmission, setSelectedTransmission] = useState(
    filters.transmission || "All transmissions",
  );
  const [selectedYear, setSelectedYear] = useState(
    filters.makeYear || "All Years",
  );
  const [minYear, setMinYear] = useState(filters.minYear || "");
  const [maxYear, setMaxYear] = useState(filters.maxYear || "");
  const [makeSearchQuery, setMakeSearchQuery] = useState("");
  const [modelSearchQuery, setModelSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(
    filters.serviceType
      ? serviceTypeReverseMap[
          filters.serviceType as
            | "fullDay"
            | "airportPickUp"
            | "airportDrop"
            | "overNight"
        ] || "All services"
      : "All services",
  );
  const [selectedVehicleGlass, setSelectedVehicleGlass] = useState(
    filters.carTint || "All",
  );
  const [selectedVehicleCondition, setSelectedVehicleCondition] = useState(
    filters.upgrade || "All",
  );
  const [selectedVehicleColor, setSelectedVehicleColor] = useState(
    filters.carColor || "All",
  );
  const [minSeats, setMinSeats] = useState(
    filters.capacity?.split(",")[0] || "",
  );
  const [maxSeats, setMaxSeats] = useState(
    filters.capacity?.split(",")[1] || "",
  );
  const [selectedDate, setSelectedDate] = useState(
    filters.availableDates?.[0] || "All dates",
  );
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<
    number | null
  >(null);
  const [selectedState, setSelectedState] = useState(filters.state || "");
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (filters.availableDates?.length) {
      return filters.availableDates.map((d: string) => new Date(d));
    }
    return [];
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // Format a raw number string as naira for display (e.g. "150000" -> "₦150,000")
  const formatNairaDisplay = (value: string) => {
    if (!value) return "";
    const num = Number(value);
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Strip non-numeric characters from input and update state with raw number
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
  ) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setter(raw);
  };

  const isInitialMount = useRef(true);

  // Fetch vehicle makes from API
  const { data: vehicleMakesData } = useQuery(
    "vehicleMakes",
    () => fleet.getVehicleMakes(),
    {
      staleTime: 1000 * 60 * 30, // Cache for 30 minutes
      refetchOnWindowFocus: false,
    },
  );

  // Fetch vehicle makes from API
  const { data: vehicleModelsData } = useQuery(
    ["vehicleModels", selectedMake, makeSearchQuery],
    () =>
      fleet.getVehicleModels(
        makeSearchQuery
          ? { make: makeSearchQuery?.toLowerCase() }
          : {
              make:
                selectedMake !== "All makes" ? selectedMake?.toLowerCase() : "",
            },
      ),
    {
      staleTime: 1000 * 60 * 30, // Cache for 30 minutes
      refetchOnWindowFocus: false,
    },
  );

  const { data: carTypes } = useQuery("carTypes", () => fleet.getCarTypes(), {
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false,
  });

  const { data: carColors } = useQuery("carColors", () => fleet.getColor(), {
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false,
  });

  // Build vehicle types with API data or fallback
  // const vehicleTypes: VehicleType[] =
  //   carTypes?.data?.length > 0
  //     ? carTypes.data.map(
  //         (item: { _id: string; carType: string; createdBy: string }) => ({
  //           id: item.carType,
  //           name: item.carType,
  //           icon: carTypeIconMap[item.carType] || "mdi:car-sports",
  //         }),
  //       )
  //     : fallbackVehicleTypes;

  const vehicleTypes = fallbackVehicleTypes;

  // Build car make options with API data or fallback
  const carMakeOptions = [
    "All makes",
    ...(vehicleMakesData?.data?.length > 0
      ? vehicleMakesData.data.map(
          (item: { _id: string; make: string; status: string }) => item.make,
        )
      : fallbackCarMakeOptions),
  ];

  // Build car model options with API data or fallback
  const carModelOptions = [
    "All models",
    ...(vehicleModelsData?.data?.length > 0
      ? vehicleModelsData.data.map(
          (item: {
            _id: string;
            model: string;
            makeId: { _id: string; make: string };
            status: string;
          }) => item.model,
        )
      : []),
  ];

  // Build vehicle colors with API data or fallback
  const vehicleColors = [
    "All",
    ...(carColors?.data?.length > 0
      ? carColors.data.map(
          (item: { _id: string; color: string; createdBy: string }) =>
            item.color,
        )
      : fallbackVehicleColors),
  ];

  // Sync local state with global filters when they change (except dates to avoid infinite loop)
  useEffect(() => {
    setSelectedVehicleType(filters.carType?.[0] || null);
    setSelectedState(filters.state || "");
  }, [filters.carType, filters.state]);

  // Helper function to build API filters from current state
  const buildApiFilters = useCallback(() => {
    // Map transmission to lowercase
    const transmissionValue =
      selectedTransmission === "Manual"
        ? "manual"
        : selectedTransmission === "Automatic"
          ? "automatic"
          : undefined;

    // Map vehicle glass to API format
    const vehicleGlassValue =
      selectedVehicleGlass === "Tinted"
        ? "tinted"
        : selectedVehicleGlass === "Not tinted"
          ? "none_tinted"
          : undefined;

    // Map vehicle condition to API format
    const conditionValue =
      selectedVehicleCondition === "Upgraded"
        ? "upgraded"
        : selectedVehicleCondition === "Not Upgraded"
          ? "not_upgraded"
          : undefined;

    // Map service option to API serviceType
    const serviceTypeValue =
      selectedService !== "All services"
        ? serviceTypeMap[selectedService]
        : undefined;

    // Combine minYear and maxYear into makeYear format
    const makeYearValue = maxYear ? `${minYear || "0"},${maxYear}` : undefined;

    return {
      sortOrder: filters.sortOrder || "",
      sortBy: filters.sortBy || "",
      page: filters.page || 1,
      limit: filters.limit || 90,
      cost: maxPrice ? `${minPrice || "0"},${maxPrice}` : undefined,
      carType: selectedVehicleType ? [selectedVehicleType] : undefined,
      state: selectedState || undefined,
      carMake: selectedMake !== "All makes" ? selectedMake : undefined,
      carModel: selectedModel !== "All models" ? selectedModel : undefined,
      transmission: transmissionValue,
      makeYear: makeYearValue,
      serviceType: serviceTypeValue,
      vehicleGlass: vehicleGlassValue,
      condition: conditionValue,
      carColor:
        selectedVehicleColor !== "All"
          ? selectedVehicleColor.toLowerCase()
          : undefined,
      capacity: minSeats || maxSeats ? `${minSeats},${maxSeats}` : undefined,
      availableDates:
        selectedDates.length > 0
          ? selectedDates.map((d) => format(d, "yyyy-MM-dd"))
          : undefined,
    };
  }, [
    filters.sortOrder,
    filters.sortBy,
    filters.page,
    filters.limit,
    minPrice,
    maxPrice,
    selectedVehicleType,
    selectedState,
    selectedMake,
    selectedModel,
    selectedTransmission,
    minYear,
    maxYear,
    selectedService,
    selectedVehicleGlass,
    selectedVehicleCondition,
    selectedVehicleColor,
    minSeats,
    maxSeats,
    selectedDates,
  ]);

  // Keep a ref to buildApiFilters so autoApply stays referentially stable
  const buildApiFiltersRef = useRef(buildApiFilters);
  buildApiFiltersRef.current = buildApiFilters;

  // Auto-apply function with loading overlay (stable reference)
  const autoApply = useCallback(async () => {
    setIsFilterLoading(true);
    const apiFilters = buildApiFiltersRef.current();
    // Strip undefined values so they don't overwrite existing filters
    const cleanFilters = Object.fromEntries(
      Object.entries(apiFilters).filter(([, v]) => v !== undefined),
    );
    setFilters(cleanFilters);
    await onApplyFilters?.();
    setIsFilterLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFilters]);

  // Auto-apply for non min/max fields
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    autoApply();
  }, [
    selectedVehicleType,
    selectedState,
    selectedMake,
    selectedModel,
    selectedTransmission,
    selectedService,
    selectedVehicleGlass,
    selectedVehicleCondition,
    selectedVehicleColor,
    selectedDates,
    minYear,
    maxYear,
    autoApply,
  ]);

  const handleDateSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates || []);
  };

  const removeDate = (dateToRemove: Date) => {
    setSelectedDates(
      selectedDates.filter((date) => date.getTime() !== dateToRemove.getTime()),
    );
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (minPrice || maxPrice) count++;
    if (selectedVehicleType) count++;
    if (selectedState) count++;
    if (selectedDates.length > 0) count++;
    if (selectedMake !== "All makes") count++;
    if (selectedModel !== "All models") count++;
    if (selectedTransmission !== "All transmissions") count++;
    if (selectedYear !== "All Years") count++;
    if (minYear || maxYear) count++;
    if (selectedService !== "All services") count++;
    if (selectedVehicleGlass !== "All") count++;
    if (selectedVehicleCondition !== "All") count++;
    if (selectedVehicleColor !== "All") count++;
    if (minSeats || maxSeats) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Map UI state to API payload
  const handleApply = async (isMobile?: boolean) => {
    setIsFilterLoading(true);
    const apiFilters = buildApiFilters();
    setFilters(apiFilters);
    await onApplyFilters?.();
    setIsFilterLoading(false);

    if (isMobile) return onClose();
  };

  // Clear filters handler
  const handleClear = async (isMobile?: boolean) => {
    setIsFilterLoading(true);
    resetFilters();
    setMinPrice("");
    setMaxPrice("");
    setSelectedVehicleType(null);
    setSelectedState("");
    setSelectedDates([]);
    setSelectedMake("All makes");
    setSelectedModel("All models");
    setSelectedTransmission("All transmissions");
    setSelectedYear("All Years");
    setMinYear("");
    setMaxYear("");
    setMakeSearchQuery("");
    setModelSearchQuery("");
    setSelectedService("All services");
    setSelectedVehicleGlass("All");
    setSelectedVehicleCondition("All");
    setSelectedVehicleColor("All");
    setMinSeats("");
    setMaxSeats("");
    setSelectedDate("All dates");
    setSelectedCalendarDate(null);
    await onApplyFilters?.();
    setIsFilterLoading(false);

    if (isMobile) return onClose();
  };

  // Mobile fullscreen filter
  if (isMobile) {
    return (
      <>
        <LoadingOverlay
          isLoading={isFilterLoading}
          message="Applying filters..."
        />
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
                <FilterSection title="Price" defaultOpen={false}>
                  <div className="flex flex-col flex-wrap gap-3">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Min"
                      value={formatNairaDisplay(minPrice)}
                      onChange={(e) => handlePriceChange(e, setMinPrice)}
                      className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Max"
                      value={formatNairaDisplay(maxPrice)}
                      onChange={(e) => handlePriceChange(e, setMaxPrice)}
                      className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => autoApply()}
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 text-[14px] font-[500] transition-colors"
                    >
                      Apply Price
                    </button>
                  </div>
                </FilterSection>

                {/* State Filter */}
                <FilterSection title="State" defaultOpen={false}>
                  <Select
                    value={selectedState}
                    onValueChange={setSelectedState}
                  >
                    <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-5 pr-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] z-[10000]">
                      {nigerianStates.map((state) => (
                        <SelectItem
                          key={state}
                          value={state}
                          className="text-sm"
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FilterSection>

                {/* Available Dates Filter */}
                <FilterSection title="Rental Date" defaultOpen={false}>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <button className="w-full h-[50px] rounded-full border border-gray-200 bg-gray-50/50 px-5 text-sm font-medium flex items-center justify-between gap-2 hover:bg-gray-100/50 transition-colors">
                        <span
                          className={cn(
                            "truncate",
                            selectedDates.length === 0 &&
                              "text-muted-foreground",
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
                    <PopoverContent
                      className="w-auto p-0 z-[10000]"
                      align="start"
                    >
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
                            <div className="flex w-full max-w-[320px] flex-wrap gap-1">
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
                </FilterSection>

                {/* Vehicle Type Filter */}
                <FilterSection title="Vehicle type" defaultOpen={false}>
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

                {/* Transmission Filter */}
                <FilterSection title="Transmission" defaultOpen={false}>
                  <div className="space-y-3">
                    {transmissionOptions.map((option) => (
                      <label
                        key={option}
                        onClick={() => setSelectedTransmission(option)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedTransmission === option
                              ? "border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedTransmission === option && (
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

                {/* Car Make Filter */}
                <FilterSection title="Car Make" defaultOpen={false}>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for car make"
                        value={makeSearchQuery}
                        onChange={(e) => setMakeSearchQuery(e.target.value)}
                        className="w-full border border-gray-200 rounded-full px-4 py-3 text-[14px] outline-none focus:border-primary"
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto space-y-2">
                      {carMakeOptions
                        .filter((make) =>
                          make
                            .toLowerCase()
                            .includes(makeSearchQuery.toLowerCase()),
                        )
                        .map((make) => (
                          <label
                            key={make}
                            onClick={() => setSelectedMake(make)}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedMake === make
                                  ? "border-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedMake === make && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className="text-[14px] text-[#646464]">
                              {make === "All makes" ? "Show all" : make}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                </FilterSection>

                {/* Car Model Filter */}
                <FilterSection title="Car Model" defaultOpen={false}>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for car model"
                        value={modelSearchQuery}
                        onChange={(e) => setModelSearchQuery(e.target.value)}
                        className="w-full border border-gray-200 rounded-full px-4 py-3 text-[14px] outline-none focus:border-primary"
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto space-y-2">
                      {carModelOptions
                        .filter((model) =>
                          model
                            .toLowerCase()
                            .includes(modelSearchQuery.toLowerCase()),
                        )
                        .map((model) => (
                          <label
                            key={model}
                            onClick={() => setSelectedModel(model)}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <div
                              className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center ${
                                selectedModel === model
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedModel === model && (
                                <Icon
                                  icon="mdi:check"
                                  className="text-white text-[14px]"
                                />
                              )}
                            </div>
                            <span className="text-[14px] text-[#646464]">
                              {model === "All models" ? "Show All" : model}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                </FilterSection>

                {/* Year of Manufacturing Filter */}
                <FilterSection title="Year of Manufacturing" defaultOpen={false}>
                  <div className="flex flex-col flex-wrap gap-3">
                    <Select
                      value={minYear}
                      onValueChange={(value) =>
                        setMinYear(value === "clear" ? "" : value)
                      }
                    >
                      <SelectTrigger className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary">
                        <SelectValue placeholder="Min Year" />
                      </SelectTrigger>
                      <SelectContent className="z-[100000]">
                        {/* <SelectItem value="clear">Min Year</SelectItem> */}
                        {allYearOptions
                          .filter(
                            (y) => !maxYear || Number(y) <= Number(maxYear),
                          )
                          .map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={maxYear}
                      onValueChange={(value) =>
                        setMaxYear(value === "clear" ? "" : value)
                      }
                    >
                      <SelectTrigger className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary">
                        <SelectValue placeholder="Max Year" />
                      </SelectTrigger>
                      <SelectContent className="z-[100000]">
                        {/* <SelectItem value="clear">Max Year</SelectItem> */}
                        {allYearOptions
                          .filter(
                            (y) => !minYear || Number(y) >= Number(minYear),
                          )
                          .map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FilterSection>

                {/* Services Filter */}
                <FilterSection title="Services" defaultOpen={false}>
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
                <FilterSection title="Vehicle Glass" defaultOpen={false}>
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
                <FilterSection title="Vehicle Condition" defaultOpen={false}>
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
                <FilterSection title="Vehicle Color" defaultOpen={false}>
                  <Select
                    value={selectedVehicleColor}
                    onValueChange={setSelectedVehicleColor}
                  >
                    <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-5 pr-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select Color" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] z-[10000]">
                      {vehicleColors.map((color) => (
                        <SelectItem
                          key={color}
                          value={color}
                          className="text-sm"
                        >
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FilterSection>

                {/* Number of Seats Filter */}
                <FilterSection title="Number of Seats" defaultOpen={false}>
                  <div className="flex flex-col flex-wrap gap-3">
                    <input
                      type="number"
                      placeholder="Min (1)"
                      min={1}
                      max={100}
                      value={minSeats}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (
                          val === "" ||
                          (Number(val) >= 1 && Number(val) <= 100)
                        ) {
                          setMinSeats(val);
                        }
                      }}
                      className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary"
                    />
                    <input
                      type="number"
                      placeholder="Max (2-100)"
                      min={2}
                      max={100}
                      value={maxSeats}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (
                          val === "" ||
                          (Number(val) >= 2 && Number(val) <= 100)
                        ) {
                          setMaxSeats(val);
                        }
                      }}
                      className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-[14px] text-center outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => autoApply()}
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 text-[14px] font-[500] transition-colors"
                    >
                      Apply Seats
                    </button>
                  </div>
                </FilterSection>
              </div>

              {/* Apply & Clear Buttons - Fixed at bottom */}
              <div className="p-5 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => handleClear(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-primary rounded-full py-4 transition-colors"
                >
                  <span className="text-[16px] font-[500]">Clear filters</span>
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleApply(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full py-4 transition-colors"
                >
                  <span className="text-[16px] font-[500]">Apply filters</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop sidebar filter (existing implementation)
  if (!isOpen) return null;

  return (
    <>
      <LoadingOverlay
        isLoading={isFilterLoading}
        message="Applying filters..."
      />
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-[350px] lg:overflow-y-auto border border-gray-200 rounded-lg p-5 flex-shrink-0 hidden lg:block"
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
              type="text"
              inputMode="numeric"
              placeholder="Min"
              value={formatNairaDisplay(minPrice)}
              onChange={(e) => handlePriceChange(e, setMinPrice)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Max"
              value={formatNairaDisplay(maxPrice)}
              onChange={(e) => handlePriceChange(e, setMaxPrice)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
            />
            <button
              onClick={() => autoApply()}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 text-[14px] font-[500] transition-colors"
            >
              Apply Price
            </button>
          </div>
        </FilterSection>

        {/* State Filter */}
        <FilterSection title="State">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full h-[44px] rounded-lg border border-gray-200 bg-gray-50/50 px-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
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
        </FilterSection>

        {/* Available Dates Filter */}
        <FilterSection title="Rental Date">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <button className="w-full h-[44px] rounded-lg border border-gray-200 bg-gray-50/50 px-4 text-sm font-medium flex items-center justify-between gap-2 hover:bg-gray-100/50 transition-colors">
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
                    <div className="flex w-full max-w-[320px] flex-wrap gap-1">
                      {selectedDates.map((date, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                          {format(date, "MMM d, yyyy")}
                          <button
                            onClick={() => removeDate(date)}
                            className="hover:bg-primary/20 rounded-full"
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
        </FilterSection>

        {/* Vehicle Type Filter */}
        <FilterSection title="Vehicle type">
          <div className="grid grid-cols-3 max-h-[200px] p-3 overflow-y-scroll gap-2">
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

        {/* Transmission Filter */}
        <FilterSection title="Transmission">
          <div className="space-y-2">
            {transmissionOptions.map((option) => (
              <label
                key={option}
                onClick={() => setSelectedTransmission(option)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedTransmission === option
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {selectedTransmission === option && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-[14px] text-[#646464]">{option}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Car Make Filter */}
        <FilterSection title="Car Make">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for car make"
                value={makeSearchQuery}
                onChange={(e) => setMakeSearchQuery(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
              />
            </div>
            <div className="max-h-[180px] overflow-y-auto space-y-2">
              {carMakeOptions
                .filter((make) =>
                  make.toLowerCase().includes(makeSearchQuery.toLowerCase()),
                )
                .map((make) => (
                  <label
                    key={make}
                    onClick={() => setSelectedMake(make)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMake === make
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedMake === make && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-[14px] text-[#646464]">
                      {make === "All makes" ? "Show all" : make}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        </FilterSection>

        {/* Car Model Filter */}
        <FilterSection title="Car Model">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for car model"
                value={modelSearchQuery}
                onChange={(e) => setModelSearchQuery(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
              />
            </div>
            <div className="max-h-[180px] overflow-y-auto space-y-2">
              {carModelOptions
                .filter((model) =>
                  model.toLowerCase().includes(modelSearchQuery.toLowerCase()),
                )
                .map((model) => (
                  <label
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center ${
                        selectedModel === model
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedModel === model && (
                        <Icon
                          icon="mdi:check"
                          className="text-white text-[14px]"
                        />
                      )}
                    </div>
                    <span className="text-[14px] text-[#646464]">
                      {model === "All models" ? "Show All" : model}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        </FilterSection>

        {/* Year of Manufacturing Filter */}
        <FilterSection title="Year of Manufacturing">
          <div className="flex flex-col gap-3">
            <Select
              value={minYear}
              onValueChange={(value) =>
                setMinYear(value === "clear" ? "" : value)
              }
            >
              <SelectTrigger className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary">
                <SelectValue placeholder="Min Year" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="clear">Min Year</SelectItem> */}
                {allYearOptions
                  .filter((y) => !maxYear || Number(y) <= Number(maxYear))
                  .map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select
              value={maxYear}
              onValueChange={(value) =>
                setMaxYear(value === "clear" ? "" : value)
              }
            >
              <SelectTrigger className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary">
                <SelectValue placeholder="Max Year" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="clear">Max Year</SelectItem> */}
                {allYearOptions
                  .filter((y) => !minYear || Number(y) >= Number(minYear))
                  .map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
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
          <Select
            value={selectedVehicleColor}
            onValueChange={setSelectedVehicleColor}
          >
            <SelectTrigger className="w-full h-[44px] rounded-lg border border-gray-200 bg-gray-50/50 px-4 text-sm font-medium focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {vehicleColors.map((color) => (
                <SelectItem key={color} value={color} className="text-sm">
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        {/* Number of Seats Filter */}
        <FilterSection title="Number of Seats">
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Min (1)"
              min={1}
              max={100}
              value={minSeats}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (Number(val) >= 1 && Number(val) <= 100)) {
                  setMinSeats(val);
                }
              }}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
            />
            <input
              type="number"
              placeholder="Max (2-100)"
              min={2}
              max={100}
              value={maxSeats}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (Number(val) >= 2 && Number(val) <= 100)) {
                  setMaxSeats(val);
                }
              }}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary"
            />
            <button
              onClick={() => autoApply()}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 text-[14px] font-[500] transition-colors"
            >
              Apply Seats
            </button>
          </div>
        </FilterSection>

        <div className="py-5 flex-wrap flex gap-3">
          <button
            onClick={() => handleClear()}
            className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-primary text-primary rounded-full py-3 transition-colors"
          >
            <span className="text-[14px] font-[500]">Clear filters</span>
          </button>
          <button
            onClick={() => handleApply()}
            className="flex-1 flex items-center justify-center border border-primary gap-2 bg-primary hover:bg-primary/90 text-white rounded-full py-3 transition-colors"
          >
            <span className="text-[14px] font-[500]">Apply filters</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default FilterPanel;
