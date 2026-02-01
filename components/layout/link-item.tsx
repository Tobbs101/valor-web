import React from "react";
import Link from "next/link";
// import { DashboardRouteProp } from "@/types";
import { cn } from "@/lib/utils";
import { Text } from "../ui/text";
import { LinkProp } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function LinkItem({ route, active }: { route: LinkProp; active: boolean }) {
  if (route.routes)
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border border-transparent" value="item-1">
          <AccordionTrigger
            dark
            className="w-full hover:no-underline rounded-md pl-4 pr-2 py-3.5 text-[14px]"
          >
            {route.label}
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            {route?.routes.map((route) => (
              <Link
                key={route.id}
                className={cn(
                  "w-full flex duration-200 items-end hover:underline cursor-pointer justify-start gap-[6px] font-medium text-[14px] px-4 py-3.5 rounded-md",
                  {
                    " text-primary": active,
                  }
                )}
                href={route.route || ""}
              >
                {/* {route.icon}{" "} */}
                <Text className="" size={"xs"} weight={"medium"}>
                  {route.label}
                </Text>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  return (
    <Link
      className={cn(
        "w-full dark:bg-gray-500 hover:bg-gray-300 hover:text-black flex duration-200 items-end justify-start gap-[6px] font-medium text-[14px] px-4 py-3.5 rounded-md",
        {
          "dark:bg-primary bg-primary text-white hover:bg-primary hover:text-white ":
            active,
        }
      )}
      href={route.route || ""}
    >
      {/* {route.icon}{" "} */}
      <Text className="" size={"sm"} weight={"medium"}>
        {route.label}
      </Text>
    </Link>
  );
}

export default LinkItem;
