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
import { ArrowRight, ChevronLeft, XIcon } from "lucide-react";

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

const jobTypes = ["Full Day", "Half Day", "Hourly"];

const timeSlots = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
];

const pickupLocations = [
  "Lagos - Ikeja",
  "Lagos - Victoria Island",
  "Lagos - Lekki",
  "Lagos - Surulere",
  "Lagos - Yaba",
  "Abuja - Wuse",
  "Abuja - Garki",
  "Abuja - Maitama",
  "Abuja - Central Area",
  "Port Harcourt - GRA",
  "Port Harcourt - Trans Amadi",
];

const jobDurations = [
  { value: "short-term", label: "Short-Term: For rentals less than 3 weeks" },
  { value: "long-term", label: "Long-Term: For rentals 3 weeks or more" },
];

const JobListingModal: React.FC<JobListingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobDuration, setJobDuration] = useState("");

  // Step 2 fields (Short-term)
  const [state, setState] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [jobType, setJobType] = useState("Full Day");
  const [pickupTime, setPickupTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [itinerary, setItinerary] = useState("");

  // Step 2 fields (Long-term)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vehicles, setVehicles] = useState<
    { type: string; quantity: string }[]
  >([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [note, setNote] = useState("");

  const isShortTerm = jobDuration === "short-term";
  const isLongTerm = jobDuration === "long-term";

  const isStep1Valid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    jobDuration !== "";

  const isStep2ValidShortTerm =
    state !== "" &&
    vehicleType !== "" &&
    jobType !== "" &&
    pickupTime !== "" &&
    closingTime !== "" &&
    pickupLocation !== "";

  const isStep2ValidLongTerm =
    state !== "" && startDate !== "" && endDate !== "" && vehicles.length > 0;

  const isStep2Valid = isShortTerm
    ? isStep2ValidShortTerm
    : isStep2ValidLongTerm;

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      // Submit form
      console.log("Submitting job listing:", {
        firstName,
        lastName,
        email,
        phoneNumber,
        jobDuration,
        state,
        vehicleType,
        jobType,
        pickupTime,
        closingTime,
        pickupLocation,
        itinerary,
      });
      handleClose();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl z-[101]">
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
                  className="w-full border border-gray-200 rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-[14px] font-[600] text-primary mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  className="w-full border border-gray-200 rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[14px] font-[600] text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-200 rounded-full h-[50px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[14px] font-[600] text-primary mb-2">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-200 overflow-hidden rounded-full h-[50px] px-4 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                  <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
                    <span className="text-[18px]">🇳🇬</span>
                    <span className="text-[14px] text-[#9c9c9c]">+234</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="80-11x-xxxxx"
                    className="flex-1 h-full pl-3 outline-none text-[14px]"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Job Duration */}
              <div>
                <label className="block text-[14px] font-[600] text-primary mb-2">
                  Job Duration
                </label>
                <Select value={jobDuration} onValueChange={setJobDuration}>
                  <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
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
                    <Select value={startDate} onValueChange={setStartDate}>
                      <SelectTrigger className="flex-1 h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Start date" />
                      </SelectTrigger>
                      <SelectContent className="z-[10000]">
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="next-week">Next Week</SelectItem>
                        <SelectItem value="next-month">Next Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={endDate} onValueChange={setEndDate}>
                      <SelectTrigger className="flex-1 h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="End date" />
                      </SelectTrigger>
                      <SelectContent className="z-[10000]">
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="3-weeks">3 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="2-months">2 Months</SelectItem>
                        <SelectItem value="3-months">3 Months</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectValue placeholder="Select vehicle type/quantity" />
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
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          selectedVehicleType &&
                          !vehicles.some((v) => v.type === selectedVehicleType)
                        ) {
                          setVehicles([
                            ...vehicles,
                            { type: selectedVehicleType, quantity: "1" },
                          ]);
                          setSelectedVehicleType("");
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
                          <span className="text-[14px]">{v.type}</span>
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
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Pick-up Time
                  </label>
                  <Select value={pickupTime} onValueChange={setPickupTime}>
                    <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select time for your pick-up" />
                    </SelectTrigger>
                    <SelectContent className="z-[10000]">
                      {timeSlots.map((time) => (
                        <SelectItem
                          key={time}
                          value={time}
                          className="text-[14px]"
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Short-term: Closing Time */}
              {isShortTerm && (
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Closing Time
                  </label>
                  <Select value={closingTime} onValueChange={setClosingTime}>
                    <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select closing time" />
                    </SelectTrigger>
                    <SelectContent className="z-[10000]">
                      {timeSlots.map((time) => (
                        <SelectItem
                          key={time}
                          value={time}
                          className="text-[14px]"
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Short-term: Pick-up Location */}
              {isShortTerm && (
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Pick-up Location *
                  </label>
                  <Select
                    value={pickupLocation}
                    onValueChange={setPickupLocation}
                  >
                    <SelectTrigger className="w-full h-[50px] rounded-full border border-gray-200 px-5 text-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select your pick-up location" />
                    </SelectTrigger>
                    <SelectContent className="z-[10000]">
                      {pickupLocations.map((location) => (
                        <SelectItem
                          key={location}
                          value={location}
                          className="text-[14px]"
                        >
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Itinerary (both) */}
              <div>
                <label className="block text-[14px] font-[600] text-primary mb-2">
                  Itinerary
                </label>
                <textarea
                  placeholder="From the airport, take me to the nearest hotel"
                  className="w-full border border-gray-200 rounded-2xl min-h-[100px] p-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] resize-none"
                  value={itinerary}
                  onChange={(e) => setItinerary(e.target.value)}
                />
              </div>

              {/* Long-term: Note */}
              {isLongTerm && (
                <div>
                  <label className="block text-[14px] font-[600] text-primary mb-2">
                    Note
                  </label>
                  <textarea
                    placeholder="From the airport, take me to the nearest hotel"
                    className="w-full border border-gray-200 rounded-2xl min-h-[100px] p-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px] resize-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          {step === 2 && (
            <button
              onClick={handleBack}
              className="flex-1 h-[50px] rounded-full border border-gray-200 text-[14px] font-[600] text-primary hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
            className={`flex-1 h-[50px] rounded-full flex items-center justify-center gap-2 text-[14px] font-[600] transition-colors ${
              (step === 1 ? isStep1Valid : isStep2Valid)
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-[#F5F5F5] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobListingModal;
