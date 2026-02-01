/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import PracticePaper1 from "@/assets/practice-papers/practice-paper1.png";
import PracticePaper2 from "@/assets/practice-papers/practice-paper2.png";
import PracticePaper3 from "@/assets/practice-papers/practice-paper3.png";
import PracticePaper4 from "@/assets/practice-papers/practice-paper4.png";
import PracticePaper5 from "@/assets/practice-papers/practice-paper5.png";
import Bundle from "@/assets/practice-papers/bundle.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const modalDefaults = {
  show: false,
  title: "",
  info: "",
  primaryBtnLabel: "",
};

export type ResponseModal = {
  show: boolean;
  title: string | ReactNode;
  info: string | ReactNode;
  primaryBtnLabel: string;
};

export const formatCurrencyNGN = (value: number | string) => {
  const nigerianNaira = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  });

  return nigerianNaira.format(value as number);
};

export const formatCurrencyNGNLabel = (value: number | string) => {
  const parsedValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(parsedValue)) return "";

  if (parsedValue >= 1_000_000_000_000) {
    return `₦${(parsedValue / 1_000_000_000_000).toFixed(1)}T`;
  } else if (parsedValue >= 1_000_000_000) {
    return `₦${(parsedValue / 1_000_000_000).toFixed(1)}B`;
  } else if (parsedValue >= 1_000_000) {
    return `₦${(parsedValue / 1_000_000).toFixed(1)}M`;
  }

  const nigerianNaira = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  });

  return nigerianNaira.format(parsedValue);
};

export function formatDate(isoDate: string): string {
  if (!isoDate) return "-";

  const date = new Date(isoDate);

  // Extract date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Extract time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format to desired output
  return `${day} ${month} ${year} at ${hours}:${minutes}:${seconds}`;
}

export const handleFollowersLabel = (followers: number | string) => {
  switch (followers) {
    case 0:
      return `${followers} followers`;

    case 1:
      return `${followers} follower`;

    default:
      return `${followers} followers`;
  }
};

export function timeAgo(joinedDate: string): string {
  const now = new Date();
  const date = new Date(joinedDate);

  // Calculate the difference in milliseconds
  const diff = now.getTime() - date.getTime();

  // Convert milliseconds to respective units
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Determine the appropriate time frame
  if (years > 0) return `Joined ${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `Joined ${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `Joined ${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `Joined ${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `Joined ${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0)
    return `Joined ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `Joined just now`;
}

export const useDebounce = (fn: any, delay: number) => {
  let timeout: any;

  // return function that takes arg and apply to the function
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const removeAtSymbol = (handle: string) =>
  handle?.replace(/^@/, "") || "";

export function nameToColor(name: string) {
  if (!name) return "";
  // Simple hashing function to generate a unique number based on the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a positive 24-bit integer
  const positiveHash = Math.abs(hash) % 16777215;

  // Convert the integer to a hex color
  const hexColor = "#" + ("00000" + positiveHash.toString(16)).slice(-6);

  return hexColor;
}

export function formatToPounds(
  amount: number | string,
  minDigits?: number,
  maxDigits?: number
): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount).toFixed(2) : amount;

  if (isNaN(Number(numericAmount))) {
    return "Invalid Amount";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: maxDigits || 0,
    minimumFractionDigits: minDigits || 0,
  }).format(Number(numericAmount));
}

export const papers = [
  {
    name: "GL Practice Paper 1",
    price: 9.99,
    image: PracticePaper1,
    link: "https://courses.limitbreakers.co.uk/enroll/3202888?price_id=4089",
  },
  {
    name: "GL Practice Paper 2",
    price: 9.99,
    image: PracticePaper2,
    link: "https://courses.limitbreakers.co.uk/enroll/3211457?price_id=4099961",
  },
  {
    name: "GL Practice Paper 3",
    price: 9.99,
    image: PracticePaper3,
    link: "https://courses.limitbreakers.co.uk/enroll/3218027?price_id=4107313",
  },
  {
    name: "GL Practice Paper 4",
    price: 9.99,
    image: PracticePaper4,
    link: "https://courses.limitbreakers.co.uk/enroll/3252792?price_id=4146675",
  },
  // { name: "GL Practice Paper 5", price: 9.99, image: PracticePaper5 },
  {
    name: "GL Practice Paper 1-4 Bundle",
    price: 34.99,
    image: Bundle,
    link: "https://courses.limitbreakers.co.uk/enroll/3243764?price_id=4136442",
  },
];
