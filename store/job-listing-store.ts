import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JobListingStep1Data {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobDuration: string;
}

interface JobListingStore {
  step1Data: JobListingStep1Data;
  setStep1Data: (data: Partial<JobListingStep1Data>) => void;
  resetStore: () => void;
}

const initialStep1Data: JobListingStep1Data = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  jobDuration: "",
};

export const useJobListingStore = create<JobListingStore>()(
  persist(
    (set) => ({
      step1Data: initialStep1Data,
      setStep1Data: (data) =>
        set((state) => ({
          step1Data: { ...state.step1Data, ...data },
        })),
      resetStore: () => set({ step1Data: initialStep1Data }),
    }),
    {
      name: "valor-job-listing-storage",
    },
  ),
);
