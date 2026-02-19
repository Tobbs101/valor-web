/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "./client";

export interface ShortTermListingPayload {
  fName: string;
  lName: string;
  email: string;
  phoneNumber: string;
  state: string;
  capacity?: number;
  carType: string;
  make?: string;
  model?: string;
  year?: string[];
  color?: string;
  tripType: "full day" | "airport pickup" | "airport dropoff";
  tripDate: string[];
  pickUpTime: string;
  closingTime: string;
  timeOfFlight?: string;
  pickUpLocation: {
    address: string;
    state: string;
    country: string;
    coordinates: {
      longitude: number;
      latitude: number;
      coordinates: [number, number];
    };
  };
  dropOffLocation: {
    address: string;
    state: string;
    country: string;
    coordinates: {
      longitude: number;
      latitude: number;
      coordinates: [number, number];
    };
  };
  itinerary: string;
  note?: string;
  airportName?: string;
}

export interface LongTermListingPayload {
  fName: string;
  lName: string;
  email: string;
  phoneNumber: string;
  state: string;
  itinerary: string;
  note?: string;
  startDate: string;
  endDate: string;
  carType: Array<{
    carType: string;
    quantity: number;
  }>;
}

export const jobListing = {
  createShortTermListing: ({ payload }: { payload: ShortTermListingPayload }) =>
    client
      .post(`bookings/guest/create-listing`, payload)
      .then(({ data }: any) => data),

  createLongTermListing: ({ payload }: { payload: LongTermListingPayload }) =>
    client
      .post(`bookings/guest/create-long-term-leasing`, payload)
      .then(({ data }: any) => data),

  makeEnquiry: ({ payload }: { payload: any }) =>
    client
      .post(`bookings/guest/create-request`, payload)
      .then(({ data }: any) => data),
};
