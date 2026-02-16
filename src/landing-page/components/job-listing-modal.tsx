"use client";

import React, { useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowRight,
  ChevronLeft,
  Clock,
  XIcon,
  CalendarIcon,
} from "lucide-react";
import { useMutation } from "react-query";
import {
  jobListing,
  ShortTermListingPayload,
  LongTermListingPayload,
} from "@/apis/job-listing";
import GooglePlacesAutocomplete from "@/components/custom/google-places-autocomplete";
import { toast } from "@/hooks/use-toast";
import { useJobListingStore } from "@/store/job-listing-store";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";

interface JobListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  //   "Van",
  "Bus",
  "Minivan",
  "Luxury",
  //   "Sports Car",
  //   "Convertible",
  "Pickup",
];

const jobTypes = ["Full Day", "Airport Pickup", "Airport Drop-off"];

// Native Time Picker Component
const TimePickerInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}> = ({ value, onChange, label }) => {
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
    <div>
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

  // Validation helpers
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Nigerian phone: at least 10 digits
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
  };

  // Step 2 fields (Short-term)
  const [state, setState] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [jobType, setJobType] = useState("Full Day");
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
  const handleDateSelect = (dates: Date[] | undefined) => {
    setTripDates(dates || []);
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
        toast({
          title: "Success!",
          description: "Your job listing has been submitted successfully.",
        });
        handleClose();
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
        toast({
          title: "Success!",
          description:
            "Your long-term listing has been submitted successfully.",
        });
        handleClose();
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
    placeDetails?: google.maps.places.PlaceResult,
  ): LocationData => {
    const lat = placeDetails?.geometry?.location?.lat() || 0;
    const lng = placeDetails?.geometry?.location?.lng() || 0;

    // Extract state from address components
    let extractedState = state || "";
    if (placeDetails?.address_components) {
      const stateComponent = placeDetails.address_components.find((c) =>
        c.types.includes("administrative_area_level_1"),
      );
      if (stateComponent) {
        extractedState = stateComponent.long_name;
      }
    }

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
          phoneNumber: phoneNumber.startsWith("+234")
            ? phoneNumber
            : `+234${phoneNumber}`,
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
          phoneNumber: phoneNumber.startsWith("+234")
            ? phoneNumber
            : `+234${phoneNumber}`,
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
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setShowValidation(true);
      if (isStep1Valid) {
        setShowValidation(false);
        setStep(2);
      }
    } else if (step === 2 && isStep2Valid) {
      handleSubmit();
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
      target.classList.contains("pac-item")
    ) {
      e.preventDefault();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-[500px] w-[95%] max-h-[95vh] overflow-y-auto rounded-2xl z-[101]"
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

        <DialogHeader className="mt-10">
          <DialogTitle className="text-[28px] font-[700] text-primary">
            Job Listing - Step {step}/2
          </DialogTitle>
          <p className="text-[14px] text-[#646464] mt-1">
            Please fill in the form below to post a listing. Interested car
            hosts will submit a bid.
          </p>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {step === 1 && (
            <>
              {/* First Name */}
              <div>
                <label className="block text-[14px] font-[600] text-primary mb-2">
                  First name
                </label>
                <input
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
              <div>
                <label className="block text-[14px] font-[600] text-primary mb-2">
                  Phone Number
                </label>
                <div
                  className={`flex items-center border overflow-hidden rounded-full h-[50px] px-4 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary ${phoneError ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
                    <span className="text-[18px]">🇳🇬</span>
                    <span className="text-[14px] text-[#9c9c9c]">+234</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="80-11x-xxxxx"
                    className="flex-1 h-full pl-3 outline-none text-[14px] bg-transparent"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1 ml-4">
                    {phoneNumber.trim() === ""
                      ? "Phone number is required"
                      : "Please enter a valid phone number (min 10 digits)"}
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
                  <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
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
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-[12px] ml-1 font-[500]">Start Date</p>
                      <input
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
                      <SelectTrigger className="flex-1 h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent className="z-[10000]">
                        {vehicleTypes.map((type) => (
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
                    <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent className="z-[10000]">
                      {vehicleTypes.map((type) => (
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

              {/* Short-term: Job Type */}
              {isShortTerm && (
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Job Type
                  </label>
                  <Select value={jobType} onValueChange={setJobType}>
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
                />
              )}

              {/* Short-term: Closing Time */}
              {isShortTerm && (
                <TimePickerInput
                  value={closingTime}
                  onChange={setClosingTime}
                  label="Closing Time"
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
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Trip Date(s)
                  </label>
                  <div className="w-full border border-gray-200 rounded-[36px] p-3">
                    <DayPicker
                      mode="multiple"
                      selected={tripDates}
                      onSelect={handleDateSelect}
                      disabled={{ before: new Date() }}
                      className=""
                    />
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
                <div>
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
                <div>
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
        <div className="flex gap-3 mt-6">
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
            disabled={
              (step === 1 ? !isStep1Valid : !isStep2Valid) || isSubmitting
            }
            className={`flex-1 h-[50px] rounded-full flex items-center justify-center gap-2 text-[14px] font-[600] transition-colors ${
              (step === 1 ? isStep1Valid : isStep2Valid) && !isSubmitting
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-[#F5F5F5] text-[#9CA3AF] cursor-not-allowed"
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
  );
};

export default JobListingModal;
