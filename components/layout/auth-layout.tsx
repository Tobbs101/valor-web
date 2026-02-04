"use client";

import React from "react";
import Logo from "@/assets/valor-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <main className="min-h-[100svh] py-5 flex items-center justify-center relative px-7 md:px-10 w-full">
      <div className="flex items-center absolute left-3 top-0 justify-center md:justify-start">
        <button onClick={() => router.push("/")}>
          <Image src={Logo} alt="Bela Logo" className="w-24 h-24" />
        </button>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
