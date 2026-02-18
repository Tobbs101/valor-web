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
import { ArrowRight, ChevronLeft, X } from "lucide-react";
import { useMutation } from "react-query";
import { Checkbox } from "@/components/ui/checkbox";
import GooglePlacesAutocomplete from "@/components/custom/google-places-autocomplete";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import client from "@/apis/client";
import Image from "next/image";

interface MakeEnquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: string;
  hostId: string;
  carName?: string;
}

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

// Nigerian Airports
const nigerianAirports = [
  "Murtala Muhammed International Airport",
  "Nnamdi Azikiwe International Airport",
  "Port Harcourt International Airport",
  "Mallam Aminu Kano International Airport",
  "Akanu Ibiam International Airport",
  "Margaret Ekpo International Airport",
  "Sam Mbakwe International Airport",
  "Ilorin International Airport",
  "Ibadan Airport",
  "Benin Airport",
  "Kaduna Airport",
  "Jos Airport",
  "Maiduguri International Airport",
  "Sokoto Airport",
  "Yola Airport",
];

// Time slots
const timeSlots = [
  "6:00am",
  "6:30am",
  "7:00am",
  "7:30am",
  "8:00am",
  "8:30am",
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
  "5:00pm",
  "5:30pm",
  "6:00pm",
  "6:30pm",
  "7:00pm",
  "7:30pm",
  "8:00pm",
  "8:30pm",
  "9:00pm",
  "9:30pm",
  "10:00pm",
  "10:30pm",
  "11:00pm",
  "11:30pm",
];

const jobTypes = ["Full Day", "Airport Pickup", "Airport Drop"];

