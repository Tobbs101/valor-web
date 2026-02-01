import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "./container";
import Each from "../helpers/each";
import { Button } from "../ui/button";
import Link from "next/link";
import logo from "../../assets/valor-logo.png";
import LogoMinimal from "../../assets/valor-logo.png";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LinkProp } from "@/types";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

const NAVIGATION_LINKS: LinkProp[] = [
  { id: 1, route: "/", label: "Home" },
  {
    id: 2,
    route: "/become-a-host",
    label: "Become a Host",
  },
  {
    id: 3,
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
}: {
  item: LinkProp;
  className?: string;
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
          "text-black group-hover:text-primary group-hover:font-medium transition-colors duration-300",
          { "text-primary": pathname === item.route },
        )}
      >
        {item.label}
      </motion.span>
      <motion.span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
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
  return (
    <div className="px-7 fixed z-[100] w-full bg-white border-b border-gray-100 shadow-sm">
      <motion.div
        className={cn("flex items-center justify-between py-5", className)}
        transition={{ duration: 1 }}
        // initial={{ opacity: 0, y: -50 }}
        // animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-start gap-1">
          {toggleSidebar && (
            <Button
              className="lg:hidden block border dark:border-white text-black dark:bg-white py-0 px-3 mr-4"
              onClick={toggleSidebar}
              variant={"ghost"}
            >
              <AlignJustify className="w-4" />
            </Button>
          )}
          <Image
            src={logo}
            onClick={onClickLogo}
            alt=""
            className="w-[150px] cursor-pointer lg:block hidden"
          />
          <Image
            onClick={onClickLogo}
            src={LogoMinimal}
            width={100}
            alt=""
            className="w-[100px] lg:hidden cursor-pointer block"
          />
        </div>
        {/* Nav section */}
        <div className="items-center hidden lg:flex justify-center space-x-10">
          <Each
            of={NAVIGATION_LINKS}
            render={(item: LinkProp) => (
              <HeaderLink
                key={item.id}
                item={item}
                className={item?.className}
              />
            )}
          />
          <Button className="rounded-[36px] text-[14px] font-[400] p-[20px_40px] bg-primary text-white hover:bg-primary/90 duration-200">
            Sign Up
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
