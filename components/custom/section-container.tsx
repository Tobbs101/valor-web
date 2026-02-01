import { Text } from "@/components/ui/text";
import React from "react";

const SectionContainer = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="mt-10">
      <Text className="mb-3">{title}</Text>
      {children}
    </div>
  );
};

export default SectionContainer;
