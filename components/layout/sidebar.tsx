/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION_LINKS } from "@/routes";
import LinkItem from "./link-item";
import Each from "../helpers/each";
import { LinkProp } from "@/types";
import { X } from "lucide-react";
import LogoMinimal from "../../assets/valor-logo.png";
import Image from "next/image";
import { Button } from "../ui/button";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar?: () => void;
}) => {
  const pathname = usePathname();

  const router = useRouter();

  const onClickLogo = () => {
    router.push("/");
  };

  return (
    <>
      <div
        className={cn(
          "absolute top-0 pb-5 lg:static shadow-md z-[1000] items-center justify-between overflow-y-scroll flex flex-col bg-white dark:bg-[#272727] transtion-all duration-300 bottom-0 md:h-full",
          {
            "right-0 w-[70%] fixed sm:w-[350px] opacity-100 visible": isOpen,
            "right-[-100%] md:w-[0] opacity-0 invisible": !isOpen,
          },
        )}
      >
        <div className="py-8 w-full flex items-center flex-col gap-6">
          <div className="w-full px-4 flex items-center justify-between">
            <Image
              onClick={onClickLogo}
              src={LogoMinimal}
              width={80}
              alt=""
              className="w-[80px] lg:hidden cursor-pointer block"
            />
            <button onClick={toggleSidebar}>
              <X strokeWidth={2.5} className="text-black w-5" />
            </button>
          </div>

          <div className="w-full flex items-center gap-2 flex-col">
            <Each
              of={NAVIGATION_LINKS}
              render={(route: LinkProp, index: number) => (
                <LinkItem
                  key={index}
                  route={route}
                  active={pathname === route?.route}
                />
              )}
            />
          </div>

          <div className="w-full px-7">
            <Button className="rounded-[36px] text-[14px] font-[400] p-[20px_40px] bg-primary text-white hover:bg-primary/90 duration-200">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="fixed top-0 left-0 h-full w-full bg-black z-[100] opacity-60"></div>
      ) : null}
    </>
  );
};

export default Sidebar;
