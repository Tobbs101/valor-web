"use client";

import React from "react";
import Image from "next/image";
import logo_black from "@/assets/full_color_logo.png";
import logo_white from "@/assets/vw.png";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
  orientation?: "light" | "dark";
  width?: number;
  height?: number;
}

const Logo = ({
  className,
  orientation,
  width = 250,
  height = 250,
  ...props
}: LogoProps) => {
  const logoType = orientation;

  const router = useRouter();

  return (
    <Image
      {...props}
      src={logoType === "light" ? logo_black : logo_white}
      alt="Logo"
      role="img"
      className={cn("w-[140px]", className)}
      width={width}
      height={height}
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
