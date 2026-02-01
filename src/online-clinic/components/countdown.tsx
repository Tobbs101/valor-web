"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface CountdownProps {
  countDate?: string | Date; // optional prop — defaults to next Saturday at 9am
  className?: string;
  innerClassName?: string;
}

const CountdownToDate: React.FC<CountdownProps> = ({
  countDate,
  className,
  innerClassName,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countDate]);

  function calculateTimeLeft(): number {
    const now = new Date();
    let targetDate: Date;

    if (countDate) {
      targetDate = new Date(countDate);
    } else {
      // default: next Saturday at 9am
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      let daysUntilSaturday: number;

      if (currentDay === 6) {
        // If today is Saturday
        const todayAt9am = new Date(now);
        todayAt9am.setHours(9, 0, 0, 0);

        if (now < todayAt9am) {
          // If it's before 9am today (Saturday), target today at 9am
          daysUntilSaturday = 0;
        } else {
          // If it's after 9am today (Saturday), target next Saturday
          daysUntilSaturday = 7;
        }
      } else {
        // Calculate days until next Saturday
        daysUntilSaturday = (6 - currentDay) % 7;
        if (daysUntilSaturday === 0) daysUntilSaturday = 7; // If result is 0, it means next week
      }

      targetDate = new Date(now);
      targetDate.setDate(now.getDate() + daysUntilSaturday);
      targetDate.setHours(9, 0, 0, 0); // Set to 9am
    }

    return Math.max(0, targetDate.getTime() - now.getTime());
  }

  function formatTime(milliseconds: number): JSX.Element | string {
    // if (milliseconds <= 0) {
    //   return "🎉 The countdown is complete!";
    // }

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    const timeParts = [];

    if (days > -1) {
      timeParts.push(
        <div
          className="flex-1 flex items-center justify-center flex-col"
          key="days"
        >
          {days}
          <div className="text-sm font-normal">day{days > 1 ? "s" : ""}</div>
        </div>
      );
    }

    if (remainingHours > -1 || days > -1) {
      timeParts.push(
        <div
          className="flex-1 flex items-center justify-center flex-col"
          key="hours"
        >
          {remainingHours}
          <div className="text-sm font-normal">
            hr{remainingHours > 1 ? "s" : ""}
          </div>
        </div>
      );
    }

    if (remainingMinutes > -1 || hours > -1) {
      timeParts.push(
        <div
          className="flex-1 flex items-center justify-center flex-col"
          key="minutes"
        >
          {remainingMinutes}
          <div className="text-sm font-normal">
            min{remainingMinutes > 1 ? "s" : ""}
          </div>
        </div>
      );
    }

    timeParts.push(
      <div
        className="flex-1 flex items-center justify-center flex-col"
        key="seconds"
      >
        {remainingSeconds}
        <div className="text-sm font-normal">
          sec{remainingSeconds > 1 ? "s" : ""}
        </div>
      </div>
    );

    return (
      <div
        className={cn(
          "flex items-center justify-between w-[350px] md:w-[500px]",
          innerClassName
        )}
      >
        {timeParts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < timeParts.length - 1 && (
              <span className="text-xl font-normal">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "text-white mt-10 text-4xl md:text-7xl font-[600]",
        className
      )}
    >
      {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownToDate;
