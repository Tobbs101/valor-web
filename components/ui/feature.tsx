"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { CheckCircle } from "lucide-react";

const features = [
  "English, Verbal Reasoning, Non-Verbal and Maths",
  "Includes answers and explanations",
  "Complete the Online for immediate scores and feedback",
  "Reflects 11+ GL Assessment style and format",
  "Available as PDF download for immediate access",
  "Unlimited access for 2 years",
];

export default function IncludesCard() {
  return (
    <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-4">Includes:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-start gap-2">
            <div className="w-7 h-7 bg-[#E8F2EE] rounded-full border border-[#E8F2EE] flex items-center justify-center">
              <Icon
                icon="material-symbols:check"
                className="text-[16px] text-[#5BB5A2]"
              />
            </div>
            <div className="max-w-[90%] text-[14px] font-[400]">{feature}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
