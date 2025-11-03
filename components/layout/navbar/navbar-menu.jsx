"use client";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@heroui/image";
import Link from "next/link";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, href, children }) => {
  console.log(href);

  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <Link href={href}>
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer   hover:opacity-[0.9] text-white"
        >
          {item}
        </motion.p>
      </Link>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                // layoutId ensures smooth animation
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  // layout ensures smooth animation
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      // resets the state
      onMouseLeave={() => setActive(null)}
      className="relative bg-transparent shadow-input flex justify-center space-x-4 py-6 pr-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  console.log({ title, description, href, src });

  const parentPage = href?.split("/")[1];

  console.log(parentPage);

  return (
    <a href={href} className="flex space-x-2">
      <Image
        // onBlur={true}
        src={src}
        width={140}
        height={100}
        alt={title}
        className="shrink-0 rounded-md object-cover"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-wrap text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  const parentPage = children[0]?.href?.split("/")[1];

  console.log(children);

  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </a>
  );
};
