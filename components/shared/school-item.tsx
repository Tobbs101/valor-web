"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const SchoolItem = ({ item }: { item: any }) => {
  const router = useRouter();
  return (
    <div className="h-[350px] bg-white duration-200 hover:border-gray-50 hover:shadow-lg border overflow-hidden border-gray-100 rounded-2xl">
      <Image
        src={item.imageLink}
        alt=""
        className="w-full h-[220px] object-cover"
      />
      <div className="h-[130px] px-5 py-2 flex items-start justify-center gap-4 flex-col">
        <Text size={"lg"} weight={"medium"}>
          {item.title}
        </Text>
        <Button
          className="border border-gray-100 shadow-sm px-5 text-xs"
          variant={"ghost"}
          onClick={() => router.push(`/schools/${item.id}`)}
        >
          See Details <Icon icon="cuida:caret-right-outline" />
        </Button>
      </div>
    </div>
  );
};

export default SchoolItem;
