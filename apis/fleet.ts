/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "http";
import client from "./client";

export const fleet = {
  exploreFleet: () => client.get(`explore`).then(({ data }: any) => data),

  getVehicles: ({ payload }: { payload: any }) =>
    client
      .post(`explore/vehicles?page=1&limit=500`, payload)
      .then(({ data }: any) => data),

  getVehicleDetails: ({ carId }: { carId: any }) =>
    client.get(`explore/vehicles/${carId}`).then(({ data }: any) => data),

  getVehicleReviews: ({ carId }: { carId: any }) =>
    client
      .get(`explore/vehicles/${carId}/reviews`)
      .then(({ data }: any) => data),

  getVehicleMakes: () =>
    client.get(`getCarMake?page=1&limit=1000`).then(({ data }: any) => data),

  getVehicleModels: ({ make }: { make?: string }) =>
    client
      .get(`getCarModel?page=1&limit=500&make=${make}`)
      .then(({ data }: any) => data),

  getCarTypes: () => client.get(`getCarType`).then(({ data }: any) => data),

  getColor: () => client.get(`getColor`).then(({ data }: any) => data),

  getStates: () => client.get(`getStates`).then(({ data }: any) => data),
};
