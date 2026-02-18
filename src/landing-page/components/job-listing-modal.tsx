"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ChevronLeft, Clock, XIcon } from "lucide-react";
import { useMutation } from "react-query";
import {
  jobListing,
  ShortTermListingPayload,
  LongTermListingPayload,
} from "@/apis/job-listing";
import GooglePlacesAutocomplete from "@/components/custom/google-places-autocomplete";
import { toast } from "@/hooks/use-toast";
import SuccessModalCard from "@/components/custom/success-modal";
import { useJobListingStore } from "@/store/job-listing-store";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useQuery } from "react-query";
import { fleet } from "@/apis/fleet";
import { Icon } from "@iconify/react/dist/iconify.js";

interface JobListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Vehicle type interface
interface VehicleType {
  id: string;
  name: string;
  icon: string;
}

const fallbackVehicleTypes: VehicleType[] = [
  { id: "Sedan", name: "Sedan", icon: "mdi:car-sedan" },
  { id: "SUV", name: "SUV", icon: "mdi:car-suv" },
  { id: "Luxury", name: "Luxury", icon: "mdi:car-sports" },
  { id: "Vintage", name: "Vintage", icon: "mdi:car-convertible" },
  { id: "Pick Up", name: "Pick Up", icon: "mdi:car-pickup" },
  { id: "Mini-van", name: "Mini-van", icon: "mdi:van-passenger" },
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

const jobTypes = ["Full Day", "Airport Pickup", "Airport Drop-off"];

// Native Time Picker Component
const TimePickerInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}> = ({ value, onChange, label, containerRef }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    // Use showPicker() to open the time picker on any click
    if (inputRef.current && typeof inputRef.current.showPicker === "function") {
      try {
        inputRef.current.showPicker();
      } catch (e) {
        // Some browsers may throw if already open
      }
    }
  };

  // Convert 12-hour format to 24-hour for HTML input
  const to24Hour = (time12: string): string => {
    if (!time12) return "";
    const match = time12.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return "";
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = match[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  // Convert 24-hour format to 12-hour for display
  const to12Hour = (time24: string): string => {
    if (!time24) return "";
    const [hourStr, minutes] = time24.split(":");
    let hours = parseInt(hourStr, 10);
    const period = hours >= 12 ? "PM" : "AM";
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${period}`;
  };

  return (
    <div ref={containerRef}>
      {label && (
        <label className="block text-[14px] font-[600] text-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative" onClick={handleClick}>
        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="time"
          value={to24Hour(value)}
          onChange={(e) => onChange(to12Hour(e.target.value))}
          onClick={handleClick}
          className="w-full h-[50px] rounded-full border border-gray-200 pl-10 pr-5 text-[14px] bg-white hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
        />
      </div>
    </div>
  );
};

interface LocationData {
  address: string;
  state: string;
  country: string;
  coordinates: {
    longitude: number;
    latitude: number;
    coordinates: [number, number];
  };
}

const jobDurations = [
  { value: "short-term", label: "Short-Term: For rentals less than 3 weeks" },
  { value: "long-term", label: "Long-Term: For rentals 3 weeks or more" },
];

const JobListingModal: React.FC<JobListingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Refs for step 1 inputs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const jobDurationRef = useRef<HTMLButtonElement>(null);

  // Refs for step 2 inputs
  const stateRef = useRef<HTMLButtonElement>(null);
  const vehicleTypeRef = useRef<HTMLButtonElement>(null);
  const tripDatesRef = useRef<HTMLDivElement>(null);
  const pickupTimeRef = useRef<HTMLDivElement>(null);
  const closingTimeRef = useRef<HTMLDivElement>(null);
  const pickupLocationRef = useRef<HTMLDivElement>(null);
  const dropoffLocationRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const vehicleSelectRef = useRef<HTMLButtonElement>(null);

  // Zustand store for step 1 persistence
  const { step1Data, setStep1Data, resetStore } = useJobListingStore();
  const { firstName, lastName, email, phoneNumber, jobDuration } = step1Data;

  // Step 1 field setters that update the store
  const setFirstName = (value: string) => setStep1Data({ firstName: value });
  const setLastName = (value: string) => setStep1Data({ lastName: value });
  const setEmail = (value: string) => setStep1Data({ email: value });
  const setPhoneNumber = (value: string) =>
    setStep1Data({ phoneNumber: value });
  const setJobDuration = (value: string) =>
    setStep1Data({ jobDuration: value });

  const { data: carTypes } = useQuery("carTypes", () => fleet.getCarTypes(), {
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false,
  });

  const vehicleTypes: VehicleType[] =
    carTypes?.data?.length > 0
      ? carTypes.data.map(
          (item: { _id: string; carType: string; createdBy: string }) => ({
            id: item.carType,
            name: item.carType,
            icon: carTypeIconMap[item.carType] || "mdi:car-sports",
          }),
        )
      : fallbackVehicleTypes;

  // Validation helpers
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Use library validation for international phone numbers
    if (!phone) return false;
    return isValidPhoneNumber(phone);
  };

  // Step 2 fields (Short-term)
  const [state, setState] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [jobType, setJobType] = useState("Full Day");

  // When switching to airport trip type, keep only the first date if multiple selected
  const handleJobTypeChange = (newJobType: string) => {
    setJobType(newJobType);
    if (
      (newJobType === "Airport Pickup" || newJobType === "Airport Drop-off") &&
      tripDates.length > 1
    ) {
      setTripDates([tripDates[0]]);
    }
  };
  const [pickupTime, setPickupTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupLocationData, setPickupLocationData] =
    useState<LocationData | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dropoffLocationData, setDropoffLocationData] =
    useState<LocationData | null>(null);
  const [tripDates, setTripDates] = useState<Date[]>([]);

  // Handler for DayPicker date selection
  const handleDateSelect = (dates: Date | Date[] | undefined) => {
    if (!dates) {
      setTripDates([]);
    } else if (Array.isArray(dates)) {
      setTripDates(dates);
    } else {
      // Single date selection (for airport trips)
      setTripDates([dates]);
    }
  };

  // Remove a specific date from selection
  const removeDate = (dateToRemove: Date) => {
    setTripDates(
      tripDates.filter((date) => date.getTime() !== dateToRemove.getTime()),
    );
  };
  const [timeOfFlight, setTimeOfFlight] = useState("");
  const [airportName, setAirportName] = useState("");
  const [itinerary, setItinerary] = useState("");

  // Step 2 fields (Long-term)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vehicles, setVehicles] = useState<
    { type: string; quantity: string }[]
  >([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [vehicleQuantity, setVehicleQuantity] = useState("1");
  const [note, setNote] = useState("");

  const isShortTerm = jobDuration === "short-term";
  const isLongTerm = jobDuration === "long-term";
  const isAirportRelated =
    jobType === "Airport Pickup" || jobType === "Airport Drop-off";

  // API mutations
  const shortTermMutation = useMutation(
    (payload: ShortTermListingPayload) =>
      jobListing.createShortTermListing({ payload }),
    {
      onSuccess: () => {
        handleClose();
        setShowSuccessModal(true);
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description:
            error?.response?.data?.message ||
            "Failed to submit listing. Please try again.",
          variant: "destructive",
        });
      },
    },
  );

  const longTermMutation = useMutation(
    (payload: LongTermListingPayload) =>
      jobListing.createLongTermListing({ payload }),
    {
      onSuccess: () => {
        handleClose();
        setShowSuccessModal(true);
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description:
            error?.response?.data?.message ||
            "Failed to submit listing. Please try again.",
          variant: "destructive",
        });
      },
    },
  );

  // Helper to extract location data from Google Places result
  const extractLocationData = (
    address: string,
    placeDetails?: {
      formatted_address?: string;
      name?: string;
      place_id?: string;
      geometry?: {
        location?: {
          lat: () => number;
          lng: () => number;
        };
      };
    },
  ): LocationData => {
    const lat = placeDetails?.geometry?.location?.lat() || 0;
    const lng = placeDetails?.geometry?.location?.lng() || 0;

    // Use selected state from form
    const extractedState = state || "";

    return {
      address,
      state: extractedState,
      country: "nigeria",
      coordinates: {
        longitude: lng,
        latitude: lat,
        coordinates: [lng, lat],
      },
    };
  };

  const isStep1Valid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    isValidEmail(email) &&
    phoneNumber.trim() !== "" &&
    isValidPhone(phoneNumber) &&
    jobDuration !== "";

  // Individual field validation for UI feedback
  const firstNameError = showValidation && firstName.trim() === "";
  const lastNameError = showValidation && lastName.trim() === "";
  const emailError =
    showValidation && (email.trim() === "" || !isValidEmail(email));
  const phoneError =
    showValidation && (phoneNumber.trim() === "" || !isValidPhone(phoneNumber));
  const jobDurationError = showValidation && jobDuration === "";

  const isStep2ValidShortTerm =
    state !== "" &&
    vehicleType !== "" &&
    jobType !== "" &&
    pickupTime !== "" &&
    closingTime !== "" &&
    pickupLocation !== "" &&
    dropoffLocation !== "" &&
    tripDates.length > 0;

  const isStep2ValidLongTerm =
    state !== "" && startDate !== "" && endDate !== "" && vehicles.length > 0;

  const isStep2Valid = isShortTerm
    ? isStep2ValidShortTerm
    : isStep2ValidLongTerm;

  const resetForm = () => {
    setStep(1);
    setShowValidation(false);
    resetStore();
    setState("");
    setVehicleType("");
    setJobType("Full Day");
    setPickupTime("");
    setClosingTime("");
    setPickupLocation("");
    setPickupLocationData(null);
    setDropoffLocation("");
    setDropoffLocationData(null);
    setTripDates([]);
    setTimeOfFlight("");
    setAirportName("");
    setItinerary("");
    setStartDate("");
    setEndDate("");
    setVehicles([]);
    setSelectedVehicleType("");
    setVehicleQuantity("1");
    setNote("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (isShortTerm) {
        // Map jobType to API tripType format
        const tripTypeMap: Record<
          string,
          "full day" | "airport pickup" | "airport dropoff"
        > = {
          "Full Day": "full day",
          "Airport Pickup": "airport pickup",
          "Airport Drop-off": "airport dropoff",
        };

        const shortTermPayload: ShortTermListingPayload = {
          fName: firstName,
          lName: lastName,
          email,
          phoneNumber: phoneNumber || "",
          state,
          carType: vehicleType,
          tripType: tripTypeMap[jobType],
          tripDate: tripDates.map((date) => format(date, "yyyy-MM-dd")),
          pickUpTime: pickupTime,
          closingTime,
          pickUpLocation: pickupLocationData || {
            address: pickupLocation,
            state,
            country: "nigeria",
            coordinates: { longitude: 0, latitude: 0, coordinates: [0, 0] },
          },
          dropOffLocation: dropoffLocationData || {
            address: dropoffLocation,
            state,
            country: "nigeria",
            coordinates: { longitude: 0, latitude: 0, coordinates: [0, 0] },
          },
          itinerary,
          note: note || undefined,
          timeOfFlight: isAirportRelated ? timeOfFlight : undefined,
          airportName: isAirportRelated ? airportName : undefined,
        };

        await shortTermMutation.mutateAsync(shortTermPayload);
      } else {
        const longTermPayload: LongTermListingPayload = {
          fName: firstName,
          lName: lastName,
          email,
          phoneNumber: phoneNumber || "",
          state,
          itinerary,
          note: note || undefined,
          startDate,
          endDate,
          carType: vehicles.map((v) => ({
            carType: v.type,
            quantity: parseInt(v.quantity, 10),
          })),
        };

        await longTermMutation.mutateAsync(longTermPayload);
      }
    } finally {
      resetForm();
      resetStore();
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setShowValidation(true);

      // Focus on the first invalid field
      if (firstName.trim() === "") {
        firstNameRef.current?.focus();
        return;
      }
      if (lastName.trim() === "") {
        lastNameRef.current?.focus();
        return;
      }
      if (email.trim() === "" || !isValidEmail(email)) {
        emailRef.current?.focus();
        return;
      }
      if (phoneNumber.trim() === "" || !isValidPhone(phoneNumber)) {
        const phoneInput = phoneRef.current?.querySelector("input");
        phoneInput?.focus();
        return;
      }
      if (jobDuration === "") {
        jobDurationRef.current?.click();
        return;
      }

      if (isStep1Valid) {
        setShowValidation(false);
        setStep(2);
      }
    } else if (step === 2) {
      setShowValidation(true);

      // Short-term validation
      if (isShortTerm) {
        if (state === "") {
          stateRef.current?.click();
          return;
        }
        if (vehicleType === "") {
          vehicleTypeRef.current?.click();
          return;
        }
        if (tripDates.length === 0) {
          tripDatesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          return;
        }
        if (pickupTime === "") {
          const input = pickupTimeRef.current?.querySelector("input");
          input?.showPicker?.();
          input?.focus();
          return;
        }
        if (closingTime === "") {
          const input = closingTimeRef.current?.querySelector("input");
          input?.showPicker?.();
          input?.focus();
          return;
        }
        if (pickupLocation === "") {
          const input = pickupLocationRef.current?.querySelector("input");
          input?.focus();
          return;
        }
        if (dropoffLocation === "") {
          const input = dropoffLocationRef.current?.querySelector("input");
          input?.focus();
          return;
        }
      }

      // Long-term validation
      if (isLongTerm) {
        if (state === "") {
          stateRef.current?.click();
          return;
        }
        if (startDate === "") {
          startDateRef.current?.showPicker?.();
          startDateRef.current?.focus();
          return;
        }
        if (endDate === "") {
          endDateRef.current?.showPicker?.();
          endDateRef.current?.focus();
          return;
        }
        if (vehicles.length === 0) {
          vehicleSelectRef.current?.click();
          return;
        }
      }

      if (isStep2Valid) {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  // Prevent dialog from closing when clicking on Google Places autocomplete
  const handleInteractOutside = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(".pac-container") ||
      target.classList.contains("pac-item") ||
      target.classList.contains("pac-item-query") ||
      target.classList.contains("pac-matched")
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="max-w-[500px] p-0 w-[95%] max-h-[95svh] overflow-y-auto rounded-2xl z-[101]"
          onInteractOutside={handleInteractOutside}
          onPointerDownOutside={handleInteractOutside}
        >
          {step === 2 && (
            <button
              onClick={handleBack}
              className="absolute left-4 top-4 w-[40px] h-[40px] rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
          )}

          <DialogHeader className={cn("mt-5 px-5 pt-5", step === 2 && "pt-10")}>
            <DialogTitle className="text-[28px] font-[700] text-primary">
              Job Listing - Step {step}/2
            </DialogTitle>
            <p className="text-[14px] text-[#646464] mt-1">
              Please fill in the form below to post a listing. Interested car
              hosts will submit a bid.
            </p>
          </DialogHeader>

          <div className="space-y-5 p-5 max-h-[calc(95svh-280px)] border-t border-b border-gray-200 overflow-y-auto mt-4">
            {step === 1 && (
              <>
                {/* First Name */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    First name
                  </label>
                  <input
                    ref={firstNameRef}
                    type="text"
                    placeholder="Enter first name"
                    className={`w-full border rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] ${firstNameError ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {firstNameError && (
                    <p className="text-red-500 text-xs mt-1 ml-4">
                      First name is required
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Last name
                  </label>
                  <input
                    ref={lastNameRef}
                    type="text"
                    placeholder="Enter Last name"
                    className={`w-full border rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] ${lastNameError ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {lastNameError && (
                    <p className="text-red-500 text-xs mt-1 ml-4">
                      Last name is required
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Enter your email address"
                    className={`w-full border rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] ${emailError ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1 ml-4">
                      {email.trim() === ""
                        ? "Email is required"
                        : "Please enter a valid email"}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div ref={phoneRef}>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="NG"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value || "")}
                    className={`phone-input-wrapper flex items-center border overflow-hidden rounded-full h-[50px] px-4 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary ${phoneError ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    numberInputProps={{
                      className:
                        "flex-1 h-full pl-3 outline-none text-[14px] bg-transparent",
                    }}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs mt-1 ml-4">
                      {!phoneNumber || phoneNumber.trim() === ""
                        ? "Phone number is required"
                        : "Please enter a valid phone number"}
                    </p>
                  )}
                </div>

                {/* Job Duration */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Job Duration
                  </label>
                  <Select value={jobDuration} onValueChange={setJobDuration}>
                    <SelectTrigger
                      ref={jobDurationRef}
                      className={`w-full h-[50px] rounded-full border px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary ${jobDurationError ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    >
                      <SelectValue placeholder="Select job duration" />
                    </SelectTrigger>
                    <SelectContent className="z-[10000]">
                      {jobDurations.map((duration) => (
                        <SelectItem
                          key={duration.value}
                          value={duration.value}
                          className="text-[14px]"
                        >
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {jobDurationError && (
                    <p className="text-red-500 text-xs mt-1 ml-4">
                      Please select a job duration
                    </p>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Long-term: Job Duration Display */}
                {/* {isLongTerm && (
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Job Duration
                  </label>
                  <div className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] flex items-center bg-gray-50 text-gray-600">
                    Long-Term: For rentals over 3 weeks or bulk...
                  </div>
                </div>
              )} */}

                {/* State */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    State
                  </label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger
                      ref={stateRef}
                      className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="z-[10000]">
                      {nigerianStates.map((s) => (
                        <SelectItem key={s} value={s} className="text-[14px]">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Long-term: Date Range */}
                {isLongTerm && (
                  <div>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Date
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      <div className="flex-1">
                        <p className="text-[12px] ml-1 font-[500]">
                          Start Date
                        </p>
                        <input
                          ref={startDateRef}
                          type="date"
                          placeholder="Start date"
                          className="w-full border border-gray-200 rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[12px] ml-1 font-[500]">End Date</p>
                        <input
                          ref={endDateRef}
                          type="date"
                          placeholder="End date"
                          className="w-full border border-gray-200 rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={
                            startDate || new Date().toISOString().split("T")[0]
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Long-term: Vehicle with Add button */}
                {isLongTerm && (
                  <div>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Vehicle
                    </label>
                    <div className="flex gap-2">
                      <Select
                        value={selectedVehicleType}
                        onValueChange={setSelectedVehicleType}
                      >
                        <SelectTrigger
                          ref={vehicleSelectRef}
                          className="flex-1 h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000]">
                          {vehicleTypes?.map((type) => (
                            <SelectItem
                              key={type.id}
                              value={type?.name}
                              className="text-[14px]"
                            >
                              {type?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        className="w-[80px] border border-gray-200 rounded-full h-[50px] px-4 text-center outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                        value={vehicleQuantity}
                        onChange={(e) => setVehicleQuantity(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedVehicleType && vehicleQuantity) {
                            const existingIndex = vehicles.findIndex(
                              (v) => v.type === selectedVehicleType,
                            );
                            if (existingIndex >= 0) {
                              const updated = [...vehicles];
                              updated[existingIndex].quantity = vehicleQuantity;
                              setVehicles(updated);
                            } else {
                              setVehicles([
                                ...vehicles,
                                {
                                  type: selectedVehicleType,
                                  quantity: vehicleQuantity,
                                },
                              ]);
                            }
                            setSelectedVehicleType("");
                            setVehicleQuantity("1");
                          }
                        }}
                        className="h-[50px] px-4 rounded-full bg-primary text-white text-[14px] font-[600] flex items-center gap-1 hover:bg-primary/90 transition-colors"
                      >
                        Add <span className="text-[18px]">+</span>
                      </button>
                    </div>
                    {/* Display added vehicles */}
                    {vehicles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {vehicles.map((v, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-[#CBEEFF] rounded-lg px-4 py-3"
                          >
                            <span className="text-[14px]">
                              {v.type}{" "}
                              <span className="font-semibold">
                                × {v.quantity}
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setVehicles(
                                  vehicles.filter((_, i) => i !== index),
                                )
                              }
                              className="text-gray-500 text-[14px] font-[600] hover:text-red-600"
                            >
                              <XIcon strokeWidth={2} className="w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Short-term: Vehicle Type */}
                {isShortTerm && (
                  <div>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Vehicle Type
                    </label>
                    <Select value={vehicleType} onValueChange={setVehicleType}>
                      <SelectTrigger
                        ref={vehicleTypeRef}
                        className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent className="z-[10000]">
                        {vehicleTypes?.map((type) => (
                          <SelectItem
                            key={type?.id}
                            value={type?.name}
                            className="text-[14px]"
                          >
                            {type?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Short-term: Job Type */}
                {isShortTerm && (
                  <div>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Job Type
                    </label>
                    <Select value={jobType} onValueChange={handleJobTypeChange}>
                      <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent className="z-[10000]">
                        {jobTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-[14px]"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Short-term: Pick-up Time */}
                {isShortTerm && (
                  <TimePickerInput
                    value={pickupTime}
                    onChange={setPickupTime}
                    label="Pick-up Time"
                    containerRef={pickupTimeRef}
                  />
                )}

                {/* Short-term: Closing Time */}
                {isShortTerm && (
                  <TimePickerInput
                    value={closingTime}
                    onChange={setClosingTime}
                    label="Closing Time"
                    containerRef={closingTimeRef}
                  />
                )}

                {/* Short-term: Time of Flight (for airport trips) */}
                {isShortTerm && isAirportRelated && (
                  <TimePickerInput
                    value={timeOfFlight}
                    onChange={setTimeOfFlight}
                    label="Time of Flight"
                  />
                )}

                {/* Short-term: Airport Name (for airport trips) */}
                {isShortTerm && isAirportRelated && (
                  <div>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Airport Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MM2"
                      className="w-full border border-gray-200 rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                      value={airportName}
                      onChange={(e) => setAirportName(e.target.value)}
                    />
                  </div>
                )}

                {/* Short-term: Trip Dates */}
                {isShortTerm && (
                  <div ref={tripDatesRef}>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Trip Date{!isAirportRelated && "(s)"}
                    </label>
                    {isAirportRelated ? (
                      <p className="text-xs text-gray-500 mb-2">
                        Only one date allowed for airport trips
                      </p>
                    ) : null}
                    <div className="w-full overflow-x-auto border border-gray-200 rounded-[36px] p-3">
                      <div className="w-full min-w-[300px]">
                        {isAirportRelated ? (
                          <DayPicker
                            mode="single"
                            selected={tripDates[0]}
                            onSelect={handleDateSelect}
                            disabled={{ before: new Date() }}
                            className=""
                          />
                        ) : (
                          <DayPicker
                            mode="multiple"
                            selected={tripDates}
                            onSelect={handleDateSelect}
                            disabled={{ before: new Date() }}
                            className=""
                          />
                        )}
                      </div>
                    </div>

                    {tripDates.length > 0 && (
                      <div className="border-t pt-3 mt-3">
                        <p className="text-xs text-gray-500 mb-2">
                          Selected dates:
                        </p>
                        <div className="flex w-full max-w-[320px] flex-wrap gap-1">
                          {tripDates.map((date, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                            >
                              {format(date, "MMM d, yyyy")}
                              <button
                                type="button"
                                onClick={() => removeDate(date)}
                                className="hover:bg-primary/20 rounded-full p-0.5"
                              >
                                <XIcon className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Short-term: Pick-up Location */}
                {isShortTerm && (
                  <div ref={pickupLocationRef}>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Pick-up Location
                    </label>
                    <GooglePlacesAutocomplete
                      value={pickupLocation}
                      onChange={(address, placeDetails) => {
                        setPickupLocation(address);
                        if (placeDetails) {
                          setPickupLocationData(
                            extractLocationData(address, placeDetails),
                          );
                        }
                      }}
                      placeholder="Search for pick-up location"
                    />
                  </div>
                )}

                {/* Short-term: Drop-off Location */}
                {isShortTerm && (
                  <div ref={dropoffLocationRef}>
                    <label className="block text-[14px] font-[600] text-primary mb-2">
                      Drop-off Location
                    </label>
                    <GooglePlacesAutocomplete
                      value={dropoffLocation}
                      onChange={(address, placeDetails) => {
                        setDropoffLocation(address);
                        if (placeDetails) {
                          setDropoffLocationData(
                            extractLocationData(address, placeDetails),
                          );
                        }
                      }}
                      placeholder="Search for drop-off location"
                    />
                  </div>
                )}

                {/* Itinerary (both) */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Itinerary
                  </label>
                  <textarea
                    placeholder="Describe your trip itinerary..."
                    className="w-full border border-gray-200 rounded-2xl min-h-[100px] p-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] resize-none"
                    value={itinerary}
                    onChange={(e) => setItinerary(e.target.value)}
                  />
                </div>

                {/* Note (both) */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Note (Optional)
                  </label>
                  <textarea
                    placeholder="Any additional requirements or preferences..."
                    className="w-full border border-gray-200 rounded-2xl min-h-[100px] p-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] resize-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex px-5 pb-5 gap-3">
            {step === 2 && (
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex-1 h-[50px] rounded-full border border-gray-200 text-[14px] font-[600] text-primary hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`flex-1 h-[50px] rounded-full flex items-center justify-center gap-2 text-[14px] font-[600] transition-colors ${
                isSubmitting
                  ? "bg-[#F5F5F5] text-[#9CA3AF] cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : step === 2 ? (
                <>
                  Submit <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessModalCard
        isOpen={showSuccessModal}
        title="Job Listed successfully"
        info={
          <>
            Job listed successfully! Hosts have been notified, and you’ll get an
            email when bids come in. Need faster help? Contact our support on
            WhatsApp.
            <br />{" "}
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-2 relative pl-[20px] items-center gap-[3px] text-[#25D366] font-[600] hover:underline"
            >
              <Icon
                icon="ic:baseline-whatsapp"
                className="text-[20px] left-0 top-[50%] translate-y-[-50%] absolute"
              />
              WhatsApp
            </a>{" "}
            .
          </>
        }
        primaryBtnLabel="Dismiss"
        onClose={() => {
          setShowSuccessModal(false);
          handleClose();
        }}
      />
    </>
  );
};

export default JobListingModal;