// Success Modal Content Component
const EnquirySuccessContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl md:w-[600px] w-[95%] p-8 md:p-12 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-[#9CA3AF]" />
        </button>

        {/* Icon */}
        <div className="w-[100px] h-[100px] rounded-full bg-primary flex items-center justify-center mb-6">
          <div className="w-[60px] h-[30px] bg-primary rounded-full" />
        </div>

        <h2 className="text-[28px] md:text-[36px] font-[700] text-center text-primary mb-4">
          Enquiry sent successfully
        </h2>

        <p className="text-[14px] md:text-[16px] text-center text-[#646464] mb-8 max-w-[400px]">
          We&apos;ve notified the host, their estimate will be sent shortly.
          Download the app to get instant feedback and better experience
        </p>

        {/* App Store Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://apps.apple.com/app/valor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white rounded-lg px-4 py-2.5"
          >
            <Image
              src="/images/apple-logo.png"
              alt="Apple"
              width={20}
              height={24}
              className="object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/80">Download on the</span>
              <span className="text-[14px] font-[600]">App Store</span>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.valor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white rounded-lg px-4 py-2.5"
          >
            <Image
              src="/images/google-play-logo.png"
              alt="Google Play"
              width={20}
              height={24}
              className="object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/80">GET IT ON</span>
              <span className="text-[14px] font-[600]">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

const MakeEnquiriesModal: React.FC<MakeEnquiriesModalProps> = ({
  isOpen,
  onClose,
  carId,
  hostId,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Step 2 fields
  const [jobType, setJobType] = useState("Full Day");
  const [date, setDate] = useState("");
  const [pickupTime, setPickupTime] = useState("6:00am");
  const [closingTime, setClosingTime] = useState("6:00am");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupLocationData, setPickupLocationData] =
    useState<LocationData | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dropoffLocationData, setDropoffLocationData] =
    useState<LocationData | null>(null);
  const [itinerary, setItinerary] = useState("");
  const [airportName, setAirportName] = useState(nigerianAirports[0]);
  const [timeOfFlight, setTimeOfFlight] = useState("");
  const [advertiseToHosts, setAdvertiseToHosts] = useState(true);

  // Refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Validation helpers
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    if (!phone) return false;
    return isValidPhoneNumber(phone);
  };

  // Step 1 validation
  const isStep1Valid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    isValidEmail(email) &&
    phoneNumber.trim() !== "" &&
    isValidPhone(phoneNumber);

  // Individual field validation for UI feedback
  const firstNameError = showValidation && firstName.trim() === "";
  const lastNameError = showValidation && lastName.trim() === "";
  const emailError =
    showValidation && (email.trim() === "" || !isValidEmail(email));
  const phoneError =
    showValidation && (phoneNumber.trim() === "" || !isValidPhone(phoneNumber));

  // Step 2 validation based on job type
  const isStep2Valid = (): boolean => {
    if (date === "") return false;

    if (jobType === "Full Day") {
      return (
        pickupTime !== "" &&
        closingTime !== "" &&
        pickupLocation !== "" &&
        itinerary !== ""
      );
    }

    if (jobType === "Airport Pickup") {
      return (
        airportName !== "" &&
        timeOfFlight !== "" &&
        pickupTime !== "" &&
        dropoffLocation !== ""
      );
    }

    if (jobType === "Airport Drop") {
      return pickupLocation !== "" && pickupTime !== "" && airportName !== "";
    }

    return false;
  };

  // Extract location data from Google Places
  const extractLocationData = (
    address: string,
    placeDetails?: {
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

    return {
      address,
      state: "",
      country: "nigeria",
      coordinates: {
        longitude: lng,
        latitude: lat,
        coordinates: [lng, lat],
      },
    };
  };

  // Reset form
  const resetForm = () => {
    setStep(1);
    setShowValidation(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setJobType("Full Day");
    setDate("");
    setPickupTime("6:00am");
    setClosingTime("6:00am");
    setPickupLocation("");
    setPickupLocationData(null);
    setDropoffLocation("");
    setDropoffLocationData(null);
    setItinerary("");
    setAirportName(nigerianAirports[0]);
    setTimeOfFlight("");
    setAdvertiseToHosts(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // API mutation
  const enquiryMutation = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (payload: any) =>
      client
        .post(`bookings/guest/create-enquiry`, payload)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(({ data }: any) => data),
    {
      onSuccess: () => {
        handleClose();
        setShowSuccessModal(true);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toast({
          title: "Error",
          description:
            error?.response?.data?.message ||
            "Failed to submit enquiry. Please try again.",
          variant: "destructive",
        });
      },
    },
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const tripTypeMap: Record<
        string,
        "full day" | "airport pickup" | "airport dropoff"
      > = {
        "Full Day": "full day",
        "Airport Pickup": "airport pickup",
        "Airport Drop": "airport dropoff",
      };

      const payload = {
        fName: firstName,
        lName: lastName,
        email,
        phoneNumber,
        carId,
        hostId,
        tripType: tripTypeMap[jobType],
        tripDate: date,
        pickUpTime: pickupTime,
        closingTime: jobType === "Full Day" ? closingTime : undefined,
        pickUpLocation: pickupLocationData || {
          address: pickupLocation,
          state: "",
          country: "nigeria",
          coordinates: { longitude: 0, latitude: 0, coordinates: [0, 0] },
        },
        dropOffLocation: dropoffLocationData || {
          address: dropoffLocation,
          state: "",
          country: "nigeria",
          coordinates: { longitude: 0, latitude: 0, coordinates: [0, 0] },
        },
        itinerary: jobType === "Full Day" ? itinerary : undefined,
        airportName:
          jobType === "Airport Pickup" || jobType === "Airport Drop"
            ? airportName
            : undefined,
        timeOfFlight: jobType === "Airport Pickup" ? timeOfFlight : undefined,
        advertiseToAllHosts: advertiseToHosts,
      };

      await enquiryMutation.mutateAsync(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setShowValidation(true);

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

      if (isStep1Valid) {
        setShowValidation(false);
        setStep(2);
      }
    } else if (step === 2) {
      setShowValidation(true);

      if (isStep2Valid()) {
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
          className="max-w-[525px] p-0 w-[95%] max-h-[95svh] overflow-y-auto rounded-2xl z-[101]"
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
              Make Enquiries - Step {step}/2
            </DialogTitle>
            <p className="text-[14px] text-[#646464] mt-1">
              Please fill in the form below to make an enquiry
            </p>
          </DialogHeader>

          <div className="space-y-5 border-t border-gray-200 p-5 max-h-[calc(95svh-280px)] overflow-y-auto mt-4">
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
              </>
            )}

            {step === 2 && (
              <>
                {/* Job Type */}
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
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={format(new Date(), "yyyy-MM-dd")}
                    className={`w-full border rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] ${showValidation && date === "" ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                </div>

                {/* Full Day Fields */}
                {jobType === "Full Day" && (
                  <>
                    {/* Pick-up Time */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Pick-up Time
                      </label>
                      <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select pick-up time" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000] max-h-[200px]">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Closing Time */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Closing Time
                      </label>
                      <Select
                        value={closingTime}
                        onValueChange={setClosingTime}
                      >
                        <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select closing time" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000] max-h-[200px]">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pick-up Location */}
                    <div className="">
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Pick-up Location
                      </label>
                      <GooglePlacesAutocomplete
                        value={pickupLocation}
                        onChange={(value, placeDetails) => {
                          setPickupLocation(value);
                          if (placeDetails) {
                            setPickupLocationData(
                              extractLocationData(value, placeDetails),
                            );
                          }
                        }}
                        placeholder="Select your pick-up location"
                        className={`w-full rounded-full h-[50px] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] ${showValidation && pickupLocation === "" ? "border border-red-400 bg-red-50" : ""}`}
                      />
                    </div>

                    {/* Itinerary */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Itinerary
                      </label>
                      <textarea
                        value={itinerary}
                        onChange={(e) => setItinerary(e.target.value)}
                        placeholder="Kindly input your description here"
                        className={`w-full border rounded-2xl min-h-[100px] p-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] resize-none ${showValidation && itinerary === "" ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                    </div>
                  </>
                )}

                {/* Airport Pickup Fields */}
                {jobType === "Airport Pickup" && (
                  <>
                    {/* Airport Name */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Airport Name
                      </label>
                      <Select
                        value={airportName}
                        onValueChange={setAirportName}
                      >
                        <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select airport" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000] max-h-[200px]">
                          {nigerianAirports.map((airport) => (
                            <SelectItem key={airport} value={airport}>
                              {airport}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Time of Flight */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Time of Flight
                      </label>
                      <Select
                        value={timeOfFlight}
                        onValueChange={setTimeOfFlight}
                      >
                        <SelectTrigger
                          className={`w-full h-[50px] rounded-full border px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary ${showValidation && timeOfFlight === "" ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                        >
                          <SelectValue placeholder="Select time of your flight" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000] max-h-[200px]">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pick-up Time */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Pick-up Time
                      </label>
                      <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select your pick-up location" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000] max-h-[200px]">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Drop-off Location */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Drop-off Location
                      </label>
                      <GooglePlacesAutocomplete
                        value={dropoffLocation}
                        onChange={(value, placeDetails) => {
                          setDropoffLocation(value);
                          if (placeDetails) {
                            setDropoffLocationData(
                              extractLocationData(value, placeDetails),
                            );
                          }
                        }}
                        placeholder="Select your drop-off location"
                        className={`w-full border rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] ${showValidation && dropoffLocation === "" ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                    </div>
                  </>
                )}

                {/* Airport Drop Fields */}
                {jobType === "Airport Drop" && (
                  <>
                    {/* Pick-up Location */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Pick-up Location
                      </label>
                      <GooglePlacesAutocomplete
                        value={pickupLocation}
                        onChange={(value, placeDetails) => {
                          setPickupLocation(value);
                          if (placeDetails) {
                            setPickupLocationData(
                              extractLocationData(value, placeDetails),
                            );
                          }
                        }}
                        placeholder="Select your drop-off location"
                        className={`w-full border rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] ${showValidation && pickupLocation === "" ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                    </div>

                    {/* Pick-up Time */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Pick-up Time
                      </label>
                      <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select your pick-up location" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000] max-h-[200px]">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Airport Name */}
                    <div>
                      <label className="block text-[14px] font-[600] text-primary mb-2">
                        Airport Name
                      </label>
                      <Select
                        value={airportName}
                        onValueChange={setAirportName}
                      >
                        <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                          <SelectValue placeholder="Select airport" />
                        </SelectTrigger>
                        <SelectContent className="z-[10000] max-h-[200px]">
                          {nigerianAirports.map((airport) => (
                            <SelectItem key={airport} value={airport}>
                              {airport}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Advertise to all Hosts */}
                <div className="bg-[#E7F2FF] border border-[#ABC5E7] rounded-xl p-4">
                  <h3 className="text-[14px] md:text-[16px] font-[600] text-primary mb-1">
                    Advertise to all Hosts
                  </h3>
                  <p className="text-[12px] md:text-[14px] text-[#646464] mb-3">
                    Get more quotations by advertising your job to all hosts in
                    the VALOR network
                  </p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={advertiseToHosts}
                        onCheckedChange={() => setAdvertiseToHosts(true)}
                        className="w-5 h-5 rounded shadow-none bg-white border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="text-[14px] text-primary">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={!advertiseToHosts}
                        onCheckedChange={() => setAdvertiseToHosts(false)}
                        className="w-5 h-5 rounded shadow-none bg-white border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="text-[14px] text-primary">No</span>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="p-5 border-t border-gray-200">
            {step === 1 ? (
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="w-full flex h-[55px] items-center justify-center gap-2 bg-gradient-to-l from-[#023047] to-[#034a6b] text-white rounded-full transition-colors hover:opacity-90 disabled:opacity-50"
              >
                <span className="text-[14px] font-[500]">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 h-[55px] border border-gray-300 rounded-full text-[14px] font-[500] text-primary hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex-1 flex h-[55px] items-center justify-center gap-2 bg-gradient-to-l from-[#023047] to-[#034a6b] text-white rounded-full transition-colors hover:opacity-90 disabled:opacity-50"
                >
                  <span className="text-[14px] font-[500]">
                    {isSubmitting ? "Submitting..." : "Next"}
                  </span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      {showSuccessModal && (
        <EnquirySuccessContent onClose={() => setShowSuccessModal(false)} />
      )}
    </>
  );
};

export default MakeEnquiriesModal;
