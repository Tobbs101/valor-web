"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  title: string;
  content: React.ReactNode | string; // Now accepts JSX or string
  className?: string;
  showDrop?: boolean;
}

export default function Dropdowns({
  title,
  content,
  showDrop,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(showDrop ? true : false);

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 items-center w-full py-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={15}
        />
        <span className="text-[14px] font-semibold">{title}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 overflow-x-auto">
          {typeof content === "string" ? <p>{content}</p> : content}
        </div>
      )}
    </div>
  );
}
