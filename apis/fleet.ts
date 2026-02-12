/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "http";
import client from "./client";

export const fleet = {
  exploreFleet: () => client.get(`explore`).then(({ data }: any) => data),

  getVehicles: ({ payload }: { payload: any }) =>
    client.post(`explore/vehicles`, payload).then(({ data }: any) => data),

  getVehicleDetails: ({ carId }: { carId: string }) =>
    client.get(`explore/vehicles/${carId}`).then(({ data }: any) => data),

  getVehicleMakes: () =>
    client.get(`getVehicleMakes`).then(({ data }: any) => data),
};
