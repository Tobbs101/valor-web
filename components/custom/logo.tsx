import React from "react";
import Image from "next/image";
import logo_black from "@/assets/logo_black.svg";
import logo_white from "@/assets/logo_white.svg";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
  orientation?: "light" | "dark";
}

const Logo = ({ className, orientation, ...props }: LogoProps) => {
  const { theme } = useTheme();

  const logoType = orientation || theme;

  return (
    <Image
      {...props}
      src={logoType === "light" ? logo_black : logo_white}
      alt="Logo"
      role="img"
      className={cn("w-[140px]", className)}
      width={250}
      height={250} // Ensure proper rendering
    />
  );
};

export default Logo;
