"use client";
import type React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: string | React.ReactNode; // Updated type to accept string for image URL
  icon?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {typeof header === "string" ? (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
          <Image
            fill
            alt={typeof title === "string" ? title : "header image"}
            className="w-full h-full object-cover rounded-xl"
            src={header || "/placeholder.svg"}
          />
        </div>
      ) : (
        header
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {/* {typeof icon === "string" ? (
          <Image
            src={icon || "/placeholder.svg"}
            alt={typeof title === "string" ? title : "icon"}
            className="h-8 w-8 object-contain"
          />
        ) : (
          icon
        )} */}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
