"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Each from "../helpers/each";
import { Button } from "../ui/button";
import Link from "next/link";
import logo from "../../assets/valor-logo.png";
import logowhite from "@/assets/vw.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LinkProp } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutContext } from "@/app/client-layout";
import useScrollAtTop from "@/hooks/use-scroll";
import { useSignupStore } from "@/store/signup-store";

const NAVIGATION_LINKS: LinkProp[] = [
  { id: 1, route: "/", label: "Home" },
  {
    id: 2,
    route: "/search",
    label: "Rent a Car",
  },
  {
    id: 3,
    route: "/become-a-host",
    label: "Become a Host",
  },
  {
    id: 4,
    route: "/about-us",
    label: "About Us",
    className: "lg:w-[500px]",
  },

  {
    id: 5,
    route: "/contact-us",
    label: "Contact Us",
    className:
      "w-[230px] p-2 md:grid-cols-1 xl:grid-cols-2 md:w-[230px] lg:w-[230px] xl:w-[500px]",
  },
  {
    id: 6,
    route: "/blog",
    label: "Blog",
    className: "w-[300px] p-2 md:w-[300px] lg:w-[300px]",
  },
];

const HeaderLink = ({
  item,
  className,
  isWhite,
}: {
  item: LinkProp;
  className?: string;
  isWhite?: boolean;
}) => {
  const pathname = usePathname();

  const [isActiveRoute, setIsActiveRoute] = useState(false);

  useEffect(() => {
    if (item?.routes)
      setIsActiveRoute(
        item?.routes.some((current) => current.route === pathname),
      );
  }, [pathname]);

  if (item?.routes)
    return (
      <NavigationMenu className="relative">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn("", { "text-primary": isActiveRoute })}
            >
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className={cn(
                  "grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]",
                  className,
                )}
              >
                {item?.routes.map((link) => (
                  <li
                    key={link.id}
                    title={link.label}
                    className="py-3 px-4 hover:bg-gray-50 duration-200 rounded-md"
                  >
                    <Link
                      onClick={() =>
                        sessionStorage.removeItem("selected_county")
                      }
                      key={link.id}
                      href={link?.route || ""}
                      className="text-sm flex gap-2 items-center justify-start w-full font-medium"
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-md flex items-center justify-center",
                          link?.icon?.iconClass,
                        )}
                      >
                        {link?.icon?.element}
                      </div>{" "}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

  return (
    <Link
      key={item.id}
      href={item?.route || ""}
      className="text-sm font-[400] relative group"
    >
      <motion.span
        className={cn(
          "text-black group-hover:text-primary transition-colors duration-300",
          {
            "text-orange-400 group-hover:text-orange-500 font-medium":
              pathname === item.route && isWhite,
          },
          { "text-primary font-medium": pathname === item.route && !isWhite },

          {
            "text-white group-hover:text-white":
              isWhite && pathname !== item.route,
          },
        )}
      >
        {item.label}
      </motion.span>

      <motion.span
        className={cn(
          "absolute left-0 -bottom-1.5 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300",
          {
            "bg-orange-500  font-medium": pathname === item.route && isWhite,
          },
          // { "text-primary font-medium": pathname === item.route && !isWhite },

          {
            "bg-white": isWhite && pathname !== item.route,
          },

          { "w-full": pathname === item.route },
        )}
      />
    </Link>
  );
};

const Header = ({
  toggleSidebar,
  className,
}: {
  className?: string;
  toggleSidebar?: () => void;
}) => {
  const router = useRouter();

  const onClickLogo = () => {
    router.push("/");
  };

  const { resetStore } = useSignupStore();
  // const { isHeroVisible } = useLayoutContext();

  const pathname = usePathname();
  const isAtTop = useScrollAtTop();

  // const logoToUse = isAtTop && pathname === "/" ? logowhite : logo;
  const logoToUse = logo;

  return (
    <div
      className={cn(
        "px-5 fixed z-[100] w-full bg-white border-b border-gray-100 shadow-sm",
        // {
        //   "bg-transparent border-transparent text-white shadow-none":
        //     isAtTop && pathname === "/",
        // },
        { "bg-white border-transparent": !isAtTop },
        { "bg-white text-primary": pathname !== "/" },
      )}
    >
      <motion.div
        className={cn(
          "flex items-center w-full justify-between max-w-[1440px] py-5 mx-auto",
          className,
        )}
        animate={{
          maxWidth: "1440px",
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        initial={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between w-full lg:w-fit gap-1">
          <Image
            src={logoToUse}
            width={150}
            onClick={onClickLogo}
            alt=""
            className="w-[100px] lg:w-[150px] cursor-pointer"
          />

          {toggleSidebar && (
            <button
              className={cn(
                "lg:hidden block py-0 px-0 text-black dark:bg-white",
                // {
                //   "text-white": isAtTop && pathname === "/",
                // },
              )}
              onClick={toggleSidebar}
            >
              <Icon
                className="w-[30px] h-[30px]"
                icon={"proicons:text-align-justify"}
              />
            </button>
          )}
        </div>
        {/* Nav section */}
        <div className="items-center hidden lg:flex justify-center space-x-10">
          <Each
            of={NAVIGATION_LINKS}
            render={(item: LinkProp) => (
              <HeaderLink
                // isWhite={isAtTop && pathname === "/"}
                key={item.id}
                item={item}
                className={item?.className}
              />
            )}
          />
          <Button
            onClick={() => {
              resetStore();

              if (pathname === "/become-a-host")
                return router.push("/sign-up?accountType=host");

              router.push("/sign-up");
            }}
            className={cn(
              "rounded-[36px] w-[129px] h-[47px] text-[14px] font-[400] p-[14px_40px] bg-primary text-white hover:bg-primary/90 duration-200",
              // {
              //   "border border-white bg-transparent text-white hover:bg-white/5":
              //     isAtTop && pathname === "/",
              // },
            )}
          >
            {pathname === "/become-a-host" ? "Host Sign Up" : "Sign Up"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
