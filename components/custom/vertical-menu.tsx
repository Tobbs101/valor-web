/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef, ReactNode } from "react";

import { EllipsisVertical, Ellipsis } from "lucide-react";

const VerticalMenu = ({
  children,
  btnColor,
  width,
  className,
  top,
  right,
  orientation,
}: {
  children: ReactNode;
  btnColor?: string;
  width?: string;
  className?: string;
  top?: string;
  right?: string;
  orientation: "vertical" | "horizontal";
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<any>();

  const handleOutsideClick = (event: any) => {
    event.stopPropagation();
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <span
        className={`cursor-pointer ${btnColor || "text-black"}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {orientation === "horizontal" ? <Ellipsis /> : <EllipsisVertical />}
      </span>
      {isMenuOpen && (
        <div
          style={{
            right: right || "20px",
            top: top || "-50px",
            zIndex: "1000",
          }}
          className={`absolute text-black ${
            width ? width : "min-w-[150px]"
          } h-auto ease-in-out transition-all origin-top-right`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default VerticalMenu;
