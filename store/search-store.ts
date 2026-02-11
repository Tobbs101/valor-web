import { create } from "zustand";

export interface SearchFilters {
  sortOrder: "ASC" | "DESC";
  sortBy: string;
  page: number;
  limit: number;
  search?: string;
  capacity?: string;
  carType?: string[];
  availableDates?: string[];
  makeYear?: string;
  availableFullDay?: string;
  cost?: string;
  userId?: string;
  state?: string;
  city?: string;
  carTier?: string[];
  isFavorite?: boolean;
  hostId?: string;
}

interface SearchStore {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
  sortOrder: "DESC",
  sortBy: "pricing.fullDay,vehicleRating",
  page: 1,
  limit: 90,
};

export const useSearchStore = create<SearchStore>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
