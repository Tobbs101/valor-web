"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

// Layout Context
interface LayoutContextType {
  isHeroVisible: boolean;
  setIsHeroVisible: (visible: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};

function ClientLayout({ children }: { children: ReactNode }) {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutContext.Provider value={{ isHeroVisible, setIsHeroVisible }}>
        <Toaster />
        {children}
      </LayoutContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default ClientLayout;
