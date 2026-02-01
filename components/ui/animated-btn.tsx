import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
  isDark?: boolean;
}

const AnimatedBtn = React.forwardRef<HTMLButtonElement, AnimatedBtnProps>(
  ({ btnText, isDark = false, className, onClick, ...props }, ref) => {
    const variants = {
      hidden: { left: "-100%", opacity: 0 },
      visible: { left: "0%", opacity: 1 },
    };

    const [isHovering, setIsHovering] = useState(false);

    return (
      <button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={ref}
        onClick={onClick}
        className={cn(
          "duration-300 outline-none bg-white text-primary focus:ring-0 focus-visible:ring-0 cursor-pointer rounded-sm px-10 py-4 relative overflow-hidden border",
          className,
          isDark ? "border-black" : "border-white",
          isHovering && "border-primary bg-primary",
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center text-black font-normal justify-center gap-1",
            isDark && !isHovering ? "text-black" : "text-white",
            isHovering && "text-white",
          )}
        >
          {btnText} <ArrowRight />
        </div>
        <motion.div
          initial="hidden"
          animate={isHovering ? "visible" : "hidden"}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={variants}
          className="absolute top-0 z-[-1] bg-primary w-full h-full left-0"
        />
      </button>
    );
  },
);

AnimatedBtn.displayName = "AnimatedBtn";

export default AnimatedBtn;
