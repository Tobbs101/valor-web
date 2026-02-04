import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  referralCode: string;
  // Host-specific fields
  companyName: string;
  companyAddress: string;
  hostAccountType: "individual" | "company" | "";
  termsAccepted: boolean;
}

interface SignupStore {
  step: number;
  signupData: SignupData;
  setStep: (step: number) => void;
  setSignupData: (data: Partial<SignupData>) => void;
  resetStore: () => void;
}

const initialData: SignupData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  referralCode: "",
  // Host-specific fields
  companyName: "",
  companyAddress: "",
  hostAccountType: "",
  termsAccepted: false,
};

export const useSignupStore = create<SignupStore>()(
  persist(
    (set) => ({
      step: 1,
      signupData: initialData,
      setStep: (step) => set({ step }),
      setSignupData: (data) =>
        set((state) => ({
          signupData: { ...state.signupData, ...data },
        })),
      resetStore: () => set({ step: 1, signupData: initialData }),
    }),
    {
      name: "valor-signup-storage",
    },
  ),
);
